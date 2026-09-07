import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import PokemonSpawn from "@@/app/components/PokemonSpawn.vue";
import PokemonMoves from "@@/app/components/PokemonMoves.vue";
import PokemonDataPanel from "@@/app/components/PokemonDataPanel.vue";
import { mockLocationData, mockMovesData } from "../fixtures/pokemon-responses";

const refresh = () => Promise.resolve();

describe("finish pass render check", () => {
  it("locations shows label, plain version names, cards", async () => {
    const wrapper = await mountSuspended(PokemonSpawn, {
      props: {
        data: mockLocationData,
        status: "success",
        error: undefined,
        refresh,
      },
    });
    expect(wrapper.find("label").text()).toBe("Game version");
    expect(
      wrapper
        .get('[data-testid="locations-version"]')
        .findAll("option")[0]
        .text(),
    ).toBe("Alpha Sapphire");
    expect(wrapper.get('[data-testid="locations"]').findAll("li")).toHaveLength(
      4,
    );
  });

  it("moves shows label, plain version names", async () => {
    const wrapper = await mountSuspended(PokemonMoves, {
      props: {
        data: mockMovesData,
        status: "success",
        error: undefined,
        refresh,
      },
    });
    expect(wrapper.find("label").text()).toBe("Game version");
    expect(
      wrapper.get('[data-testid="moves-version"]').findAll("option")[0].text(),
    ).toBe("Black 2 White 2");
  });

  it("empty version shows teaching empty state", async () => {
    const wrapper = await mountSuspended(PokemonSpawn, {
      props: {
        data: { versions: { Yellow: [] } },
        status: "success",
        error: undefined,
        refresh,
      },
    });
    expect(wrapper.text()).toContain("No locations in Yellow");
    expect(wrapper.text()).toContain("Pick another game version");
  });

  it("data panel keeps both tabs and panels mounted for e2e", async () => {
    const wrapper = await mountSuspended(PokemonDataPanel, {
      props: {
        locations: mockLocationData,
        locationsStatus: "success",
        locationsError: undefined,
        refreshLocations: refresh,
        moves: mockMovesData,
        movesStatus: "success",
        movesError: undefined,
        refreshMoves: refresh,
      },
    });
    const tabs = wrapper.findAll('[role="tab"]');
    expect(tabs.map((t) => t.text())).toEqual(["Locations", "Moves"]);
    expect(wrapper.get('[data-testid="locations"]').exists()).toBe(true);
    expect(wrapper.get('[data-testid="moves"]').exists()).toBe(true);
  });
});
