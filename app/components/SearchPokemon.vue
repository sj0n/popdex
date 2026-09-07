<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { LoaderCircle, Search } from "lucide-vue-next";

defineProps<{
  inline?: boolean;
}>();

const name = ref("");
const showHint = ref(false);
const isSearching = ref(false);
const { load } = useScriptUmamiAnalytics();
const handleSubmit = async () => {
  if (isSearching.value) return;
  const trimmed = name.value.trim();
  if (!trimmed) {
    showHint.value = true;
    return;
  }
  showHint.value = false;
  isSearching.value = true;
  try {
    const umami = await load();
    umami.track("search-pokemon", { name: trimmed });
    await navigateTo(`/pokemon/${trimmed.toLowerCase()}`);
  } finally {
    isSearching.value = false;
  }
};
</script>
<template>
  <form
    @submit.prevent="handleSubmit"
    role="search"
    class="w-full"
    :class="inline ? 'p-4' : 'py-4'"
  >
    <label for="name" class="sr-only">Pokemon Name</label>
    <div
      class="flex flex-col gap-2 sm:flex-row"
      :class="inline ? 'sm:justify-end' : 'sm:justify-center'"
    >
      <Input
        type="text"
        id="name"
        name="pokemon-name"
        data-testid="search-input"
        placeholder="Search a pokemon, e.g. pikachu"
        autocomplete="off"
        autocapitalize="off"
        spellcheck="false"
        v-model="name"
        class="h-11 w-full touch-manipulation sm:max-w-sm"
        :aria-invalid="showHint"
        aria-describedby="search-hint"
      />
      <button
        type="submit"
        data-testid="search-submit"
        :disabled="isSearching"
        aria-label="Search Pokémon"
        class="pixel-border pressable flex h-11 w-full shrink-0 cursor-pointer items-center justify-center bg-teal-400 px-4 font-bold text-black hover:bg-teal-300 focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-hidden active:bg-teal-500 disabled:cursor-wait disabled:opacity-70 sm:w-11 sm:px-0 dark:bg-teal-200 dark:hover:bg-teal-100 dark:focus-visible:ring-neutral-300 dark:active:bg-teal-300"
      >
        <LoaderCircle
          v-if="isSearching"
          aria-hidden="true"
          class="size-5 animate-spin"
        />
        <Search v-else aria-hidden="true" class="size-5" />
      </button>
    </div>
    <p
      id="search-hint"
      role="status"
      class="mt-2 min-h-5 text-center text-sm leading-relaxed"
    >
      <span v-if="showHint">Type a Pokémon name first, e.g. pikachu.</span>
    </p>
  </form>
</template>
