<script setup lang="ts">
import { Input } from "@/components/ui/input";

defineProps<{
  inline?: boolean;
}>();

const name = ref("");
const { load } = useScriptUmamiAnalytics();
const handleSubmit = async () => {
  const trimmed = name.value.trim();
  if (!trimmed) return;
  const umami = await load();
  umami.track("search-pokemon", { name: trimmed });
  await navigateTo(`/pokemon/${trimmed.toLowerCase()}`);
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
      data-testid="search-input"
      placeholder="Search a pokemon, e.g. pikachu"
      v-model="name"
      class="max-w-sm focus:shadow-lg focus:shadow-teal-200"
      :class="inline ? 'ml-auto' : 'mx-auto'"
    />
  </form>
</template>
