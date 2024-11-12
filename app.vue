<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `PopDex - ${titleChunk}` : "PopDex - Lite PokeDex";
  },
});
</script>

<template>
    <NuxtLoadingIndicator color="#14b8a6" />
  <NuxtLayout>
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>
