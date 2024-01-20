<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'

// 获取滚动距离
const { y } = useWindowScroll()

// 顶部透明度和图标颜色
const extraClass = computed(() => {
  return y.value > 300 ? 'bg-opacity-100 text-neutral-400' : 'bg-opacity-0 text-white'
})

// 以下数据未来会通过接口来获取，通过配置页设置
// banner 背景图地址
const bannerImage = computed(() => 'https://static.bytespark.app/file/399c701beb0e6787db70f.jpg')

// 头像地址
const avatar = computed(() => 'https://static.bytespark.app/file/ed02ef201195aef1be23e.png')

const { public: _public } = useRuntimeConfig()
const header = {
  title: _public.TITLE,
  description: _public.DESCRIPTION,
}
</script>

<template>
  <!-- 背景图 -->
  <div
    :style="{ backgroundImage: `url(${bannerImage})` }"
    class="relative h-[300px] w-full bg-neutral-400 bg-cover bg-center bg-no-repeat"
  >
    <!-- 按钮 -->
    <div :class="extraClass" class="fixed top-0 z-10 w-full bg-neutral-100 transition-duration-300 md:w-xl">
      <div class="flex items-center justify-between text-xl">
        <div class="m-2 cursor-pointer rounded-lg p-2 hover:bg-black/5">
          <div class="i-icon-park-solid:user" />
        </div>
        <div class="m-2 cursor-pointer rounded-lg p-2 hover:bg-black/5">
          <div class="i-icon-park-solid:remind" />
        </div>
      </div>
    </div>
    <!-- 头像与 solgan -->
    <div class="absolute right-6 top-64 flex flex-col select-none items-end">
      <div class="flex">
        <span class="mr-4 mt-3 text-white font-medium">{{ header.title }}</span>
        <img class="h-15 w-15 rounded-md bg-white" :src="avatar" alt="avatar">
      </div>
      <span class="mt-2 text-xs text-neutral-300">{{ header.description }}</span>
    </div>
  </div>
</template>
