<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'

// 获取滚动距离
const { x: _x, y } = useWindowScroll()

// 顶部透明度
const opacity = computed(() => {
  return y.value > 300 ? 'bg-opacity-100 text-neutral-400' : 'bg-opacity-0 text-white'
})

// 以下数据未来会通过接口来获取，通过配置页设置
// banner 背景图地址
const bannerImage = computed(() => 'https://static.bytespark.app/file/399c701beb0e6787db70f.jpg')

// 头像地址
const avatar = computed(() => 'https://static.bytespark.app/file/ed02ef201195aef1be23e.png')

// 标题
const title = computed(() => 'Sunny的朋友圈')

// solgan
const solgan = computed(() => '你有打火机吗？没有啊，那你是怎么点燃我的心的？')
</script>

<template>
  <!-- 背景图 -->
  <div
    :style="{ backgroundImage: `url(${bannerImage})` }"
    class="h-[300px] w-full bg-neutral-400 bg-no-repeat bg-center bg-cover relative"
  >
    <!-- 按钮 -->
    <div :class="opacity" class="fixed top-0 w-full md:w-xl bg-neutral-100 transition-duration-300 z-10">
      <div class="flex items-center justify-between text-xl">
        <div class="p-2 m-2 rounded-lg cursor-pointer hover:bg-black/5">
          <div class="i-icon-park-solid:user" />
        </div>
        <div class="p-2 m-2 rounded-lg cursor-pointer hover:bg-black/5">
          <div class="i-icon-park-solid:remind" />
        </div>
      </div>
    </div>
    <!-- 头像与 solgan -->
    <div class="absolute top-64 right-6 flex flex-col items-end select-none">
      <div class="flex">
        <span class="mt-3 mr-4 text-white font-medium">{{ title }}</span>
        <img class="w-15 h-15 rounded-md bg-white" :src="avatar" alt="">
      </div>
      <span class="mt-2 text-xs text-neutral-300">{{ solgan }}</span>
    </div>
  </div>
</template>
