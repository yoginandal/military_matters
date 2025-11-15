/**
 * File-based logging system for production debugging
 * Writes detailed logs to filesystem for inspection
 */

import fs from 'fs';
import path from 'path';

class FileLogger {
  constructor() {
    // Skip initialization during build
    if (!process.env.DB_HOST) {
      return;
    }

    this.logDir = path.join(process.cwd(), 'logs');
    this.errorDumpDir = path.join(this.logDir, 'error-dumps');
    this.maxLogFiles = 10;
    this.maxLogSize = 10 * 1024 * 1024; // 10MB per log file
    this.maxErrorDumps = 50;

    this.ensureDirectories();
  }

  ensureDirectories() {
    try {
      // Create logs directory
      if (!fs.existsSync(this.logDir)) {
        fs.mkdirSync(this.logDir, { recursive: true });
        console.log('[FileLogger] Created logs directory:', this.logDir);
      }

      // Create error dumps directory
      if (!fs.existsSync(this.errorDumpDir)) {
        fs.mkdirSync(this.errorDumpDir, { recursive: true });
        console.log('[FileLogger] Created error dumps directory:', this.errorDumpDir);
      }
    } catch (error) {
      console.error('[FileLogger] Failed to create directories:', error.message);
    }
  }

  getLogFileName(type = 'app') {
    const date = new Date();
    const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD
    return path.join(this.logDir, `${type}-${dateStr}.log`);
  }

  getCurrentLogFile(type = 'app') {
    const fileName = this.getLogFileName(type);
    return fileName;
  }

  rotateLogFiles(type = 'app') {
    const logFiles = fs.readdirSync(this.logDir)
      .filter(file => file.startsWith(`${type}-`) && file.endsWith('.log'))
      .map(file => path.join(this.logDir, file))
      .sort((a, b) => fs.statSync(b).mtime - fs.statSync(a).mtime);

    // Keep only the latest maxLogFiles
    if (logFiles.length >= this.maxLogFiles) {
      const filesToDelete = logFiles.slice(this.maxLogFiles);
      filesToDelete.forEach(file => {
        try {
          fs.unlinkSync(file);
          console.log('[FileLogger] Rotated log file:', file);
        } catch (error) {
          console.error('[FileLogger] Failed to rotate log file:', error.message);
        }
      });
    }
  }

