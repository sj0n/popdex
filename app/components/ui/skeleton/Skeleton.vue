<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@@/libs/utils";

interface SkeletonProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<SkeletonProps>();
</script>

<template>
  <div
    :class="
      cn(
        'rounded-none bg-neutral-100 motion-safe:animate-pulse dark:bg-neutral-800',
        props.class,
      )
    "
  />
</template>
