import { defineNuxtPlugin } from 'nuxt/app'
import { createI18n } from 'vue-i18n'

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'zh-CN',
    messages: {
      'zh-CN': {
        common: {
          timeAgo: {
            'just-now': '刚刚',
            'ago': '{0}前',
            'in': '{0}后',
            'last-month': '上个月',
            'next-month': '下个月',
            'month': '月',
            'last-year': '去年',
            'next-year': '明年',
            'year': '年',
            'yesterday': '昨天',
            'tomorrow': '明天',
            'day': '天',
            'last-week': '上星期',
            'next-week': '下星期',
            'week': '星期',
            'hour': '小时',
            'minute': '分钟',
            'second': '秒',
          },
        },
      },
    },
  })

  vueApp.use(i18n)
})
