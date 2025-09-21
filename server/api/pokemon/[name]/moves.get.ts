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
    const name = getRouterParam(event, 'name');
    const requestEtag = getRequestHeader(event, 'if-none-match');

    try {
        const resp: Response = await event.context.cloudflare.env.pokemon.getPokemonMoves(name);
        if (requestEtag === resp.headers.get('etag')) {
            setResponseHeader(event, "etag", resp.headers.get('etag'));
            setResponseStatus(event, 304)
            return;
        }

        setResponseHeaders(event, {
            etag: resp.headers.get('etag'),
            "cache-control": resp.headers.get('cache-control')
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
