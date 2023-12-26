<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
import Like from '~/components/Post/Like.vue'
import Comment from '~/components/Post/Comment.vue'
import type { PostItem } from '~/server/api/post/types'

const postItem = inject<PostItem>('postItem')!
const createTime = computed(() => useTimeAgo(postItem.createdAt).value.replace(/^["|'](.*)["|']$/g, '$1'))

// 通过是否有评论和点赞来显示下边距
const hasPaddingBottom = computed(() =>
  (postItem.comments.length > 0 || postItem.likes.length > 0) ? 'pb-4' : '',
)
</script>

<template>
  <div>
    <div class="flex items-center justify-between pb-4">
      <!-- 时间 -->
      <div class="select-none text-xs text-neutral-300">
        {{ createTime }}
      </div>
      <!-- 点赞 -->
      <div class="cursor-pointer rounded bg-bg px-1 text-primary">
        <div class="i-ri:more-fill text-xl" />
      </div>
    </div>
    <!-- 点赞和评论 -->
    <div :class="hasPaddingBottom" class="rounded">
      <!-- 点赞列表 -->
      <Like />
      <!-- 评论区 -->
      <Comment />
    </div>
    <!-- 分割线 -->
    <div class="border-b border-divider" />
  </div>
</template>
