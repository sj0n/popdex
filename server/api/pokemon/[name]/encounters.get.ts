interface PokemonEncounters {
    location_area: object,
    version_details: VersionDetail[]
}

interface VersionDetail {
    [index: string]: object[]
}

export default defineEventHandler(async (event) => {
    const name = event.context.params.name;
    const url = `https://pokeapi.co/api/v2/pokemon/${name}/encounters`;
    try {
        const data: any[] = await $fetch(url);
        const desctructed = data.map((obj) => {
            // Desctructer objects on response data
            let { location_area, version_details: [{ encounter_details }] }: PokemonEncounters = obj;

            return { location_area, version_details: [{ encounter_details }]}
        })
        return desctructed;
    } catch ({ name, message }) {
        return {
            ok: false,
            response: { name, message }
        }
    }
});