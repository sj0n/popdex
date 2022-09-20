<script setup>
const props = defineProps({
    pokemonName: String
})
const urlPokemonMoves = `/api/pokemon/${props.pokemonName}/moves`;
const { data: moves, pending } = await useLazyFetch(urlPokemonMoves);
</script>
<template>
    <div class="pokemon-moves">
        <p v-if="pending">Loading...</p>
        <template v-else>
            <h2>Moves</h2>
            <div>
                <div v-for="move, level of moves.response.formattedMoves">
                    <p class="pokemon-moves-subheading">Level {{ level }}</p>
                    <div class="moves-wrapper">
                        <div v-for="data of move" class="move-pill">
                            <span>{{ data.name }}</span>
                            <p>Learn by: {{ data.learn_by }}</p>
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