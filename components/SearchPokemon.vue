<script setup lang="ts">
import { Input } from "@/components/ui/input";

defineProps<{
  inline?: boolean;
}>();

let name = ref("");
const { onLoaded } = useScriptUmamiAnalytics();
const handleSubmit = async () => {
  onLoaded((umami) => {
    umami.track("search-pokemon", { name: name.value });
  });
  await navigateTo(`/pokemon/${name.value.toLowerCase()}`);
};
</script>
<template>
  <form
    @submit.prevent="handleSubmit"
    class="w-full"
    :class="inline ? 'p-4' : 'py-4'"
  >
    <label for="name" hidden>Pokemon Name</label>
    <Input
      type="text"
      id="name"
      placeholder="Search a pokemon, e.g. pikachu"
      v-model="name"
      class="max-w-sm focus:shadow-lg focus:shadow-teal-200"
      :class="inline ? 'ml-auto' : 'mx-auto'"
    />
  </form>
</template>
