<script setup lang="ts">
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
import type { PokemonSpawnLocation } from "@@/server/types/pokemon-api";
import type { FetchError } from "ofetch";
import type { AsyncDataRequestStatus } from "#app";

const props = defineProps<{
  data: PokemonSpawnLocation | undefined;
  status: AsyncDataRequestStatus;
  error: FetchError | undefined;
  refresh: () => Promise<unknown>;
}>();

const versions = computed(() => Object.keys(props.data?.versions || {}));
const selected = ref("");
// immediate: so an already-populated `versions` (SSR/hydration) still selects
// the first entry; otherwise the version dropdown shows no checked option and
// `currentLocations` stays empty.
watch(
  versions,
  (v) => {
    if (!selected.value || !v.includes(selected.value)) {
      selected.value = v[0] ?? "";
    }
  },
  { immediate: true },
);
const currentLocations = computed(() =>
  selected.value ? (props.data?.versions[selected.value] ?? []) : [],
);
</script>

<template>
  <template v-if="status === 'pending'">
    <div role="status" aria-label="Loading locations" class="space-y-4">
      <Skeleton class="h-4 w-24" />
      <Skeleton class="h-11 w-full max-w-64" />
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <Skeleton class="h-24 w-full" />
        <Skeleton class="h-24 w-full" />
        <Skeleton class="hidden w-full sm:block" />
      </div>
    </div>
  </template>
  <template v-else-if="status === 'error' && error?.statusCode === 404">
    <p role="status" class="leading-relaxed">
      No location data found for this Pokémon.
    </p>
    <NuxtLink
      to="/"
      class="pixel-border pressable mt-4 inline-block bg-teal-400 px-4 py-2 font-bold text-black hover:bg-teal-300 focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-hidden active:bg-teal-500 dark:bg-teal-200 dark:hover:bg-teal-100 dark:focus-visible:ring-neutral-300 dark:active:bg-teal-300"
    >
      Search a different Pokémon
    </NuxtLink>
  </template>
  <template v-else-if="status === 'error'">
    <p role="alert" class="leading-relaxed">
      Locations failed to load. Check your connection and try again.
    </p>
    <button
      type="button"
      class="pixel-border pressable mt-4 bg-teal-400 px-4 py-2 font-bold text-black hover:bg-teal-300 focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-hidden active:bg-teal-500 dark:bg-teal-200 dark:hover:bg-teal-100 dark:focus-visible:ring-neutral-300 dark:active:bg-teal-300"
      @click="refresh"
    >
      Retry
    </button>
  </template>
  <template v-else-if="status === 'success' && data">
    <div class="mb-4">
      <label
        for="locations-version"
        class="mb-2 block text-xs font-bold tracking-widest text-neutral-500 uppercase dark:text-neutral-400"
        >Game version</label
      >
      <select
        id="locations-version"
        data-testid="locations-version"
        v-model="selected"
        class="pixel-border h-11 max-w-full bg-neutral-100 px-3 text-base font-bold text-neutral-950 tabular-nums focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-hidden sm:text-sm dark:bg-neutral-800 dark:text-neutral-50 dark:focus-visible:ring-neutral-300"
      >
        <option v-for="version in versions" :value="version" :key="version">
          {{ version }}
        </option>
      </select>
    </div>
    <div
      v-if="currentLocations.length === 0"
      class="py-8 text-center leading-relaxed"
      role="status"
    >
      <p class="font-semibold">
        No locations<span v-if="selected"> in {{ selected }}</span>
      </p>
      <p class="mt-2 text-sm text-neutral-400">
        This Pokémon does not appear here. Pick another game version.
      </p>
    </div>
    <div
      v-else
      class="scroll-area max-h-120 overflow-y-auto overscroll-contain"
      tabindex="0"
      role="region"
      aria-label="Locations results"
    >
      <ul
        class="grid grid-cols-1 gap-4 pr-1 sm:grid-cols-2 md:grid-cols-3"
        data-testid="locations"
      >
        <li
          v-for="location of currentLocations"
          :key="location.location_name"
          class="pixel-border bg-white p-4 leading-relaxed shadow-[4px_4px_0_rgb(20_184_166/0.25)] dark:bg-neutral-800"
        >
          <h3
            class="leading-snug font-semibold text-balance break-words text-teal-700 dark:text-teal-200"
          >
            {{ location.location_name }}
          </h3>
          <Badge v-if="location.min_level !== location.max_level" class="mt-4"
            >Level {{ location.min_level }} - {{ location.max_level }}</Badge
          >
          <Badge v-else class="mt-4">Level {{ location.min_level }}</Badge>
        </li>
      </ul>
    </div>
  </template>
</template>
