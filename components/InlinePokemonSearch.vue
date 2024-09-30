<script setup lang="ts">
import { Input } from "@/components/ui/input";

let name = ref("");
let url = ref("");
watch(name, (newName) => {
  url.value = `/pokemon/${newName}`;
});
</script>
<template>
  <form :action="url" method="get" class="w-full p-4" :name="name">
    <Input
      type="text"
      id="name"
      placeholder="Search a pokemon, e.g. pikachu"
      class="ml-auto max-w-sm focus:shadow-lg focus:shadow-teal-200"
      v-model="name"
    />
  </form>
</template>
