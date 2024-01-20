// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: import.meta.env.TITLE,
      meta: [
        { name: 'description', content: import.meta.env.DESCRIPTION },
      ],
    },
  },
  modules: [
    '@unocss/nuxt',
  ],
  runtimeConfig: {
    public: {
      TITLE: import.meta.env.TITLE,
      DESCRIPTION: import.meta.env.DESCRIPTION,
      USERNAME: import.meta.env.USERNAME,
      EMAIL: import.meta.env.EMAIL,
    },
  },
})
