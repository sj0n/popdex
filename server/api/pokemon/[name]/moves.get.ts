import pokemonHandler from "@@/server/utils/pokemon-handler";
import createPokemonClient from "@@/server/client/pokemon-worker";
import type { PokemonMoves } from "@@/server/types/pokemon-api";

export default defineEventHandler(async (event) => {
  const client = createPokemonClient(event.context.cloudflare.env.pokemon);
  return await pokemonHandler<PokemonMoves>(event, client.getPokemonMoves);
});
