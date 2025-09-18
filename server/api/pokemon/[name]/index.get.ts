export interface PokemonProfile {
    id: number,
    name: string,
    height: number,
    weight: number,
    types: string[],
    abilities: string[],
    sprites: {
        front_default: string
    }
}

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const name = getRouterParam(event, 'name');
    const requestEtag = getRequestHeader(event, 'if-none-match');

    //debug log
    console.log('Request Debug:', {
        config: {
            originAPI: config.originAPI,
            fullUrl: `${config.originAPI}${name}`
        },
        headers: getHeaders(event),
        params: { name }
    });

    try {
        const { _data: resp, headers } = await $fetch.raw<PokemonProfile>(`${config.originAPI}${name}`);

        if (requestEtag === headers.get('etag')) {
            setResponseHeader(event, "etag", headers.get('etag'));
            setResponseStatus(event, 304)
            return;
        }

        setResponseHeaders(event, {
            etag: headers.get('etag'),
            "cache-control": headers.get('cache-control')
        });

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

            return e.message;
        } else {
            setResponseStatus(event, 500);
            return 'Internal Server Error.'
        }
    }
});

