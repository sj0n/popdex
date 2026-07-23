import { describe, it, expect, vi } from "vitest";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";
import PokemonSearch from "@@/app/components/SearchPokemon.vue";

mockNuxtImport("navigateTo", () => vi.fn());
mockNuxtImport("useScriptUmamiAnalytics", () => () => ({
  load: () => Promise.resolve({ track: vi.fn() }),
}));

describe("Homepage Pokemon Search component", () => {
  it("renders the pokemon search component", async () => {
    const wrapper = await mountSuspended(PokemonSearch);
    const inputElement = wrapper.find('[data-testid="search-input"]');
    expect(inputElement.element.tagName).toBe("INPUT");
  });

  it("updates input value on user input", async () => {
    const wrapper = await mountSuspended(PokemonSearch);
    const inputElement = wrapper.find('[data-testid="search-input"]');
    await inputElement.setValue("pikachu");
    expect((inputElement.element as HTMLInputElement).value).toBe("pikachu");

    await inputElement.setValue("rayquaza");
    expect((inputElement.element as HTMLInputElement).value).toBe("rayquaza");
  });

  it("navigates on form submit", async () => {
    const wrapper = await mountSuspended(PokemonSearch);
    const inputElement = wrapper.find('[data-testid="search-input"]');
    const form = wrapper.find("form");

    await inputElement.setValue("pikachu");
    await form.trigger("submit");

    expect(navigateTo).toHaveBeenCalledWith("/pokemon/pikachu");
  });
});
