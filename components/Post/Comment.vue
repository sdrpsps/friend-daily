<script setup lang="ts">
import HeightTransition from '../Common/HeightTransition.vue'
import UserName from './UserName.vue'
import type { Comment } from '~/types/post'

defineProps<{ comment: Comment }>()
</script>

<template>
  <div class="px-2 hover:cursor-alias">
    <!-- 被回复评论 -->
    <template v-if="comment.parentName">
      <UserName :name="comment.name" :website="comment.website" />
      <span class="px-0.5 text-gray-800">回复</span>
      <UserName :name="comment.parentName" :website="comment.parentWebsite" />
      <span class="pr-1">:</span>
      <span class="comment-content">{{ comment.content }}</span>
    </template>
    <!-- 普通评论 -->
    <template v-else>
      <UserName :name="comment.name" :website="comment.website" />
      <span class="pr-1">:</span>
      <span class="comment-content">{{ comment.content }}</span>
    </template>
    <!-- 输入框 -->
    <ClientOnly>
      <HeightTransition>
        <slot />
      </HeightTransition>
    </ClientOnly>
  </div>
</template>

<style scoped>
.comment-content{
  --at-apply: text-gray-800 whitespace-pre-wrap overflow-hidden;
}
</style>
