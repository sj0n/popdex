import pokemonHandler from "@@/server/utils/pokemon-handler";
import createPokemonClient from "@@/server/client/pokemon-worker";

export default defineEventHandler(async (event) => {
  const client = createPokemonClient(event.context.cloudflare.env.pokemon);
  return await pokemonHandler(event, client.getPokemon);
});
