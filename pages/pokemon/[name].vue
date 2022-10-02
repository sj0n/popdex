<script setup lang="ts">
import { titleCase } from '@/libs/titleCase';
import { titleCaseMap } from '@/libs/enumerateTitleCase';
import type { Ref } from 'vue';
import { RouteParams } from 'vue-router';

definePageMeta({
    layout: 'pokemon'
})

type Params = RouteParams & {
    name?: string
}

const params: Params = useRoute().params;
const url = `/api/pokemon/${params.name}`;
const { data, pending }: {data: Ref<any>, pending: Ref<boolean>} = await useLazyFetch(url);
const nameTitleCase = computed(() => titleCase(params.name))
const pokemonTypes = computed(() => titleCaseMap(data.value.response.types, 'type'))
const pokemonAbilities = computed(() => titleCaseMap(data.value.response.abilities, 'ability'));

useHead({
    title: `${nameTitleCase.value}`
})
</script>

<template>
    <main>
        <p v-if="pending">Loading!</p>
        <template v-else-if="data.ok">
            <section class="pokemon-profile">
                <img :src="data.response.image" :alt="data.response.name" width="96" height="96" loading="lazy">
                <div>
                    <div class="pokemon-info">
                        <span>Name</span>
                        <p>{{ nameTitleCase }}</p>
                    </div>
                    <div class="pokemon-info">
                        <span>Height</span>
                        <p>{{ data.response.height / 10 }}m</p>
                    </div>
                    <div class="pokemon-info">
                        <span>Weight</span>
                        <p>{{ data.response.weight / 10 }}kg</p>
                    </div>
                    <div class="pokemon-info">
                        <span>Types</span>
                        <div class="pokemon-type">
                            <p v-for="typeName of pokemonTypes">
                                {{ typeName }}
                            </p>
                        </div>
                    </div>
                    <div class="pokemon-info">
                        <span>Abilities</span>
                        <div class="pokemon-ability">
                            <p v-for="abilityName of pokemonAbilities">
                                {{ abilityName }}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <LazyPokemonMoves :pokemon-name="params.name" />
        </template>
        <div v-else-if="data.response.message.includes('404')" class="error-404">
            <h2>404</h2>
            <p>Can't find what you're looking for :(</p>
        </div>
    </main>
</template>

<style scoped>
main {
    margin-bottom: 2rem;
}

.pokemon-profile {
    border-color: hsl(0, 0%, 17%);
    border-style: dashed;
    border-radius: 5px;
    display: flex;
    gap: 4rem;
    padding: 1rem 2rem;
    align-items: center;
    margin-bottom: 2rem;
}

.pokemon-profile>div {
    display: flex;
    flex-wrap: wrap;
    gap: 4rem;
}

.pokemon-info>span {
    font-size: 1.1rem;
    font-weight: 700;
}

.error-404 {
    margin-top: 2rem;
}

@media screen and (max-width: 59rem) {
    .pokemon-profile>div {
        gap: 2rem;
    }
}

@media screen and (max-width: 49rem) {
    .pokemon-profile>div {
        gap: 1.3rem;
    }
}
</style>