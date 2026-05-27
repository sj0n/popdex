import { describe, expect, it } from "vitest";
import { validateName } from "../../../server/utils/validate";
import { BadRequestError } from "../../../server/types/api-error";

describe("validate", () => {
  it("should pass for valid pokemon names", () => {
    expect(validateName("pikachu")).toBe("pikachu");
    expect(validateName("eevee")).toBe("eevee");
  });

  it("should return lowercase name for names with mixed case", () => {
    expect(validateName("Pikachu")).toBe("pikachu");
    expect(validateName("Eevee")).toBe("eevee");
  });

  it("should return lowercase name for names with uppercase", () => {
    expect(validateName("PIKACHU")).toBe("pikachu");
    expect(validateName("EEVEE")).toBe("eevee");
  });

  it("should trim whitespace from names", () => {
    expect(validateName(" pikachu ")).toBe("pikachu");
    expect(validateName(" eevee ")).toBe("eevee");
  });

  it("should reject for empty names", () => {
    expect(() => validateName("")).toThrow(BadRequestError);
    expect(() => validateName(undefined)).toThrow(BadRequestError);
  });

  it("should reject names shorter than 2 characters", () => {
    expect(() => validateName("a")).toThrow(BadRequestError);
  });

  it("should reject invalid characters", () => {
    expect(() => validateName("pika@chu")).toThrow(BadRequestError);
    expect(() => validateName("pika chu")).toThrow(BadRequestError);
    expect(() => validateName("pika_chu")).toThrow(BadRequestError);
  });
});
