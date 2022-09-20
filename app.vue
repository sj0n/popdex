<script setup>
useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `PopDex - ${titleChunk}` : 'PopDex - Lite PokeDex';
    }
})
</script>

<template>
    <NuxtLayout>
        <NuxtPage></NuxtPage>
    </NuxtLayout>
</template>
