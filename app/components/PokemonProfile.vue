<script setup lang="ts">
import type { PokemonProfile } from "@@/server/types/pokemon-api";
import type { FetchError } from "ofetch";
import type { AsyncDataRequestStatus } from "#app";
import { Skeleton } from "./ui/skeleton";

const props = defineProps<{
  data: PokemonProfile | undefined;
  status: AsyncDataRequestStatus;
  error: FetchError | undefined;
  refresh: () => Promise<unknown>;
}>();
</script>

<template>
  <template v-if="status === 'pending'">
    <div
      role="status"
      aria-label="Loading Pokémon profile"
      class="pixel-border anim-rise dex-panel mt-4 mb-8 p-6 sm:mb-10 sm:p-8"
    >
      <div class="flex flex-col items-center gap-6 md:flex-row md:gap-10">
        <Skeleton class="h-48 w-48 shrink-0 sm:h-56 sm:w-56" />
        <div class="w-full flex-1 space-y-4">
          <Skeleton class="h-4 w-32" />
          <Skeleton class="h-10 w-48" />
          <div class="flex gap-2">
            <Skeleton class="h-9 w-24" />
            <Skeleton class="h-9 w-24" />
          </div>
          <div class="grid grid-cols-2 gap-6">
            <Skeleton class="h-10 w-full" />
            <Skeleton class="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  </template>
  <div
    v-else-if="status === 'error' && error?.statusCode === 404"
    class="mx-auto max-w-md py-16 text-center leading-relaxed"
    role="alert"
  >
    <h2 class="text-4xl leading-none font-semibold">404</h2>
    <p class="mt-4">
      No Pokémon found with that name. Check the spelling, e.g.
      <NuxtLink to="/pokemon/pikachu" class="underline underline-offset-4"
        >pikachu</NuxtLink
      >.
    </p>
  </div>
  <div
    v-else-if="status === 'error' && !(error?.statusCode === 404)"
    class="mt-2 leading-relaxed"
    role="alert"
  >
    <h2 class="text-xl font-semibold">Something went wrong</h2>
    <p>Profile failed to load. Check your connection and try again.</p>
    <button
      type="button"
      class="pixel-border pressable mt-4 bg-teal-400 px-4 py-2 font-bold text-black hover:bg-teal-300 focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-hidden active:bg-teal-500 dark:bg-teal-200 dark:hover:bg-teal-100 dark:focus-visible:ring-neutral-300 dark:active:bg-teal-300"
      @click="refresh"
    >
      Retry
    </button>
  </div>
  <section
    data-testid="profile"
    v-else-if="status === 'success' && data"
    class="pixel-border anim-rise dex-panel relative mt-4 mb-8 p-6 leading-relaxed sm:mb-10 sm:p-8"
  >
    <div
      class="flex flex-col items-center gap-6 md:flex-row md:items-end md:gap-10"
    >
      <div class="shrink-0">
        <img
          v-if="data.sprites.front_default"
          :src="data.sprites.front_default"
          :alt="data.name"
          width="160"
          height="160"
          class="image-pixelated dex-sprite h-48 w-48 sm:h-56 sm:w-56"
        />
        <div
          v-else
          aria-hidden="true"
          class="flex h-48 w-48 items-center justify-center bg-neutral-300 text-4xl sm:h-56 sm:w-56 dark:bg-neutral-800"
        >
          ?
        </div>
      </div>
      <div class="w-full space-y-4 text-center md:text-start">
        <div>
          <h2
            class="max-w-[16ch] text-4xl leading-tight font-semibold text-balance break-words text-neutral-950 [text-shadow:4px_4px_0_var(--color-teal-500)] sm:text-5xl dark:text-white"
          >
            {{ data.name }}
          </h2>
        </div>
        <div
          class="flex flex-wrap justify-center gap-2 text-base sm:text-sm md:justify-start"
        >
          <span
            v-for="(type, index) of data.types"
            :key="index"
            class="pixel-border w-full bg-teal-400 px-3 py-2 leading-snug font-bold break-words text-black md:w-[initial] dark:bg-teal-200"
          >
            {{ type }}</span
          >
        </div>
        <dl
          class="grid grid-cols-2 items-center gap-6 sm:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]"
        >
          <div>
            <dt
              class="mb-1 text-xs font-bold tracking-widest text-neutral-500 uppercase dark:text-neutral-400"
            >
              Height
            </dt>
            <dd class="text-base tabular-nums sm:text-sm dark:text-white">
              {{ data.height / 10 }}m
            </dd>
          </div>
          <div>
            <dt
              class="mb-1 text-xs font-bold tracking-widest text-neutral-500 uppercase dark:text-neutral-400"
            >
              Weight
            </dt>
            <dd class="text-base tabular-nums sm:text-sm dark:text-white">
              {{ data.weight / 10 }}kg
            </dd>
          </div>
        </dl>
        <div>
          <p
            class="mb-2 text-xs font-bold tracking-widest text-neutral-500 uppercase dark:text-neutral-400"
          >
            Abilities
          </p>
          <div
            class="flex flex-wrap justify-center gap-2 text-base sm:text-sm md:justify-start"
          >
            <span
              v-for="(ability, index) of data.abilities"
              :key="index"
              class="pixel-border w-full bg-teal-400 px-3 py-2 leading-snug font-bold break-words text-black md:w-[initial] dark:bg-teal-200"
            >
              {{ ability }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
