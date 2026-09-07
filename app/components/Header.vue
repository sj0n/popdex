<template>
  <header class="mb-8 flex flex-col items-center gap-0 lg:flex-row lg:gap-12">
    <h1
      class="text-5xl leading-none font-semibold text-neutral-950 sm:text-6xl [text-shadow:4px_4px_0_var(--color-teal-500)] dark:text-white"
    >
      <NuxtLink to="/">PopDex</NuxtLink>
    </h1>
    <SearchPokemon :inline="true" />
  </header>
</template>
