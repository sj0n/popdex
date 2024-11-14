<script setup lang="ts">
import { titleCase } from "@/libs/titleCase";
import { titleCaseMap } from "@/libs/enumerateTitleCase";
import type { PokemonProfile } from "~/server/api/pokemon/[name]/index.get";

definePageMeta({
  layout: "pokemon",
});

const route = useRoute();
const { data, status, error } = await useFetch<PokemonProfile>(
  `/api/pokemon/${route.params.name}`,
);

const pokemonTypes = computed(() =>
  data.value?.types ? titleCaseMap(data.value.types, "type") : [],
);
const pokemonAbilities = computed(() =>
  data.value?.abilities ? titleCaseMap(data.value.abilities, "ability") : [],
);
const nameTitleCase = computed(() => titleCase(route.params.name as string));

useHead({
  title: `${nameTitleCase.value}`,
});
</script>

<template>
  <main class="mb-2 lg:mb-0">
    <p v-if="status === 'pending'">Loading!</p>
    <div
      v-else-if="status === 'error' && error?.statusCode === 404"
      class="mt-2"
    >
      <h2>404 😭</h2>
      <p>Pokemon not found.</p>
    </div>
    <template v-else-if="status === 'success' && data">
      <section
        class="mb-8 flex flex-col gap-4 rounded-[10px] bg-white px-4 py-6 lg:flex-row lg:px-2 lg:py-3 dark:bg-neutral-900"
      >
        <div class="flex w-full items-center justify-center lg:w-auto lg:pl-6">
          <img
            :src="data.sprites.front_default"
            :alt="data.name"
            width="96"
            height="96"
            loading="lazy"
            class=""
          />
          <span class="text-2xl font-semibold">{{ nameTitleCase }}</span>
        </div>
        <div
          class="flex flex-wrap justify-center gap-8 lg:ml-auto lg:items-center lg:gap-16 lg:pr-10"
        >
          <div>
            <span class="text-lg font-semibold">Height</span>
            <p>{{ data.height / 10 }}m</p>
          </div>
          <div>
            <span class="text-lg font-semibold">Weight</span>
            <p>{{ data.weight / 10 }}kg</p>
          </div>
          <div>
            <span class="text-lg font-semibold">Types</span>
            <div>
              <p v-for="(typeName, index) of pokemonTypes" :key="index">
                {{ typeName }}
              </p>
            </div>
          </div>
          <div>
            <span class="text-lg font-semibold">Abilities</span>
            <div>
              <p v-for="(abilityName, index) of pokemonAbilities" :key="index">
                {{ abilityName }}
              </p>
            </div>
          </div>
        </div>
      </section>
      <PokemonSpawn :pokemon-name="route.params.name as string" />
      <PokemonMoves :pokemon-name="route.params.name as string" />
    </template>
  </main>
</template>
