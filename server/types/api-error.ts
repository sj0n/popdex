/**
 * Base class for all API errors.
 * Provides consistent error structure with status codes, messages, and error codes.
 *
 * @property {number} statusCode - HTTP status code for the error
 * @property {string} statusMessage - Human-readable error message
 * @property {string} code - Machine-readable error code for programmatic handling
 * @property {string} name - Error class name (always "ApiError" for this base class)
 *
 * @example
 * // Creating a custom error type
 * class CustomError extends ApiError {
 *   constructor(message = 'Custom error occurred') {
 *     super(418, message, 'CUSTOM_ERROR');
 *   }
 * }
 */
export class ApiError extends Error {
    constructor(
        public statusCode: number,
        public statusMessage: string,
        public code: string
    ) {
        super(statusMessage);
        this.name = "ApiError";

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }
    }
}

export class NotFoundError extends ApiError {
    constructor(statusMessage = "Pokemon Not Found") {
        super(404, statusMessage, "NOT_FOUND");
    }
}

export class BadRequestError extends ApiError {
    constructor(statusMessage = 'Bad request') {
        super(400, statusMessage, 'BAD_REQUEST');
    }
}

export class ForbiddenError extends ApiError {
    constructor(statusMessage = 'Access denied') {
        super(403, statusMessage, 'FORBIDDEN');
    }
}

export class InternalServerError extends ApiError {
    constructor(statusMessage = 'Internal server error') {
        super(500, statusMessage, 'INTERNAL_ERROR');
    }
}

export class UnauthorizedError extends ApiError {
    constructor(statusMessage = 'Authentication required') {
        super(401, statusMessage, 'UNAUTHORIZED');
    }
}

export class MethodNotAllowedError extends ApiError {
    constructor(statusMessage = 'Method not allowed') {
        super(405, statusMessage, 'METHOD_NOT_ALLOWED');
    }
}

export class RequestTimeoutError extends ApiError {
    constructor(statusMessage = 'Request timeout') {
        super(408, statusMessage, 'REQUEST_TIMEOUT');
    }
}

export class PayloadTooLargeError extends ApiError {
    constructor(statusMessage = 'Payload too large') {
        super(413, statusMessage, 'PAYLOAD_TOO_LARGE');
    }
}

export class UnprocessableEntityError extends ApiError {
    constructor(statusMessage = 'Unprocessable entity') {
        super(422, statusMessage, 'UNPROCESSABLE_ENTITY');
    }
}

export class TooManyRequestsError extends ApiError {
    constructor(statusMessage = 'Too many requests') {
        super(429, statusMessage, 'TOO_MANY_REQUESTS');
    }
}

export class BadGatewayError extends ApiError {
    constructor(statusMessage = 'Bad gateway') {
        super(502, statusMessage, 'BAD_GATEWAY');
    }
}

export class ServiceUnavailableError extends ApiError {
    constructor(statusMessage = 'Service unavailable') {
        super(503, statusMessage, 'SERVICE_UNAVAILABLE');
    }
}

export class GatewayTimeoutError extends ApiError {
    constructor(statusMessage = 'Gateway timeout') {
        super(504, statusMessage, 'GATEWAY_TIMEOUT');
    }
}

export interface ErrorResponse {
  error: string;
  message: string;
}