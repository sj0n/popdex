import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
        head: {
            "meta": [
                {
                    name: 'description',
                    content: 'A quick & simple website to read information about pokemons.'
                }
            ],
            link: [
                {
                    rel: 'stylesheet',
                    href: '/assets/css/main.css'
                }
            ],
            "charset": 'utf-8',
            "viewport": "width=device-width, initial-scale=1"
        },
    }
})
