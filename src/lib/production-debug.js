/**
 * Aggressive production debugging system
 * Captures every possible error detail for Azure deployment
 */

import fs from 'fs';
import path from 'path';

class ProductionDebugger {
  constructor() {
    this.debugDir = path.join(process.cwd(), 'debug-logs');
    this.ensureDebugDirectory();
  }

  ensureDebugDirectory() {
    if (!fs.existsSync(this.debugDir)) {
      fs.mkdirSync(this.debugDir, { recursive: true });
    }
  }

  logError(error, context = {}) {
    const timestamp = new Date().toISOString();
    const errorId = `debug_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    
    const debugInfo = {
      id: errorId,
      timestamp,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
        code: error.code,
        errno: error.errno,
        syscall: error.syscall,
        path: error.path,
        statusCode: error.statusCode,
        status: error.status,
        cause: error.cause,
        // Capture all enumerable properties
        ...Object.getOwnPropertyDescriptors(error)
      },
      context: {
        ...context,
        environment: {
          NODE_ENV: process.env.NODE_ENV,
          NODE_VERSION: process.version,
          PLATFORM: process.platform,
          ARCH: process.arch,
          CWD: process.cwd(),
          MEMORY_USAGE: process.memoryUsage(),
          UPTIME: process.uptime(),
          CPU_USAGE: process.cpuUsage(),
        },
        envVars: this.getSafeEnvVars(),
        loadedModules: this.getLoadedModules(),
        processInfo: {
          pid: process.pid,
          ppid: process.ppid,
          argv: process.argv,
          execPath: process.execPath,
        }
      }
    };

    // Write to file immediately
    const filePath = path.join(this.debugDir, `${errorId}.json`);
    try {
      fs.writeFileSync(filePath, JSON.stringify(debugInfo, null, 2));
    } catch (writeError) {
      // Fallback to console if file write fails
      console.error('DEBUG ERROR WRITE FAILED:', writeError.message);
      console.error('ORIGINAL ERROR:', JSON.stringify(debugInfo, null, 2));
    }

    // Also log to console for Azure logs
    console.error('=== PRODUCTION DEBUG ERROR ===');
    console.error('Error ID:', errorId);
    console.error('Error Name:', error.name);
    console.error('Error Message:', error.message);
    console.error('Error Stack:', error.stack);
    console.error('Context:', JSON.stringify(context, null, 2));
    console.error('=== END DEBUG ERROR ===');

    return errorId;
  }

  getSafeEnvVars() {
    const safeVars = {};
    Object.keys(process.env).forEach(key => {
      // Hide sensitive data but show that variables exist
      if (key.includes('PASSWORD') || key.includes('SECRET') || key.includes('TOKEN') || key.includes('KEY')) {
        safeVars[key] = '[REDACTED]';
      } else {
        safeVars[key] = process.env[key];
      }
    });
    return safeVars;
  }

  getLoadedModules() {
    try {
      return Object.keys(require.cache || {});
    } catch {
      return ['Unable to get loaded modules'];
    }
  }

  wrapFunction(fn, functionName) {
    return async (...args) => {
      const startTime = Date.now();
      try {
        const result = await fn(...args);
        const duration = Date.now() - startTime;
        
        // Log successful execution
        this.logSuccess(functionName, { duration, args: this.sanitizeArgs(args) });
        
        return result;
      } catch (error) {
        const duration = Date.now() - startTime;
        
        // Log detailed error
        const errorId = this.logError(error, {
          functionName,
          duration,
          args: this.sanitizeArgs(args),
          timestamp: new Date().toISOString()
        });

        // Re-throw with error ID
        const enhancedError = new Error(`${error.message} [Debug ID: ${errorId}]`);
        enhancedError.originalError = error;
        enhancedError.debugId = errorId;
        throw enhancedError;
      }
    };
  }

  logSuccess(functionName, context) {
    const timestamp = new Date().toISOString();
    console.log(`[SUCCESS] ${functionName} completed in ${context.duration}ms`);
  }

  sanitizeArgs(args) {
    return args.map(arg => {
      if (arg && typeof arg === 'object') {
        if (arg instanceof File) {
          return {
            type: 'File',
            name: arg.name,
            size: arg.size,
            type: arg.type
          };
        }
        if (Buffer.isBuffer(arg)) {
          return {
            type: 'Buffer',
            length: arg.length
          };
        }
        // Remove circular references and limit depth
        return this.limitObjectDepth(arg, 3);
      }
      return arg;
    });
  }

  limitObjectDepth(obj, maxDepth, currentDepth = 0) {
    if (currentDepth >= maxDepth) {
      return '[Max Depth Reached]';
    }

    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.slice(0, 10).map(item => this.limitObjectDepth(item, maxDepth, currentDepth + 1));
    }

    const result = {};
    const keys = Object.keys(obj).slice(0, 20); // Limit to 20 keys
    
    for (const key of keys) {
      try {
        result[key] = this.limitObjectDepth(obj[key], maxDepth, currentDepth + 1);
      } catch {
        result[key] = '[Circular Reference]';
      }
    }
    
    return result;
  }

  getAllDebugFiles() {
    try {
      if (!fs.existsSync(this.debugDir)) {
        return [];
      }

      return fs.readdirSync(this.debugDir)
        .filter(file => file.endsWith('.json'))
        .map(file => {
          const filePath = path.join(this.debugDir, file);
          const stats = fs.statSync(filePath);
          return {
            name: file,
            path: filePath,
            size: stats.size,
            modified: stats.mtime,
          };
        })
        .sort((a, b) => b.modified - a.modified);
    } catch (error) {
      console.error('Error reading debug files:', error);
      return [];
    }
  }

  getDebugFile(fileName) {
    try {
      const filePath = path.join(this.debugDir, fileName);
      if (!fs.existsSync(filePath)) {
        return null;
      }
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      console.error('Error reading debug file:', error);
      return null;
    }
  }

  clearDebugFiles() {
    try {
      if (fs.existsSync(this.debugDir)) {
        const files = fs.readdirSync(this.debugDir);
        files.forEach(file => {
          fs.unlinkSync(path.join(this.debugDir, file));
        });
        console.log(`Cleared ${files.length} debug files`);
      }
    } catch (error) {
      console.error('Error clearing debug files:', error);
    }
  }
}

// Create singleton instance
export const productionDebugger = new ProductionDebugger();

// Global error handler for uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('=== UNCAUGHT EXCEPTION ===');
  productionDebugger.logError(error, {
    type: 'uncaughtException',
    timestamp: new Date().toISOString()
  });
  console.error('=== END UNCAUGHT EXCEPTION ===');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('=== UNHANDLED REJECTION ===');
  productionDebugger.logError(new Error(`Unhandled Rejection: ${reason}`), {
    type: 'unhandledRejection',
    reason: reason,
    promise: promise.toString(),
    timestamp: new Date().toISOString()
  });
  console.error('=== END UNHANDLED REJECTION ===');
});

export default productionDebugger;
