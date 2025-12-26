export interface PokemonProfile {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: string[];
  abilities: string[];
  sprites: {
    front_default: string;
  };
}

export interface PokemonSpawnLocation {
  versions: {
    [index: string]: [
      {
        location_name: string;
        min_level: number;
        max_level: number;
        method: string;
      },
    ];
  };
}

export interface PokemonMoves {
  versions: {
    [index: string]: [
      {
        name: string;
        level: number;
        learn_method: string;
      },
    ];
  };
}