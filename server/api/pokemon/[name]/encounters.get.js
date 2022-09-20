export default defineEventHandler(async (event) => {
    const name = event.context.params.name;
    const url = `https://pokeapi.co/api/v2/pokemon/${name}/encounters`;
    try {
        const data = await $fetch(url);
        const desctructed = data.map((obj) => {
            // Desctructer objects on response data
            const { location_area, version_details: [{ 
                        encounter_details: [{ method }], 
                        version
                    }]
                } = obj;

            return { location_area, version_details: [{ 
                        encounter_details: [{ method }], 
                        version
                    }]
                }
        })
        return desctructed;
    } catch ({ name, message}) {
        return {
            ok: false,
            response: { name, message }
        }
    }
});