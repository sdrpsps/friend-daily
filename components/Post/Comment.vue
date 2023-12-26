<script setup lang="ts">
import type { PostItem } from '~/server/api/post/types'
import UserName from '~/components/Post/UserName.vue'

const postItem = inject<PostItem>('postItem')!

// 获取回复用户
function getReplyUser(id: string) {
  return postItem.comments.find(item => item.id === id)
}
</script>

<template>
  <div v-if="postItem.comments.length > 0" class="w-full flex flex-col border-t border-divider bg-bg px-3 py-2 text-primary">
    <div v-for="comment in postItem.comments" :key="comment.id" class="py-0.5">
      <!-- 被回复评论 -->
      <template v-if="comment.replyToId">
        <UserName :name="comment.name" :website="comment.website" />
        <span class="px-0.5 text-gray-800">回复</span>
        <UserName :name="getReplyUser(comment.replyToId!).name" :website="getReplyUser(comment.replyToId!).website" />
        <span class="pr-1">:</span>
        <span class="comment-content hover:cursor-alias">{{ comment.content }}</span>
      </template>
      <!-- 普通评论 -->
      <template v-else>
        <UserName :name="comment.name" :website="comment.website" />
        <span class="pr-1">:</span>
        <span class="comment-content hover:cursor-alias">{{ comment.content }}</span>
      </template>
    </div>
  </div>
</template>

<style scoped>
.comment-content{
  @apply text-gray-800 whitespace-pre-wrap overflow-hidden;
}
</style>
