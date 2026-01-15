import { setup, createPage } from "@nuxt/test-utils/e2e";
import { describe, it, expect } from "vitest";

describe("Homepage", async () => {
  await setup({
    host: "http://localhost:8787",
  });

  it("should display the homepage", async () => {
    const page = await createPage("/");

    expect(await page.getByTestId("header").isVisible()).toBeTruthy();
    expect(await page.getByTestId("search-input").isVisible()).toBeTruthy();
  });
});
