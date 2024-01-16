<script setup lang="ts">
import Comment from '~/components/Post/Comment.vue'
import type { PostItem } from '~/server/api/types'

const postItem = inject<PostItem>('postItem')!
</script>

<template>
  <div v-if="postItem.comments.length > 0" class="w-full flex flex-col bg-bg px-3 py-2 text-primary">
    <!-- 评论 -->
    <Comment v-for="comment in postItem.comments" :key="comment.id" :comment="comment" class="py-0.5" />
  </div>
</template>

<style scoped>
.comment-content{
  @apply text-gray-800 whitespace-pre-wrap overflow-hidden;
}
</style>
