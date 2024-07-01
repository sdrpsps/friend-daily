<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { useRuntimeConfig } from 'nuxt/app'
import { computed } from 'vue'

const { public: env } = useRuntimeConfig()
const { y } = useWindowScroll() // 获取滚动距离

// 顶部透明度和图标颜色
const navClass = computed(() => {
  return y.value > 250 ? 'bg-opacity-100 text-neutral-400' : 'bg-opacity-0 text-white'
})
</script>

<template>
  <header
    :style="{ backgroundImage: `url(${env.BANNER_IMAGE})` }"
    class="relative h-[300px] w-full bg-neutral-400 bg-cover bg-center bg-no-repeat"
  >
    <!-- 按钮 -->
    <div :class="navClass" class="fixed top-0 z-10 w-full bg-neutral-100 transition-duration-300 md:w-xl">
      <div class="flex items-center justify-between text-xl">
        <div class="m-2 cursor-pointer rounded-lg p-2 hover:bg-black/5">
          <div class="i-icon-park-solid:user" />
        </div>
        <div class="m-2 cursor-pointer rounded-lg p-2 hover:bg-black/5">
          <div class="i-icon-park-solid:remind" />
        </div>
      </div>
    </div>
    <!-- 头像与 slogan -->
    <div class="absolute right-6 top-64 flex flex-col select-none items-end">
      <div class="flex">
        <span class="mr-4 mt-3 text-white font-medium">{{ env.TITLE }}</span>
        <img class="h-15 w-15 rounded-md bg-white object-cover" :src="env.AVATAR" alt="avatar">
      </div>
      <span class="mt-2 text-xs text-neutral-300">{{ env.DESCRIPTION }}</span>
    </div>
  </header>
</template>
