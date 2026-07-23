import type { H3Event } from "h3";
import pokemonHandler from "./pokemon-handler";
import createPokemonClient from "../client/pokemon-worker";

type WorkerMethod =
  | "getPokemon"
  | "getPokemonLocations"
  | "getPokemonMoves";

/**
 * Factory for Pokemon API endpoints. Each route file is a one-liner that
 * declares its response type and the worker method to call. The factory
 * owns the create-client + call-handler wiring so it isn't triplicated.
 */
export function definePokemonEndpoint<T>(method: WorkerMethod) {
  return defineEventHandler(async (event: H3Event) => {
    const client = createPokemonClient(event.context.cloudflare.env.pokemon);
    return await pokemonHandler<T>(event, client[method]);
  });
}
