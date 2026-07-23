import { definePokemonEndpoint } from "@@/server/utils/define-pokemon-endpoint";
import type { PokemonMoves } from "@@/server/types/pokemon-api";

export default definePokemonEndpoint<PokemonMoves>("getPokemonMoves");
