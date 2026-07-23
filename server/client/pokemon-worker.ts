import type { PokemonWorker } from "../types/worker-api";
import { GatewayTimeoutError } from "../types/api-error";

const DEFAULT_TIMEOUT_MS = 8000;

/**
 * Wraps a worker method so it rejects with GatewayTimeoutError if the
 * upstream service binding doesn't respond within DEFAULT_TIMEOUT_MS.
 *
 * Service bindings don't accept an AbortSignal directly, so we race the
 * real call against a rejecting timer and clear it on settlement.
 */
function withTimeout(
  fn: (name: string) => Promise<Response>,
): (name: string) => Promise<Response> {
  return async (name: string) => {
    let timer: ReturnType<typeof setTimeout>;
    const timeout = new Promise<Response>((_, reject) => {
      timer = setTimeout(
        () => reject(new GatewayTimeoutError()),
        DEFAULT_TIMEOUT_MS,
      );
    });
    try {
      return await Promise.race([fn(name), timeout]);
    } finally {
      clearTimeout(timer!);
    }
  };
}

export default function createPokemonWorker(worker: PokemonWorker) {
  return {
    getPokemon: withTimeout(worker.getPokemon),
    getPokemonLocations: withTimeout(worker.getPokemonLocations),
    getPokemonMoves: withTimeout(worker.getPokemonMoves),
  };
}
