export interface PokemonSpawnLocation {
   versions: {
    [index: string]: [
        {
            location_name: string
            min_level: number
            max_level: number
            method: string
        }
    ]
   }
}

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const name = getRouterParam(event, 'name');
    try {
        const { _data: resp, headers} = await $fetch.raw<PokemonSpawnLocation>(`${config.originAPI}${name}/locations`);

        setResponseHeaders(event, {
            "cache-control": headers.get('cache-control'),
            etag: headers.get('etag'),
        })

        return resp;
    } catch (e) {
        if (e instanceof Error) {
            if (e.message.includes('Not Found')) {
                setResponseStatus(event, 404, e.message);
            } else if (e.message.includes('Forbidden')) {
                setResponseStatus(event, 403);
            } else if (e.message.includes('Bad Request')) {
                setResponseStatus(event, 400);
            } else {
                setResponseStatus(event, 500);
            }

            return e.message
        } else {
            setResponseStatus(event, 500);
            return 'Internal Server Error.'
        }
    }
});