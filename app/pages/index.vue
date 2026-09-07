<template>
  <main class="flex min-h-dvh flex-col items-center justify-center px-4 py-12">
    <div class="anim-rise w-full max-w-xl text-center">
      <h1
        data-testid="header"
        class="text-5xl leading-none font-semibold text-neutral-950 [text-shadow:4px_4px_0_var(--color-teal-500)] sm:text-6xl dark:text-white"
      >
        PopDex<span
          aria-hidden="true"
          class="ml-2 inline-block h-6 w-4 translate-y-1 bg-teal-400 motion-safe:animate-pulse sm:h-8 sm:w-5"
        ></span>
      </h1>
      <div class="anim-rise-2 mx-auto mt-6 w-full max-w-md">
        <SearchPokemon />
      </div>
    </div>
  </main>
</template>
