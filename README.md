# PopDex

A simple Pokédex web application.

<br>

## Tools

- [NuxtJS](https://nuxt.com)
- [PokéAPI](https://pokeapi.co/)
- [Vitest](https://vitest.dev)

<br>

## Setup

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist

#bun
bun install
```

<br>

## Component testing

```
bun run test:nuxt
```

<br>

## E2E Testing

```
bun run wrangler:dev && bun run --project e2e
```

<br>

## Util test

```
bun test tests/server/utils
```
