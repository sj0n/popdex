<script setup lang="ts">
import { Tabs, TabsTrigger, TabsList, TabsContent } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
import type { PokemonMoves } from "~/server/api/pokemon/[name]/moves.get";

const route = useRoute();
const { data, status } = await useLazyFetch<PokemonMoves>(
    `/api/pokemon/${route.params.name}/moves`,
    {
        cache: 'no-cache',
    }
);
const versions = computed(() => Object.keys(data.value?.versions || []));
</script>

<template>
    <template v-if="status === 'pending'">
        <Skeleton class="mb-12 h-32 w-full" />
    </template>
    <template v-else-if="status === 'success' && data">
        <h2 class="mb-4 text-2xl font-semibold">Moves</h2>
        <Tabs :default-value="versions[0]" class="mb-12">
            <div class="relative shadow-md">
                <TabsList class="inline-flex w-full max-w-full overflow-x-auto">
                    <TabsTrigger v-for="version in versions" :value="version">{{
                        version
                        }}</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent v-for="(moves, version) of data?.versions" :value="version" :key="version"
                class="max-h-[30rem] overflow-y-auto">
                <ul class="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <li v-for="move of moves" :key="move.name"
                        class="mt-4 rounded-md bg-teal-400 p-4 shadow-md dark:bg-teal-200 dark:text-neutral-800">
                        <h3 class="font-semibold">{{ move.name }}</h3>
                        <Badge class="mr-2">Level {{ move.level }}</Badge>
                        <Badge>{{ move.learn_method }}</Badge>
                    </li>
                </ul>
            </TabsContent>
        </Tabs>
    </template>
</template>