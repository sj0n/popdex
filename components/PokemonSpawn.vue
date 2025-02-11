<script setup lang="ts">
import { Tabs, TabsTrigger, TabsList, TabsContent } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
import type { PokemonSpawnLocation } from "~/server/api/pokemon/[name]/locations.get";

const route = useRoute();
const { data, status } = await useLazyFetch<PokemonSpawnLocation>(
  `/api/pokemon/${route.params.name}/locations`,
  {
    cache: "no-cache",
  },
);

const versions = computed(() => Object.keys(data.value?.versions || []));
</script>

<template>
  <template v-if="status === 'pending'">
    <Skeleton class="mb-12 h-32 w-full" />
  </template>
  <template v-else-if="status === 'success' && data">
    <h2 class="mb-4 text-2xl font-semibold">Locations</h2>
    <Tabs :default-value="versions[0]" class="mb-12">
      <div class="relative rounded-md shadow-md">
        <TabsList class="inline-flex w-full max-w-full overflow-x-auto">
          <TabsTrigger v-for="version in versions" :value="version">{{
            version
          }}</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent
        v-for="(locations, version) in data?.versions"
        :value="version"
        :key="version"
        class="max-h-[30rem] overflow-y-auto"
      >
        <ul class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <li
            v-for="location of locations"
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
