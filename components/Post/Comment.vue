<script setup lang="ts">
import HeightTransition from '../Common/HeightTransition.vue'
import UserName from './UserName.vue'

defineProps<{
  comment: { id: number, name: string, content: string, website?: string, parentId?: number }
}>()
// 获取回复用户
// const replyName = computed(() => postItem.comments.find(item => item.id === comment.parentId)?.name)
// const replyWebsite = computed(() => postItem.comments.find(item => item.id === comment.parentId)?.website)
</script>

<template>
  <div class="px-2 hover:cursor-alias">
    <!-- 被回复评论 -->
    <template v-if="comment.parentId">
      <UserName :name="comment.name" :website="comment.website" />
      <span class="px-0.5 text-gray-800">回复</span>
      <!-- <UserName :name="replyName" :website="replyWebsite" /> -->
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
