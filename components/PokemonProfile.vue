<script setup lang="ts">
import type { PokemonProfile } from "~/server/api/pokemon/[name]/index.get";
import { Skeleton } from "./ui/skeleton";
import { titleCase } from "~/libs/titleCase";

const route = useRoute();
const { data, status, error } = await useLazyFetch<PokemonProfile>(
  `/api/pokemon/${route.params.name}`,
  {
    cache: "no-cache",
  },
);
</script>

<template>
  <template v-if="status === 'pending'">
    <Skeleton class="mb-12 h-32 w-full" />
  </template>
  <div v-else-if="status === 'error' && error?.statusCode === 404" class="mt-2">
    <h2>404 😭</h2>
    <p>Pokemon not found.</p>
  </div>
  <section
    v-else-if="status === 'success' && data"
    class="pixel-border mb-12 bg-neutral-200 p-6 dark:bg-neutral-900"
  >
    <div class="flex flex-col items-center gap-2 md:flex-row md:gap-8">
      <img
        :src="data.sprites.front_default"
        :alt="data.name"
        class="image-pixelated h-32 w-32"
        loading="lazy"
      />
      <div class="space-y-4 text-center md:text-start">
        <h2 class="text-3xl font-semibold text-teal-400 dark:text-teal-200">
          {{ titleCase(data.name) }}
        </h2>
        <div
          class="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] items-center gap-6 md:grid-cols-4"
        >
          <div>
            <p class="mb-1 text-xs font-bold dark:text-neutral-400">Height</p>
            <p class="py-2 dark:text-white">{{ data.height / 10 }}m</p>
          </div>
          <div>
            <p class="mb-1 text-xs font-bold dark:text-neutral-400">Weight</p>
            <p class="py-2 dark:text-white">{{ data.weight / 10 }}kg</p>
          </div>
          <div>
            <p class="mb-2 text-xs font-bold dark:text-neutral-400">Types</p>
            <div class="flex flex-wrap justify-center gap-2 md:justify-start">
              <span
                v-for="(data, index) of data.types"
                :key="index"
                class="pixel-border w-full bg-teal-400 px-3 py-2 text-black md:w-[initial] dark:bg-teal-200"
              >
                {{ titleCase(data.type.name) }}</span
              >
            </div>
          </div>
          <div>
            <p class="mb-2 text-xs font-bold dark:text-neutral-400">
              Abilities
            </p>
            <div class="flex flex-wrap justify-center gap-2 md:justify-start">
              <span
                v-for="(data, index) of data.abilities"
                :key="index"
                class="pixel-border w-full bg-teal-400 px-3 py-2 text-black md:w-[initial] dark:bg-teal-200"
              >
                {{ titleCase(data.ability.name) }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
