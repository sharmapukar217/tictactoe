import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: {
    enabled: true,
  },
  future: {
    compatibilityVersion: 4,
  },
  devServer: {
    host: "0.0.0.0",
  },
  vite: {
    plugins: [tailwindcss() as any],
  },
  modules: ["@nuxt/icon", "@nuxt/fonts", "@nuxtjs/color-mode"],

  icon: {
    mode: "svg",
    customCollections: [{ dir: "app/assets/icons", prefix: "local" }],
  },
  colorMode: {
    classSuffix: "",
  },
});
