export interface PokemonWorker {
  getPokemon(name: string): Promise<Response>;
  getPokemonLocations(name: string): Promise<Response>;
  getPokemonMoves(name: string): Promise<Response>;
}

declare module "h3" {
  interface H3EventContext {
    cloudflare: {
      env: {
        pokemon: PokemonWorker;
      };
    };
  }
}