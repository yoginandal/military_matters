/**
 * Environment variable validation utility
 * Helps identify missing or misconfigured environment variables early
 */

import { logger } from './logger.js';

const REQUIRED_ENV_VARS = [
  'DB_HOST',
  'DB_USER',
  'DB_PASSWORD',
  'DB_DATABASE',
  'AZURE_STORAGE_CONNECTION_STRING',
  'AZURE_CONTAINER_NAME',
];

const OPTIONAL_ENV_VARS = [
  'NEXT_PUBLIC_BASE_URL',
  'LOG_LEVEL',
  'NODE_ENV',
];

export function validateEnvironmentVariables() {
  const missing = [];
  const warnings = [];

  logger.info('Validating environment variables...');

  // Check required variables
  REQUIRED_ENV_VARS.forEach(varName => {
    if (!process.env[varName]) {
      missing.push(varName);
    } else {
      logger.debug(`✓ ${varName} is configured`);
    }
  });

  // Check optional variables
  OPTIONAL_ENV_VARS.forEach(varName => {
    if (!process.env[varName]) {
      warnings.push(`${varName} is not configured (using defaults)`);
    } else {
      logger.debug(`✓ ${varName} is configured`);
    }
  });

  // Log results
  if (missing.length > 0) {
    logger.error('Missing required environment variables', {
      missing: missing.join(', ')
    });
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  if (warnings.length > 0) {
    logger.warn('Environment variable warnings', {
      warnings: warnings.join('; ')
    });
  }

  logger.info('Environment validation completed successfully');
  return true;
}

// Validate on module load (in development)
if (process.env.NODE_ENV === 'development') {
  try {
    validateEnvironmentVariables();
  } catch (error) {
    logger.error('Environment validation failed', error);
    // Don't exit in development, just log the error
  }
}

export default validateEnvironmentVariables;
