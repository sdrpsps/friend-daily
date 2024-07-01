// https://nuxt.com/docs/api/configuration/nuxt-config
import process from 'node:process'

export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover, user-scalable=no',
      title: process.env.TITLE,
      meta: [
        { name: 'description', content: process.env.DESCRIPTION },
      ],
    },
  },
  modules: ['@unocss/nuxt', '@vueuse/nuxt'],
  runtimeConfig: {
    public: {
      TITLE: process.env.TITLE,
      DESCRIPTION: process.env.DESCRIPTION,
      USERNAME: process.env.USERNAME,
      EMAIL: process.env.EMAIL,
      BANNER_IMAGE: process.env.BANNER_IMAGE,
      AVATAR: process.env.AVATAR,
    },
  },
})
