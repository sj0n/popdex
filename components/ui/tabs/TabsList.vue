<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import { TabsList, type TabsListProps } from "radix-vue";
import { cn } from "@/libs/utils";

const props = defineProps<
  TabsListProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <TabsList
    v-bind="delegatedProps"
    :class="
      cn(
        'pixel-border rounded-md bg-neutral-100 p-1 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400',
        props.class,
      )
    "
  >
    <slot />
  </TabsList>
</template>
