<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
import Like from '~/components/Post/Like.vue'
import type { PostItem } from '~/server/api/post/types'

const postItem = inject<PostItem>('postItem')!
const createTime = computed(() => useTimeAgo(postItem.createdAt).value.replace(/^["|'](.*)["|']$/g, '$1'))
</script>

<template>
  <div>
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
    <Like />
    <!-- 评论区 -->
    <!-- 分割线 -->
    <div class="border-b border-bg pt-4" />
  </div>
</template>