  writeToFile(filePath, content) {
    try {
      // Check if file exists and its size
      let shouldRotate = false;
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        if (stats.size >= this.maxLogSize) {
          shouldRotate = true;
        }
      }

      if (shouldRotate) {
        this.rotateLogFiles(path.basename(filePath, '.log').split('-')[0]);
      }

      // Append to file
      fs.appendFileSync(filePath, content + '\n');

      // Clean up old error dumps periodically
      this.cleanupOldErrorDumps();

    } catch (error) {
      console.error('[FileLogger] Failed to write to log file:', error.message);
      // Fallback to console if file writing fails
      console.error('LOG FILE ERROR:', error.message);
      console.log(content);
    }
  }

  cleanupOldErrorDumps() {
    try {
      if (!fs.existsSync(this.errorDumpDir)) return;

      const errorFiles = fs.readdirSync(this.errorDumpDir)
        .filter(file => file.endsWith('.json'))
        .map(file => ({
          name: file,
          path: path.join(this.errorDumpDir, file),
          mtime: fs.statSync(path.join(this.errorDumpDir, file)).mtime
        }))
        .sort((a, b) => b.mtime - a.mtime);

      // Keep only the latest maxErrorDumps
      if (errorFiles.length >= this.maxErrorDumps) {
        const filesToDelete = errorFiles.slice(this.maxErrorDumps);
        filesToDelete.forEach(file => {
          try {
            fs.unlinkSync(file.path);
            console.log('[FileLogger] Cleaned up old error dump:', file.name);
          } catch (error) {
            console.error('[FileLogger] Failed to cleanup error dump:', error.message);
          }
        });
      }
    } catch (error) {
      console.error('[FileLogger] Failed to cleanup error dumps:', error.message);
    }
  }

  log(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    const requestId = meta.requestId || 'unknown';
    const userId = meta.userId || 'unknown';

    const logEntry = {
      timestamp,
      level,
      message,
      requestId,
      userId,
      ...meta,
    };

    // Write to console (for Azure logs)
    console.log(`[FileLogger] ${level}:`, message, meta);

    // Write to file (for local inspection)
    if (process.env.NODE_ENV === 'production') {
      const filePath = this.getCurrentLogFile('app');
      this.writeToFile(filePath, JSON.stringify(logEntry));
    }
  }

  error(message, error = null, meta = {}) {
    this.log('ERROR', message, {
      ...meta,
      ...(error && {
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
          code: error.code,
          statusCode: error.statusCode,
        }
      })
    });
  }

  warn(message, meta = {}) {
    this.log('WARN', message, meta);
  }

  info(message, meta = {}) {
    this.log('INFO', message, meta);
  }

  debug(message, meta = {}) {
    this.log('DEBUG', message, meta);
  }

  createErrorDump(error, context = {}) {
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;

    const errorDump = {
      id: errorId,
      timestamp: new Date().toISOString(),
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
        code: error.code,
        statusCode: error.statusCode,
      },
      context: {
        ...context,
        url: context.req?.url,
        method: context.req?.method,
        userAgent: context.req?.headers?.['user-agent'],
        ip: context.req?.ip || context.req?.connection?.remoteAddress,
        body: this.sanitizeObject(context.req?.body),
        query: context.req?.query,
        params: context.req?.params,
        headers: this.sanitizeHeaders(context.req?.headers),
      },
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        nodeVersion: process.version,
        platform: process.platform,
        memoryUsage: process.memoryUsage(),
        uptime: process.uptime(),
      },
      requestId: context.requestId || 'unknown',
    };

    // Write to file
    const filePath = path.join(this.errorDumpDir, `${errorId}.json`);
    try {
      fs.writeFileSync(filePath, JSON.stringify(errorDump, null, 2));
      console.log('[FileLogger] Error dump created:', errorId, filePath);

      return errorId;
    } catch (error) {
      console.error('[FileLogger] Failed to create error dump:', error.message, errorId);
      return null;
    }
  }

  sanitizeObject(obj) {
    if (!obj || typeof obj !== 'object') return obj;

    const sensitiveKeys = ['password', 'token', 'authorization', 'cookie', 'secret'];
    const sanitized = { ...obj };

    Object.keys(sanitized).forEach(key => {
      if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
        sanitized[key] = '[REDACTED]';
      } else if (typeof sanitized[key] === 'object') {
        sanitized[key] = this.sanitizeObject(sanitized[key]);
      }
    });

    return sanitized;
  }

  sanitizeHeaders(headers) {
    if (!headers) return headers;

    const sensitiveHeaders = ['authorization', 'cookie', 'x-api-key', 'x-auth-token'];
    const sanitized = { ...headers };

    Object.keys(sanitized).forEach(key => {
      if (sensitiveHeaders.includes(key.toLowerCase())) {
        sanitized[key] = '[REDACTED]';
      }
    });

    return sanitized;
  }

  getErrorDumps() {
    try {
      if (!fs.existsSync(this.errorDumpDir)) {
        return [];
      }

      return fs.readdirSync(this.errorDumpDir)
        .filter(file => file.endsWith('.json'))
        .map(file => {
          try {
            const filePath = path.join(this.errorDumpDir, file);
            const content = fs.readFileSync(filePath, 'utf8');
            const data = JSON.parse(content);
            return {
              id: data.id,
              timestamp: data.timestamp,
              message: data.error.message,
              file: file,
            };
          } catch (error) {
            return {
              id: 'corrupted',
              timestamp: 'unknown',
              message: 'Corrupted file',
              file: file,
            };
          }
        })
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } catch (error) {
      console.error('[FileLogger] Failed to read error dumps:', error.message);
      return [];
    }
  }

  getErrorDump(errorId) {
    try {
      const filePath = path.join(this.errorDumpDir, `${errorId}.json`);
      if (!fs.existsSync(filePath)) {
        return null;
      }

      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      console.error('[FileLogger] Failed to read error dump:', error.message, errorId);
      return null;
    }
  }
}

// Create singleton instance
export const fileLogger = new FileLogger();

export default fileLogger;
