import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from "@tailwindcss/vite";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    typescript: {
        shim: false,
        strict: true
    },

    app: {
        head: {
            "meta": [
                {
                    name: 'description',
                    content: 'A quick & simple website to read information about pokemons.'
                }
            ],
            "charset": 'utf-8',
            "viewport": "width=device-width, initial-scale=1",
            "link": [
                {
                    rel: 'shortcut icon',
                    href: '/favicon.ico'
                },
                {
                    rel: 'icon',
                    sizes: '16x16',
                    type: 'image/png',
                    href: '/favicon-16x16.png'
                },
                {
                    rel: 'icon',
                    sizes: '32x32',
                    type: 'image/png',
                    href: '/favicon-32x32.png'
                },
                {
                    rel: 'apple-touch-icon',
                    href: '/apple-touch-icon.png'
                },
                {
                    rel: 'manifest',
                    href: '/site.webmanifest'
                },
            ]
        },
    },

    css: ['@/assets/css/main.css'],
    compatibilityDate: '2025-02-10',
    runtimeConfig: {
        originAPI: process.env.NUXT_ORIGIN_API,
    },
    vite: {
        plugins: [tailwindcss()]
    },
    nitro: {
        preset: 'cloudflare_pages'
    }
})