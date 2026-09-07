<script setup lang="ts">
import { Skeleton } from "./ui/skeleton";
import type { PokemonMoves } from "@@/server/types/pokemon-api";
import type { FetchError } from "ofetch";
import type { AsyncDataRequestStatus } from "#app";

const props = defineProps<{
  data: PokemonMoves | undefined;
  status: AsyncDataRequestStatus;
  error: FetchError | undefined;
  refresh: () => Promise<unknown>;
}>();

const versions = computed(() => Object.keys(props.data?.versions || {}));
const selected = ref("");
// immediate: so an already-populated `versions` (SSR/hydration) still selects
// the first entry; otherwise the version dropdown shows no checked option and
// `currentMoves` stays empty.
watch(
  versions,
  (v) => {
    if (!selected.value || !v.includes(selected.value)) {
      selected.value = v[0] ?? "";
    }
  },
  { immediate: true },
);
const currentMoves = computed(() =>
  selected.value ? (props.data?.versions[selected.value] ?? []) : [],
);
const groupedMoves = computed(() => {
  const groups = new Map<string, { name: string; details: string[] }>();
  for (const move of currentMoves.value) {
    const detail =
      move.learn_method === "Level Up" ? `Lv ${move.level}` : move.learn_method;
    const existing = groups.get(move.name);
    if (existing) {
      if (!existing.details.includes(detail)) existing.details.push(detail);
    } else {
      groups.set(move.name, { name: move.name, details: [detail] });
    }
  }
  return [...groups.values()];
});
</script>

<template>
  <template v-if="status === 'pending'">
    <div role="status" aria-label="Loading moves" class="space-y-3">
      <Skeleton class="h-4 w-24" />
      <Skeleton class="h-11 w-full max-w-64" />
      <Skeleton class="h-12 w-full" />
      <Skeleton class="h-12 w-full" />
      <Skeleton class="h-12 w-full" />
    </div>
  </template>
  <template v-else-if="status === 'error' && error?.statusCode === 404">
    <p role="status" class="leading-relaxed">
      No moves data found for this Pokémon.
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
      Moves failed to load. Check your connection and try again.
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
        for="moves-version"
        class="mb-2 block text-xs font-bold tracking-widest text-neutral-500 uppercase dark:text-neutral-400"
        >Game version</label
      >
      <select
        id="moves-version"
        data-testid="moves-version"
        v-model="selected"
        class="pixel-border h-11 max-w-full bg-neutral-100 px-3 text-base font-bold text-neutral-950 tabular-nums focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-hidden sm:text-sm dark:bg-neutral-800 dark:text-neutral-50 dark:focus-visible:ring-neutral-300"
      >
        <option v-for="version in versions" :value="version" :key="version">
          {{ version }}
        </option>
      </select>
    </div>
    <div
      v-if="currentMoves.length === 0"
      class="py-8 text-center leading-relaxed"
      role="status"
    >
      <p class="font-semibold">
        No moves<span v-if="selected"> in {{ selected }}</span>
      </p>
      <p class="mt-2 text-sm text-neutral-400">
        Nothing is listed for this version. Pick another game version.
      </p>
    </div>
    <div
      v-else
      class="scroll-area max-h-120 overflow-y-auto overscroll-contain"
      tabindex="0"
      role="region"
      aria-label="Moves results"
    >
      <ul class="pr-1" data-testid="moves">
        <li
          v-for="(move, index) of groupedMoves"
          :key="move.name"
          class="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-neutral-300 px-2 py-3 leading-relaxed last:border-b-0 dark:border-neutral-800"
          :class="
            index % 2 === 1 ? 'bg-neutral-200/60 dark:bg-neutral-900/60' : ''
          "
        >
          <h3
            class="min-w-28 flex-1 leading-snug font-semibold text-balance break-words text-teal-700 dark:text-teal-200"
          >
            {{ move.name }}
          </h3>
          <span
            class="text-sm text-neutral-500 tabular-nums dark:text-neutral-400"
            >{{ move.details.join(" / ") }}</span
          >
        </li>
      </ul>
    </div>
  </template>
</template>
