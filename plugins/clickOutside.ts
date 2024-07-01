import { defineNuxtPlugin } from 'nuxt/app'
import type { DirectiveBinding } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('clickOutside', {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
      const clickHandler = (event: Event) => {
        if (!el.contains(event.target as Node) && binding.value) {
          binding.value(event)
        }
      }

      el.__vueClickOutside__ = clickHandler
      document.addEventListener('click', clickHandler)
    },
    unmounted(el: HTMLElement) {
      if (el.__vueClickOutside__) {
        document.removeEventListener('click', el.__vueClickOutside__)
        delete el.__vueClickOutside__
      }
    },
  })
})
