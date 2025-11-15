/**
 * Comprehensive logging utility for debugging Next.js applications
 * Provides detailed error logging, request tracking, and structured logging
 */

const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
};

class Logger {
  constructor() {
    this.level = process.env.LOG_LEVEL || 'INFO';
    this.levelNumber = LOG_LEVELS[this.level.toUpperCase()] || LOG_LEVELS.INFO;
  }

  formatMessage(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    const requestId = meta.requestId || 'unknown';
    const userId = meta.userId || 'unknown';

    return {
      timestamp,
      level,
      message,
      requestId,
      userId,
      ...meta,
    };
  }

  shouldLog(level) {
    return LOG_LEVELS[level.toUpperCase()] <= this.levelNumber;
  }

  log(level, message, meta = {}) {
    if (!this.shouldLog(level)) return;

    const formattedMessage = this.formatMessage(level, message, meta);

    // Console logging with colors
    const colors = {
      ERROR: '\x1b[31m', // Red
      WARN: '\x1b[33m',  // Yellow
      INFO: '\x1b[36m',  // Cyan
      DEBUG: '\x1b[35m', // Magenta
    };

    const resetColor = '\x1b[0m';

    if (process.env.NODE_ENV === 'development') {
      console.log(`${colors[level]}[${formattedMessage.timestamp}] ${level}:${resetColor}`, formattedMessage);
    } else {
      // In production, use structured JSON logging for Azure logs
      console.log(JSON.stringify(formattedMessage));
    }

    // Also write to file logger if in production
    if (process.env.NODE_ENV === 'production') {
      try {
        const { fileLogger } = require('./file-logger');
        fileLogger.log(level, message, meta);
      } catch (error) {
        // Fallback to console if file logger fails
        console.error('File logger error:', error.message);
      }
    }
  }

  error(message, error = null, meta = {}) {
    const errorMeta = error ? {
      ...meta,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
        code: error.code,
        statusCode: error.statusCode,
      },
    } : meta;

    this.log('ERROR', message, errorMeta);
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

  // Request-specific logging helpers
  logRequest(req, meta = {}) {
    this.info('Incoming request', {
      ...meta,
      method: req.method,
      url: req.url,
      userAgent: req.headers['user-agent'],
      ip: req.ip || req.connection?.remoteAddress,
      requestId: req.headers['x-request-id'] || generateRequestId(),
    });
  }

  logResponse(statusCode, responseTime, meta = {}) {
    this.info('Request completed', {
      ...meta,
      statusCode,
      responseTime: `${responseTime}ms`,
    });
  }

  logDatabaseOperation(operation, table, duration, meta = {}) {
    this.debug('Database operation', {
      ...meta,
      operation,
      table,
      duration: `${duration}ms`,
    });
  }

  logApiCall(endpoint, method, duration, statusCode, meta = {}) {
    this.info('API call', {
      ...meta,
      endpoint,
      method,
      duration: `${duration}ms`,
      statusCode,
    });
  }
}

// Generate a unique request ID
function generateRequestId() {
  return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15);
}

// Create a singleton logger instance
export const logger = new Logger();

// Helper function to create a request context logger
export function createRequestLogger(requestId, userId = null) {
  return {
    error: (message, error = null, meta = {}) =>
      logger.error(message, error, { ...meta, requestId, userId }),
    warn: (message, meta = {}) =>
      logger.warn(message, { ...meta, requestId, userId }),
    info: (message, meta = {}) =>
      logger.info(message, { ...meta, requestId, userId }),
    debug: (message, meta = {}) =>
      logger.debug(message, { ...meta, requestId, userId }),
  };
}

export default logger;
