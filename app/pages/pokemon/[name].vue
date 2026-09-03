<script setup lang="ts">
import { titleCase } from "@@/libs/titleCase";
import { usePokemonData } from "~/composables/usePokemonData";

definePageMeta({
  layout: "pokemon",
});

const route = useRoute();
const pokemonName = computed(() => route.params.name as string);
const nameTitleCase = computed(() => titleCase(pokemonName.value));

useHead({
  title: nameTitleCase,
});

const {
  profileData,
  profileStatus,
  profileError,
  locationsData,
  locationsStatus,
  locationsError,
  movesData,
  movesStatus,
  movesError,
} = usePokemonData(() => pokemonName.value);
</script>

<template>
  <PokemonProfile
    :data="profileData"
    :status="profileStatus"
    :error="profileError"
  />
  <template
    v-if="profileStatus !== 'error' || profileError?.statusCode !== 404"
  >
    <PokemonSpawn
      :data="locationsData"
      :status="locationsStatus"
      :error="locationsError"
    />
    <PokemonMoves :data="movesData" :status="movesStatus" :error="movesError" />
  </template>
</template>
