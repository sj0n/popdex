export interface PokemonProfile {
    id: number,
    name: string,
    height: number,
    weight: number,
    image: string,
    types: object[],
    abilities: object[],
    sprites: {
        [index: string]: string
    }
}

export default defineEventHandler(async (event) => {
    const nameParam = getRouterParam(event, 'name');

    try {
        const { id, name, height, weight, types, abilities, sprites: { front_default } } = await $fetch<PokemonProfile>(`https://pokeapi.co/api/v2/pokemon/${nameParam}`);

        return {
            ok: true,
            response: {
                id, name, height, weight, image: front_default, types, abilities
            }
        }
    } catch (e) {
        if (e instanceof Error) {
            if (e.message.includes('Not Found')) {
                setResponseStatus(event, 404, e.message);
            } else if (e.message.includes('Unauthorized')) {
                setResponseStatus(event, 401);
            } else if (e.message.includes('Bad Request')) {
                setResponseStatus(event, 400);
            } else {
                setResponseStatus(event, 500);
            }
            
            return {
                ok: false,
                message: e.message
            }
        } else {
            setResponseStatus(event, 500);
            return {
                ok: false,
                message: 'An error occured. Try again later.'
            }
        }
    }
});

