<script setup></script>
<template>
  <header
    class="flex-column mb-8 flex items-center gap-0 lg:flex-row lg:gap-12"
  >
    <h1 class="text-6xl font-semibold">
      <NuxtLink to="/">PopDex</NuxtLink>
    </h1>
    <SearchPokemon :inline="true" />
  </header>
</template>
