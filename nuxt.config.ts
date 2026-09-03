import { defineNuxtConfig } from "nuxt/config";
import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    shim: false,
    strict: true,
  },
  app: {
    head: {
      meta: [
        {
          name: "description",
          content:
            "A simple PokéDex where you can find information about Pokémon such as spawn locations.",
        },
      ],
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [
        {
          rel: "shortcut icon",
          href: "/favicon.ico",
        },
        {
          rel: "icon",
          sizes: "16x16",
          type: "image/png",
          href: "/favicon-16x16.png",
        },
        {
          rel: "icon",
          sizes: "32x32",
          type: "image/png",
          href: "/favicon-32x32.png",
        },
        {
          rel: "apple-touch-icon",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "manifest",
          href: "/site.webmanifest",
        },
      ],
    },
  },
  css: ["@/assets/css/main.css"],
  compatibilityDate: "2025-09-15",
  runtimeConfig: {
    public: {
      umamiWebsiteId: "",
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  nitro: {
    preset: "cloudflare_module",
    cloudflare: {
      deployConfig: false,
    },
  },
  modules: ["@nuxt/scripts", "shadcn-nuxt", "@nuxt/test-utils/module"],
  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: "@/components/ui",
  },
});
