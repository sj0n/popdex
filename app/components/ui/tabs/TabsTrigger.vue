<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import { TabsTrigger, type TabsTriggerProps, useForwardProps } from "radix-vue";
import { cn } from "@@/libs/utils";

const props = defineProps<
  TabsTriggerProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <TabsTrigger
    v-bind="forwardedProps"
    :class="
      cn(
        'pressable min-h-11 cursor-pointer rounded-none px-4 py-1.5 text-base font-normal tracking-wide whitespace-nowrap ring-offset-white hover:bg-neutral-950/5 hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-neutral-950 data-[state=active]:font-bold data-[state=active]:text-white sm:text-sm dark:ring-offset-neutral-950 dark:hover:bg-neutral-50/10 dark:hover:text-neutral-50 dark:focus-visible:ring-neutral-300 dark:data-[state=active]:bg-neutral-50 dark:data-[state=active]:text-neutral-950',
        props.class,
      )
    "
  >
    <span class="block max-w-[24ch] truncate">
      <slot />
    </span>
  </TabsTrigger>
</template>
