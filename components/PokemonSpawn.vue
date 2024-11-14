<script setup lang="ts">
import { Tabs, TabsTrigger, TabsList, TabsContent } from "./ui/tabs";
import { Badge } from "./ui/badge";
import type { PokemonSpawnLocation } from "~/server/api/pokemon/[name]/locations.get";

const route = useRoute();
const props = defineProps<{
  pokemonName: string;
}>();
const { data, status } = await useFetch<PokemonSpawnLocation>(
  `/api/pokemon/${route.params.name}/locations`,
  {
    cache: 'no-cache',
  }
);

const versions = Object.keys(data.value?.versions || {});
</script>

<template>
  <p v-if="status === 'pending'">Loading!</p>
  <template v-else>
    <h2 class="mb-4 text-4xl font-semibold">Locations</h2>
    <Tabs :default-value="versions[0]" class="mb-8">
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
        <div class="location-wrapper gap-6 pt-6">
          <div
            v-for="location of locations"
            class="rounded-[10px] bg-teal-700 p-4 text-slate-50 dark:bg-teal-200 dark:text-slate-800"
          >
            <span class="font-semibold">{{ location.location_name }}</span>
            <div class="mt-2">
              <template v-if="location.min_level === location.max_level">
                <Badge class="my-2 mr-2">Level {{ location.min_level }}</Badge>
              </template>
              <template v-else>
                <Badge class="my-2 mr-2"
                  >Level {{ location.min_level }} - {{ location.max_level }}
                </Badge>
              </template>
              <Badge>{{ location.method }}</Badge>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  </template>
</template>

<style scoped>
.location-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}
</style>
