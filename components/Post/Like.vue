<script setup lang="ts">
import type { PostItem } from '~/server/api/post/types'

const postItem = inject<PostItem>('postItem')!
const userList = computed(() => postItem.likes.filter(item => item.name !== '访客').map(item => item.name).join('，'))
// 计算点赞列表中 name 为访客的数量
const visitorCount = computed(() => postItem.likes.filter(item => item.name === '访客').length)
const visitorText = computed(() => visitorCount.value > 0 ? `，${visitorCount.value} 个访客` : '')
</script>

<template>
  <div v-if="postItem.likes.length > 0" class="w-full flex bg-bg px-2 py-2 text-primary">
    <div class="i-icon-park-outline:like mt-[1px] flex-none text-lg" />
    <div class="pl-3 text-sm">
      {{ `${userList}${visitorText}` }}
    </div>
  </div>
</template>
