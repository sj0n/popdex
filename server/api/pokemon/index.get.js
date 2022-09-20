export default defineEventHandler(async (event) => {
    const { limit, offset } = useQuery(event);
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit || 10}&offset=${offset}`;
    try {
        const data = await $fetch(url);
        const pokemon = data.results.map((data, index) => {
            return {
                index: index + 1,
                name: data.name,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
					index + 1
				}.png`
            }
        });
        return {
            ok: true,
            previous: data.previous,
            next: data.next,
            response: pokemon
        }
    } catch(e) {
        return {
            ok: false,
            response: e.message
        }
    }
});