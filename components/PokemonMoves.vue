<script setup lang="ts">
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";

const props = defineProps<{
  pokemonName: string;
}>();
const { data, status } = await useLazyFetch(
  `/api/pokemon/${props.pokemonName}/moves`,
);
const pokemonMoves = data.value as {
  ok: boolean;
  response: { [key: string]: { name: string; learn_by: string }[] };
};
const levels = Object.keys(pokemonMoves.response);
</script>

<template>
  <div>
    <p v-if="status === 'pending'">Loading...</p>
    <template v-else>
      <h2 class="mb-4 text-4xl font-semibold">Moves</h2>
      <Tabs :default-value="levels[0]">
        <div class="relative rounded-md shadow-md">
          <TabsList class="inline-flex w-full max-w-full overflow-x-auto">
            <TabsTrigger v-for="level in levels" :value="level"
              >Level {{ level }}</TabsTrigger
            >
          </TabsList>
        </div>
        <TabsContent
          v-for="(moves, level) in pokemonMoves.response"
          :value="level"
          :key="level"
          class="max-h-[30rem] overflow-y-auto"
        >
          <div class="move-wrapper gap-6 pt-6">
            <div
              v-for="move of moves"
              class="rounded-[10px] bg-teal-700 p-4 text-slate-50 dark:bg-teal-200 dark:text-slate-800"
            >
              <span class="font-semibold">{{ move.name }}</span>
              <p>Learn by: {{ move.learn_by }}</p>
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
