<script setup></script>
<template>
    <header>
        <h1>
            <NuxtLink to="/">PopDex</NuxtLink>
        </h1>
        <InlinePokemonSearch />
    </header>
</template>

<style scoped>
header {
    display: flex;
    align-items: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
    gap: 3rem;
}

h1 {
    font-size: 4rem;
}

h1 a {
    color: hsl(0, 0%, 0%);
    text-decoration-style: dashed;
}

h1 a:visited {
    color: hsl(0, 0%, 0%);
}

@media screen and (max-width: 49rem) {
    header {
        flex-direction: column;
        gap: 0;
    }

    h1 {
        font-size: 2.5rem;
    }
}
</style>