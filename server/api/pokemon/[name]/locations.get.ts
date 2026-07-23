import { definePokemonEndpoint } from "@@/server/utils/define-pokemon-endpoint";
import type { PokemonSpawnLocation } from "@@/server/types/pokemon-api";

export default definePokemonEndpoint<PokemonSpawnLocation>(
  "getPokemonLocations",
);
