<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import PokemonSpawn from "./PokemonSpawn.vue";
import PokemonMoves from "./PokemonMoves.vue";
import type { PokemonSpawnLocation } from "@@/server/types/pokemon-api";
import type { PokemonMoves as PokemonMovesData } from "@@/server/types/pokemon-api";
import type { FetchError } from "ofetch";
import type { AsyncDataRequestStatus } from "#app";

const props = defineProps<{
  locations: PokemonSpawnLocation | undefined;
  locationsStatus: AsyncDataRequestStatus;
  locationsError: FetchError | undefined;
  refreshLocations: () => Promise<unknown>;
  moves: PokemonMovesData | undefined;
  movesStatus: AsyncDataRequestStatus;
  movesError: FetchError | undefined;
  refreshMoves: () => Promise<unknown>;
}>();

const activeTab = ref("locations");
</script>

<template>
  <section
    data-testid="data-panel"
    class="pixel-border anim-rise dex-panel p-2 sm:p-3"
  >
    <Tabs v-model="activeTab" class="w-full">
      <TabsList class="mb-4" aria-label="Pokémon data">
        <TabsTrigger value="locations">Locations</TabsTrigger>
        <TabsTrigger value="moves">Moves</TabsTrigger>
      </TabsList>
      <TabsContent
        value="locations"
        :force-mount="true"
        class="mt-0 hidden data-[state=active]:block"
      >
        <div class="pixel-border dex-screen p-4 sm:p-6">
          <PokemonSpawn
            :data="props.locations"
            :status="props.locationsStatus"
            :error="props.locationsError"
            :refresh="props.refreshLocations"
          />
        </div>
      </TabsContent>
      <TabsContent
        value="moves"
        :force-mount="true"
        class="mt-0 hidden data-[state=active]:block"
      >
        <div class="pixel-border dex-screen p-4 sm:p-6">
          <PokemonMoves
            :data="props.moves"
            :status="props.movesStatus"
            :error="props.movesError"
            :refresh="props.refreshMoves"
          />
        </div>
      </TabsContent>
    </Tabs>
  </section>
</template>
