import { describe, it, expect } from "bun:test";
import { titleCase } from "../libs/titleCase";

describe.concurrent("Title Case", () => {
  it("should capitalize the first letter of a word", () => {
    const word = "hello";
    expect(titleCase(word)).toEqual("Hello");
  });

  it("should capitalize the first letter of words with format: hello-world", () => {
    const word = "hello-world";
    expect(titleCase(word)).toEqual("Hello World");
  });
});