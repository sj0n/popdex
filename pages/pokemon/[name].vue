<script setup lang="ts">
import { titleCase } from "@/libs/titleCase";
import { titleCaseMap } from "@/libs/enumerateTitleCase";


definePageMeta({
    layout: "pokemon",
});

const route = useRoute();
const pokemonName = route.params.name as string;
const nameTitleCase = computed(() => titleCase(pokemonName));

useHead({
    title: `${nameTitleCase.value}`,
});
</script>

<template>
    <PokemonProfile />
    <PokemonSpawn />
    <PokemonMoves />
</template>