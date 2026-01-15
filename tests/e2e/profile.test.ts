import { describe, it, expect } from "vitest";
import { setup, createPage, url } from "@nuxt/test-utils/e2e";

describe("Pokemon Profile", { timeout: 10000 }, async () => {
  await setup({ host: "http://localhost:8787" });

  it("displays the pokemon page", async () => {
    const page = await createPage("/pokemon/pikachu");

    expect(await page.getByTestId("profile").isVisible()).toBeTruthy();
    expect(await page.getByTestId("moves").isVisible()).toBeTruthy();
  });

  it("search pokemon name will direct user to the pokemon page", { timeout: 10000 }, async () => {
    const page = await createPage("/");
    const input = page.getByTestId("search-input");
    
    await input.fill("pikachu");
    await input.press("Enter");
    await page.waitForURL(url("/pokemon/pikachu"));

    const profile = page.getByTestId("profile");
    
    // .isVisible() is flacky when doing interactive test
    // so we force 'check' on the component
    const _ = await profile.textContent();

    expect(await profile.isVisible()).toBeTruthy();
    expect(await page.getByTestId("locations").isVisible()).toBeTruthy();
    expect(await page.getByTestId("moves").isVisible()).toBeTruthy();
  });
});
