<script setup lang="ts">
import { ref, watch } from "vue";
import { Input } from "@/components/ui/input";

let name = ref("");
let url = ref("");
watch(name, (newName) => {
  url.value = `/pokemon/${newName}`;
});
</script>
<template>
  <form role="form" :action="url" method="get" class="w-full py-4">
    <label for="name" hidden>Pokemon Name</label>
    <Input
      type="text"
      id="name"
      placeholder="Search a pokemon, e.g. pikachu"
      v-model="name"
      class="mx-auto max-w-sm focus:shadow-lg focus:shadow-teal-200"
    />
  </form>
</template>
