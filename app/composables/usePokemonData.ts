import type {
  PokemonProfile,
  PokemonSpawnLocation,
  PokemonMoves,
} from "@@/server/types/pokemon-api";

/**
 * Fires the three Pokémon data fetches for a given name.
 *
 * Each fetch is an independent `useLazyFetch`, so the profile, locations,
 * and moves sections render progressively as their data resolves — there
 * is no shared blocking. The page consumes the returned refs and passes
 * them down as props, making the presentational components fetch-agnostic.
 */
export function usePokemonData(name: () => string) {
  const profile = useLazyFetch<PokemonProfile>(() => `/api/pokemon/${name()}`);
  const locations = useLazyFetch<PokemonSpawnLocation>(
    () => `/api/pokemon/${name()}/locations`,
  );
  const moves = useLazyFetch<PokemonMoves>(
    () => `/api/pokemon/${name()}/moves`,
  );

  return {
    profileData: profile.data,
    profileStatus: profile.status,
    profileError: profile.error,
    locationsData: locations.data,
    locationsStatus: locations.status,
    locationsError: locations.error,
    movesData: moves.data,
    movesStatus: moves.status,
    movesError: moves.error,
  };
}
