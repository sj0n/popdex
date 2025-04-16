<script setup>
const config = useRuntimeConfig();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `PopDex - ${titleChunk}` : "PopDex - Lite PokeDex";
  },
});
useScriptUmamiAnalytics({
  websiteId: config.public.umamiWebsiteId,
});
</script>

<template>
  <NuxtLoadingIndicator color="#14b8a6" />
  <NuxtLayout>
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>
