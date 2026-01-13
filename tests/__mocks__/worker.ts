import { vi } from "vitest";
import {
  mockPokemonData,
  mockLocationData,
  mockMovesData,
  createCachedResponse,
  createMockResponse,
} from "../fixtures/pokemon-responses";


export interface RequestContext {
  requestHeaders?: Record<string, string | null | undefined>;
}

/**
 * Factory function for creating mock workers with custom data
 * Allows overriding default responses for specific test cases
 */
export function createMockPokemonWorker(overrides: {
  pokemon?: unknown | ((name: string, context?: RequestContext) => Promise<Response>);
  locations?: unknown | ((name: string, context?: RequestContext) => Promise<Response>);
  moves?: unknown | ((name: string, context?: RequestContext) => Promise<Response>);
} = {}) {
  return {
    getPokemon: vi.fn(async (name: string, context?: RequestContext) => {
      if (typeof overrides.pokemon === 'function') {
        return overrides.pokemon(name, context);
      }
      const data = overrides.pokemon || mockPokemonData;
      const cached = createCachedResponse(data);
      return createMockResponse(cached.data, {
        headers: cached.headers,
      });
    }),

    getPokemonLocations: vi.fn(async (name: string, context?: RequestContext) => {
      if (typeof overrides.locations === 'function') {
        return overrides.locations(name, context);
      }
      const data = overrides.locations || mockLocationData;
      const cached = createCachedResponse(data);
      return createMockResponse(cached.data, {
        headers: cached.headers,
      });
    }),

    getPokemonMoves: vi.fn(async (name: string, context?: RequestContext) => {
      if (typeof overrides.moves === 'function') {
        return overrides.moves(name, context);
      }
      const data = overrides.moves || mockMovesData;
      const cached = createCachedResponse(data);
      return createMockResponse(cached.data, {
        headers: cached.headers,
      });
    }),
  };
}