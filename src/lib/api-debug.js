/**
 * API Debugging middleware for Next.js API routes
 * Provides request/response logging, error handling, and performance monitoring
 */

import { logger, createRequestLogger } from './logger.js';

/**
 * Wraps a Next.js API handler with comprehensive debugging
 * @param {Function} handler - The API route handler function
 * @param {Object} options - Configuration options
 * @returns {Function} - Enhanced handler with debugging
 */
export function withApiDebug(handler, options = {}) {
  const {
    logRequests = true,
    logResponses = true,
    logErrors = true,
    logPerformance = true,
    includeHeaders = false,
    includeBody = false,
    maxBodySize = 1024, // Max size to log for request/response bodies
  } = options;

  return async (req, res) => {
    const startTime = Date.now();
    const requestId = req.headers['x-request-id'] || generateRequestId();

    // Add request ID to headers for tracking
    req.headers['x-request-id'] = requestId;

    // Create request-specific logger
    const requestLogger = createRequestLogger(requestId);

    try {
      // Log incoming request
      if (logRequests) {
        const requestMeta = {
          method: req.method,
          url: req.url,
          query: req.query,
          userAgent: req.headers['user-agent'],
          ip: getClientIP(req),
        };

        if (includeHeaders) {
          requestMeta.headers = sanitizeHeaders(req.headers);
        }

        if (includeBody && req.body && isBodyLoggable(req)) {
          requestMeta.body = truncateObject(req.body, maxBodySize);
        }

        requestLogger.info('Incoming API request', requestMeta);
      }

      // Add response logging to res object
      if (logResponses) {
        const originalJson = res.json;
        const originalSend = res.send;
        const originalStatus = res.status;

        res.json = function(data) {
          const duration = Date.now() - startTime;
          if (logResponses) {
            requestLogger.info('API response sent', {
              statusCode: res.statusCode,
              duration: `${duration}ms`,
              responseSize: JSON.stringify(data).length,
              ...(includeBody && { body: truncateObject(data, maxBodySize) }),
            });
          }
          return originalJson.call(this, data);
        };

        res.send = function(data) {
          const duration = Date.now() - startTime;
          if (logResponses) {
            requestLogger.info('API response sent', {
              statusCode: res.statusCode,
              duration: `${duration}ms`,
              responseSize: (typeof data === 'string' ? data : JSON.stringify(data)).length,
            });
          }
          return originalSend.call(this, data);
        };
      }

      // Call the original handler
      await handler(req, res);

      // Log successful completion if not already logged by response
      if (logResponses && !res.headersSent) {
        const duration = Date.now() - startTime;
        requestLogger.info('API request completed', {
          statusCode: res.statusCode,
          duration: `${duration}ms`,
        });
      }

    } catch (error) {
      const duration = Date.now() - startTime;

      // Log error details
      if (logErrors) {
        requestLogger.error('API request failed', error, {
          duration: `${duration}ms`,
          statusCode: error.statusCode || 500,
          stack: error.stack,
        });
      }

      // Send error response if not already sent
      if (!res.headersSent) {
        res.status(error.statusCode || 500).json({
          error: 'Internal Server Error',
          message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
          requestId,
          ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
        });
      }
    }
  };
}

/**
 * Higher-order function to wrap API route handlers with debugging
 * @param {Object} options - Debug configuration options
 * @returns {Function} - Function that wraps handlers with debugging
 */
export function debugApiRoute(options = {}) {
  return (handler) => withApiDebug(handler, options);
}

/**
 * Middleware for route-specific debugging configuration
 * @param {Object} config - Route-specific debug config
 * @returns {Function} - Configured debug wrapper
 */
export function createDebugWrapper(config = {}) {
  return (handler) => withApiDebug(handler, {
    logRequests: true,
    logResponses: true,
    logErrors: true,
    logPerformance: true,
    ...config,
  });
}

/**
 * Utility to log database operations with performance metrics
 * @param {string} operation - Database operation (SELECT, INSERT, etc.)
 * @param {string} table - Table name
 * @param {Function} dbOperation - Database operation function
 * @param {Object} meta - Additional metadata
 * @returns {Promise} - Database operation result
 */
export async function logDatabaseOperation(operation, table, dbOperation, meta = {}) {
  const startTime = Date.now();
  const requestId = meta.requestId;

  try {
    logger.debug('Starting database operation', {
      ...meta,
      operation,
      table,
      requestId,
    });

    const result = await dbOperation();

    const duration = Date.now() - startTime;
    logger.debug('Database operation completed', {
      ...meta,
      operation,
      table,
      duration: `${duration}ms`,
      success: true,
      requestId,
    });

    return result;
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Database operation failed', error, {
      ...meta,
      operation,
      table,
      duration: `${duration}ms`,
      requestId,
    });
    throw error;
  }
}

/**
 * Utility to log external API calls
 * @param {string} service - Service name
 * @param {string} endpoint - API endpoint
 * @param {Function} apiCall - API call function
 * @param {Object} meta - Additional metadata
 * @returns {Promise} - API call result
 */
export async function logApiCall(service, endpoint, apiCall, meta = {}) {
  const startTime = Date.now();
  const requestId = meta.requestId;

  try {
    logger.debug('Starting external API call', {
      ...meta,
      service,
      endpoint,
      requestId,
    });

    const result = await apiCall();

    const duration = Date.now() - startTime;
    logger.info('External API call completed', {
      ...meta,
      service,
      endpoint,
      duration: `${duration}ms`,
      success: true,
      requestId,
    });

    return result;
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('External API call failed', error, {
      ...meta,
      service,
      endpoint,
      duration: `${duration}ms`,
      requestId,
    });
    throw error;
  }
}

// Helper functions
function generateRequestId() {
  return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15);
}

function getClientIP(req) {
  return req.headers['x-forwarded-for'] ||
         req.connection?.remoteAddress ||
         req.socket?.remoteAddress ||
         (req.connection?.socket ? req.connection.socket.remoteAddress : null) ||
         'unknown';
}

function sanitizeHeaders(headers) {
  const sensitiveHeaders = ['authorization', 'cookie', 'x-api-key'];
  const sanitized = {};

  Object.keys(headers).forEach(key => {
    if (sensitiveHeaders.includes(key.toLowerCase())) {
      sanitized[key] = '[REDACTED]';
    } else {
      sanitized[key] = headers[key];
    }
  });

  return sanitized;
}

function isBodyLoggable(req) {
  const contentType = req.headers['content-type'] || '';
  return contentType.includes('application/json') ||
         contentType.includes('application/x-www-form-urlencoded');
}

function truncateObject(obj, maxSize) {
  const str = JSON.stringify(obj);
  if (str.length <= maxSize) {
    return obj;
  }

  return {
    _truncated: true,
    _originalSize: str.length,
    _maxSize: maxSize,
    preview: str.substring(0, maxSize - 100) + '...[TRUNCATED]',
  };
}

export default withApiDebug;
