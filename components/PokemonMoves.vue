<script setup lang="ts">
import { Tabs, TabsTrigger, TabsList, TabsContent } from "./ui/tabs";
import { Badge } from "./ui/badge";
import type { PokemonMoves } from '~/server/api/pokemon/[name]/moves.get'

const props = defineProps<{
    pokemonName: string;
}>();

const { data, status } = await useFetch<PokemonMoves>(
    `/api/pokemon/${props.pokemonName}/moves`, {
        cache: 'force-cache'
    }
);
const versions = Object.keys(data.value?.versions || {});
</script>

<template>
  <div>
    <p v-if="status === 'pending'">Loading...</p>
    <template v-else>
      <h2 class="mb-4 text-4xl font-semibold">Moves</h2>
      <Tabs :default-value="versions[0]">
        <div class="relative rounded-md shadow-md">
          <TabsList class="inline-flex w-full max-w-full overflow-x-auto">
            <TabsTrigger v-for="version in versions" :value="version"
              >{{ version }}</TabsTrigger
            >
          </TabsList>
        </div>
        <TabsContent
          v-for="(moves, version) in data?.versions"
          :value="version"
          :key="version"
          class="max-h-[30rem] overflow-y-auto"
        >
          <div class="move-wrapper gap-6 pt-6">
            <div
              v-for="move of moves"
              class="rounded-[10px] bg-teal-700 p-4 text-slate-50 dark:bg-teal-200 dark:text-slate-800"
            >
              <span class="font-semibold">{{ move.name }}</span>
               <div class="mt-2">
                   <Badge class="mr-2">Level {{ move.level }}</Badge>
                   <Badge>{{ move.learn_method }}</Badge>
               </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </template>
  </div>
</template>

<style scoped>
.move-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}
</style>
