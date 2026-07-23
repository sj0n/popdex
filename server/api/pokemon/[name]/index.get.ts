import { definePokemonEndpoint } from "@@/server/utils/define-pokemon-endpoint";
import type { PokemonProfile } from "@@/server/types/pokemon-api";

export default definePokemonEndpoint<PokemonProfile>("getPokemon");
