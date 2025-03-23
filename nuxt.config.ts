// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  app: {
    head: {
      title: "Nutriolic",
      meta: [{
        name: "Nutriolic",
        content: "Aplikasi edukasi nutrisi interaktif"
      }],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Hind:wght@300;400;500;600;700&family=Lilita+One&family=Nunito+Sans:opsz,wght@6..12,500;6..12,600&family=Poppins:wght@400;500;600;700&display=swap" },
      ],
    }
  }
})
