<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
import type { PostItem } from '~/server/api/post/types'

const { post } = defineProps<{ post: PostItem }>()
const createTime = computed(() => useTimeAgo(post.createdAt).value.replace(/^["|'](.*)["|']$/g, '$1'))
</script>

<template>
  <div class="flex justify-between items-center pb-4">
    <!-- 时间 -->
    <div class="text-neutral-300 text-xs select-none">
      {{ createTime }}
    </div>
    <!-- 点赞 -->
    <div class="bg-bg text-primary px-1 rounded cursor-pointer">
      <div class="i-ri:more-fill text-xl" />
    </div>
  </div>
  <!-- 点赞列表 -->
  <div class="bg-bg w-full text-primary flex items-center px-2 py-2 rounded">
    <div class="i-icon-park-outline:like mr-3 text-lg" />
    <div class="text-xs">
      6位访客
    </div>
  </div>
  <div class="border-b border-bg pt-4" />
</template>
