import { describe, it, expect } from "bun:test";
import {
  ApiError,
  NotFoundError,
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  UnauthorizedError,
  MethodNotAllowedError,
  RequestTimeoutError,
  PayloadTooLargeError,
  UnprocessableEntityError,
  TooManyRequestsError,
  BadGatewayError,
  ServiceUnavailableError,
  GatewayTimeoutError,
} from "@root/server/types/api-error";

describe("API Error Classes", () => {
  describe("Base ApiError class", () => {
    it("should create ApiError with correct properties", () => {
      const error = new ApiError(418, "I am a teapot", "TEAPOT");
      expect(error.statusCode).toBe(418);
      expect(error.statusMessage).toBe("I am a teapot");
      expect(error.code).toBe("TEAPOT");
      expect(error.name).toBe("ApiError");
    });
  });

  describe("NotFoundError", () => {
    it("should have correct default properties", () => {
      const error = new NotFoundError();
      expect(error.statusCode).toBe(404);
      expect(error.code).toBe("NOT_FOUND");
      expect(error.message).toBe("Pokemon Not Found");
    });

    it("should accept custom message", () => {
      const error = new NotFoundError("Custom not found message");
      expect(error.message).toBe("Custom not found message");
    });
  });

  describe("BadRequestError", () => {
    it("should have correct default properties", () => {
      const error = new BadRequestError();
      expect(error.statusCode).toBe(400);
      expect(error.code).toBe("BAD_REQUEST");
      expect(error.message).toBe("Bad request");
    });

    it("should accept custom message", () => {
      const error = new BadRequestError("Invalid input data");
      expect(error.message).toBe("Invalid input data");
    });
  });

  describe("ForbiddenError", () => {
    it("should have correct default properties", () => {
      const error = new ForbiddenError();
      expect(error.statusCode).toBe(403);
      expect(error.code).toBe("FORBIDDEN");
      expect(error.message).toBe("Access denied");
    });
  });

  describe("InternalServerError", () => {
    it("should have correct default properties", () => {
      const error = new InternalServerError();
      expect(error.statusCode).toBe(500);
      expect(error.code).toBe("INTERNAL_ERROR");
      expect(error.message).toBe("Internal server error");
    });
  });

  describe("UnauthorizedError", () => {
    it("should have correct default properties", () => {
      const error = new UnauthorizedError();
      expect(error.statusCode).toBe(401);
      expect(error.code).toBe("UNAUTHORIZED");
      expect(error.message).toBe("Authentication required");
    });
  });

  describe("MethodNotAllowedError", () => {
    it("should have correct default properties", () => {
      const error = new MethodNotAllowedError();
      expect(error.statusCode).toBe(405);
      expect(error.code).toBe("METHOD_NOT_ALLOWED");
      expect(error.message).toBe("Method not allowed");
    });
  });

  describe("RequestTimeoutError", () => {
    it("should have correct default properties", () => {
      const error = new RequestTimeoutError();
      expect(error.statusCode).toBe(408);
      expect(error.code).toBe("REQUEST_TIMEOUT");
      expect(error.message).toBe("Request timeout");
    });
  });

  describe("PayloadTooLargeError", () => {
    it("should have correct default properties", () => {
      const error = new PayloadTooLargeError();
      expect(error.statusCode).toBe(413);
      expect(error.code).toBe("PAYLOAD_TOO_LARGE");
      expect(error.message).toBe("Payload too large");
    });
  });

  describe("UnprocessableEntityError", () => {
    it("should have correct default properties", () => {
      const error = new UnprocessableEntityError();
      expect(error.statusCode).toBe(422);
      expect(error.code).toBe("UNPROCESSABLE_ENTITY");
      expect(error.message).toBe("Unprocessable entity");
    });
  });

  describe("TooManyRequestsError", () => {
    it("should have correct default properties", () => {
      const error = new TooManyRequestsError();
      expect(error.statusCode).toBe(429);
      expect(error.code).toBe("TOO_MANY_REQUESTS");
      expect(error.message).toBe("Too many requests");
    });
  });

  describe("BadGatewayError", () => {
    it("should have correct default properties", () => {
      const error = new BadGatewayError();
      expect(error.statusCode).toBe(502);
      expect(error.code).toBe("BAD_GATEWAY");
      expect(error.message).toBe("Bad gateway");
    });
  });

  describe("ServiceUnavailableError", () => {
    it("should have correct default properties", () => {
      const error = new ServiceUnavailableError();
      expect(error.statusCode).toBe(503);
      expect(error.code).toBe("SERVICE_UNAVAILABLE");
      expect(error.message).toBe("Service unavailable");
    });
  });

  describe("GatewayTimeoutError", () => {
    it("should have correct default properties", () => {
      const error = new GatewayTimeoutError();
      expect(error.statusCode).toBe(504);
      expect(error.code).toBe("GATEWAY_TIMEOUT");
      expect(error.message).toBe("Gateway timeout");
    });
  });
});
