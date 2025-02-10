export interface PokemonMoves {
    versions: {
        [index: string]: [
            {
                name: string
                level: number
                learn_method: string
            }
        ]
    }
}

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const name = getRouterParam(event, 'name');
    const requestEtag = getRequestHeader(event, 'if-none-match');

    try {
        const { _data: resp, headers } = await $fetch.raw<PokemonMoves>(`${config.originAPI}${name}/moves`);

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
                setResponseStatus(event, 404);
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
})