// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: import.meta.env.VITE_APP_TITLE,
      meta: [
        { name: 'description', content: import.meta.env.VITE_APP_DESCRIPTION },
      ],
    },
  },
  modules: [
    '@unocss/nuxt',
  ],
})
