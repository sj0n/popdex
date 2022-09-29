interface PokemonBasicData {
    id: number,
    name: string,
    height: number,
    weight: number,
    types: object[],
    abilities: object[],
    sprites: {
        front_default: string
    }
}

export default defineEventHandler(async (event) => {
    const { name } = event.context.params;
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    try {
        const { id, name, height, weight, types, abilities, sprites: { front_default }}: PokemonBasicData = await $fetch(url);
        return {
            ok: true,
            response: {
                id, name, height, weight, image: front_default, types, abilities
            }
        }
    } catch({ name, message }) {
        return {
            ok: false,
            response: { name, message }
        }
    }
});

