import { ApiError } from './api-error'

/**
 * Handles API errors and converts them to structured error responses
 * with error IDs for tracking and debugging.
 *
 * @param error - The error to handle (can be ApiError, Error, or unknown)
 * @returns Structured error response with statusCode, message, error code, and errorId
 */
export default function handleApiError(error: unknown) {
  const errorId = crypto.randomUUID();
  const timestamp = new Date().toISOString();

  const errorLog = {
    errorId,
    timestamp,
    type: error instanceof ApiError ? 'ApiError' : 'UnexpectedError',
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
  };

  console.error('[API_ERROR]', JSON.stringify(errorLog, null, 2));

  if (error instanceof ApiError) {
    return {
      statusCode: error.statusCode,
      message: error.message,
      error: error.code,
    };
  }

  return {
    statusCode: 500,
    message: "Internal Server Error",
    error: "INTERNAL_SERVER_ERROR",
  };
}
