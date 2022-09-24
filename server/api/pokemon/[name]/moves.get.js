import { titleCase } from "@/libs/titleCase";

export default defineEventHandler(async (event) => {
    const { name } = event.context.params;
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    try {
        let tempMoves = [];
        let formattedMoves = {};
        const { moves } = await $fetch(url);

        for (const { move, version_group_details: [{ level_learned_at, move_learn_method : { name }}] } of moves) {
            tempMoves = [...tempMoves, { move, level_learned_at, learn_by: name }];
        }
        /*
         Group pokemon moves by level available
        */
        for (const tempMove of tempMoves) {
            tempMove.move.name = titleCase(tempMove.move.name);
            if (!formattedMoves.hasOwnProperty(tempMove.level_learned_at)) {
                formattedMoves[tempMove.level_learned_at] =  [{ 'name': tempMove.move.name, 'learn_by': tempMove.learn_by }];
            } else {
                formattedMoves[tempMove.level_learned_at].push({ 'name': tempMove.move.name, 'learn_by': tempMove.learn_by });
            }
        }
        return {
            ok: true,
            response: {
                formattedMoves
            }
        }
    } catch({ name, message }) {
        return {
            ok: false,
            response: { name, message }
        }
    }
})