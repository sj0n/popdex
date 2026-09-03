<script setup lang="ts">
import { Tabs, TabsTrigger, TabsList, TabsContent } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
import type { PokemonSpawnLocation } from "@@/server/types/pokemon-api";
import type { FetchError } from "ofetch";
import type { AsyncDataRequestStatus } from "#app";

const props = defineProps<{
  data: PokemonSpawnLocation | undefined;
  status: AsyncDataRequestStatus;
  error: FetchError | undefined;
}>();

const versions = computed(() => Object.keys(props.data?.versions || {}));
</script>

<template>
  <template v-if="status === 'pending'">
    <Skeleton class="mb-12 h-32 w-full" />
  </template>
  <template v-else-if="status === 'error' && error?.statusCode === 404">
    <h2 class="mb-4 text-2xl font-semibold">Locations</h2>
    <p>No location data found for this Pokémon.</p>
  </template>
  <template v-else-if="status === 'error'">
    <h2 class="mb-4 text-2xl font-semibold">Locations</h2>
    <p>Couldn't load locations. Try again later.</p>
  </template>
  <template v-else-if="status === 'success' && data">
    <h2 class="mb-4 text-2xl font-semibold">Locations</h2>
    <Tabs :default-value="versions[0]" class="mb-12">
      <div class="relative rounded-md shadow-md">
        <TabsList class="inline-flex w-full max-w-full overflow-x-auto">
          <TabsTrigger
            v-for="version in versions"
            :value="version"
            :key="version"
            >{{ version }}</TabsTrigger
          >
        </TabsList>
      </div>
      <TabsContent
        v-for="(locations, version) in data?.versions"
        :value="version"
        :key="version"
        class="max-h-120 overflow-y-auto"
      >
        <ul
          class="grid grid-cols-1 gap-4 md:grid-cols-3"
          data-testid="locations"
        >
          <li
            v-for="location of locations"
            :key="location.location_name"
            class="pixel-border mt-4 rounded-md bg-teal-400 p-4 shadow-md dark:bg-teal-200 dark:text-neutral-800"
          >
            <h3 class="font-semibold">{{ location.location_name }}</h3>
            <Badge v-if="location.min_level !== location.max_level" class="mt-4"
              >Level {{ location.min_level }} - {{ location.max_level }}</Badge
            >
            <Badge v-else class="mt-4">Level {{ location.min_level }}</Badge>
          </li>
        </ul>
      </TabsContent>
    </Tabs>
  </template>
</template>
