import { describe, it, expect } from "vitest";
import { titleCase } from "../../../libs/titleCase";

describe.concurrent("Title Case", () => {
  it("should capitalize the first letter of a word", () => {
    expect(titleCase("hello")).toEqual("Hello");
  });

  it("should capitalize the first letter of words with format: hello-world", () => {
    expect(titleCase("hello-world")).toEqual("Hello World");
  });

  it("should return an empty string for empty input", () => {
    expect(titleCase("")).toEqual("");
  });

  it("should handle multiple hyphens", () => {
    expect(titleCase("mewtwo-mega-x")).toEqual("Mewtwo Mega X");
  });
});
