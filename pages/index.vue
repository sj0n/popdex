<script setup>
</script>
<template>
    <main>
        <header class="header-wrapper">
            <h1>PopDex</h1>
        </header>
        <PokemonSearch />
    </main>
</template>
<style scoped>
main {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.header-wrapper {
    font-size: 2rem;
}
</style>