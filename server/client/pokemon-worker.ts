import type { PokemonWorker } from '../types/worker-api';

export default function createPokemonWorker(worker: PokemonWorker) {
  return {
    getPokemon: async (name: string) => worker.getPokemon(name),
    getPokemonLocations: async (name: string) => worker.getPokemonLocations(name),
    getPokemonMoves: async (name: string) => worker.getPokemonMoves(name),
  }
}