import { titleCase } from "@/libs/titleCase";

interface PokemonMoves {
    moves: [
        {
            move: object
            version_group_details: MoveDetails[]
        }
    ]
}

interface MoveDetails {
    level_learned_at: number,
    move_learn_method: {
            [index: string]: string
    }
}

export default defineEventHandler(async (event) => {
    const name = getRouterParam(event, 'name');
    try {
        const { moves } = await $fetch<PokemonMoves>(`https://pokeapi.co/api/v2/pokemon/${name}`);
        let tempMoves: Record<string, any>[] = [];
        let formattedMoves: any = {};

        for (const { move, version_group_details: [{ level_learned_at, move_learn_method : { name }}] } of moves) {
            tempMoves = [...tempMoves, { move, level_learned_at, learn_by: name }];
        }
        /*
         Group pokemon moves by levels
        */
        for (const tempMove of tempMoves) {
            tempMove.move.name = titleCase(tempMove.move.name);
            if (!formattedMoves.hasOwnProperty(tempMove.level_learned_at)) {
                formattedMoves[tempMove.level_learned_at] =  [{ 'name': tempMove.move.name, 'learn_by': tempMove.learn_by }];
            } else {
                formattedMoves[tempMove.level_learned_at].push({ 'name': tempMove.move.name, 'learn_by': tempMove.learn_by });
            }
        }

        setResponseHeaders(event, {
            'Cache-Control': 'public, max-age=604800, must-revalidate',
            'Expires': new Date(Date.now() + 604800000).toUTCString()
        });
        return {
            ok: true,
            response: formattedMoves
        }
    } catch(e) {
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

            return {
                ok: false,
                message: e.message,
            }
        } else {
            setResponseStatus(event, 500);
            return {
                ok: false,
                message: 'An error occured. Try again later.'
            }
        }
    }
})