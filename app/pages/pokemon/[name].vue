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
  refreshProfile,
  locationsData,
  locationsStatus,
  locationsError,
  refreshLocations,
  movesData,
  movesStatus,
  movesError,
  refreshMoves,
} = usePokemonData(() => pokemonName.value);
</script>

<template>
  <PokemonProfile
    :data="profileData"
    :status="profileStatus"
    :error="profileError"
    :refresh="refreshProfile"
  />
  <template
    v-if="profileStatus !== 'error' || profileError?.statusCode !== 404"
  >
    <PokemonDataPanel
      :locations="locationsData"
      :locations-status="locationsStatus"
      :locations-error="locationsError"
      :refresh-locations="refreshLocations"
      :moves="movesData"
      :moves-status="movesStatus"
      :moves-error="movesError"
      :refresh-moves="refreshMoves"
    />
  </template>
</template>
