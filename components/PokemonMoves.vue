<script setup lang="ts">
import type { Ref } from 'vue';

const props = defineProps<{
    pokemonName: any
}>()
const urlPokemonMoves = `/api/pokemon/${props.pokemonName}/moves`;
const { data, pending }: { data: Ref<any>; pending: Ref<boolean> } = await useLazyFetch(urlPokemonMoves);
</script>
<template>
    <div class="pokemon-moves">
        <p v-if="pending">Loading...</p>
        <template v-else>
            <h2>Moves</h2>
            <div>
                <div v-for="moves, level of data.response.formattedMoves">
                    <p class="pokemon-moves-subheading">Level {{ level }}</p>
                    <div class="moves-wrapper">
                        <div v-for="move of moves" class="move-pill">
                            <span>{{ move.name }}</span>
                            <p>Learn by: {{ move.learn_by }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<style scoped>
h2 {
    font-size: 2.5rem;
}

.pokemon-moves {
    border-color: hsl(0, 0%, 17%);
    border-style: dashed;
    border-radius: 5px;
    padding: 1rem 2rem;
}

.pokemon-moves-subheading {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 1rem;
}

.moves-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin-bottom: 1rem;
}

.move-pill {
    background-color: hsla(160, 52%, 66%, .3);
    border-radius: 10px;
    padding: 1rem;
}

.move-pill > span {
    font-weight: 600;
}

@media screen and (max-width: 49rem) {
    .move-pill {
        width: 100%;
        text-align: center;
    }
}
</style>