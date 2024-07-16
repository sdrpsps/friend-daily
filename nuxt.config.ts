import process from 'node:process'

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['@unocss/reset/tailwind-compat.css'],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover, user-scalable=no',
    },
  },
  modules: ['@unocss/nuxt', '@vueuse/nuxt', '@pinia/nuxt'],
  runtimeConfig: {
    public: {
      TITLE: process.env.NUXT_PUBLIC_TITLE || '默认标题',
      USERNAME: process.env.NUXT_PUBLIC_USERNAME || '默认用户名',
      DESCRIPTION: process.env.NUXT_PUBLIC_DESCRIPTION || '默认描述',
      EMAIL: process.env.NUXT_PUBLIC_EMAIL || 'xx@xx.com',
      BANNER_IMAGE: process.env.NUXT_PUBLIC_BANNER_IMAGE || 'https://imgapi.cn/bing.php',
      AVATAR: process.env.NUXT_PUBLIC_AVATAR || './avatar.webp',
    },
  },
  compatibilityDate: '2024-04-03',
})
