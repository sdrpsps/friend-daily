<script setup lang="ts">
import Reply from './Reply.vue'
import UserName from '~/components/Post/UserName.vue'
import type { Comment, PostItem } from '~/server/api/post/types'

const { comment } = defineProps<{ comment: Comment }>()
const postItem = inject<PostItem>('postItem')!

// 获取回复用户
const replyName = computed(() => postItem.comments.find(item => item.id === comment.replyToId)?.name)
const replyWebsite = computed(() => postItem.comments.find(item => item.id === comment.replyToId)?.website)

// 显示输入框
const commentRef = ref<HTMLElement | null>(null)
const { isDisplay } = useClickOutside(commentRef)

// 显示回复评论
function onShowInput() {
  isDisplay.value = !isDisplay.value
}
</script>

<template>
  <div ref="commentRef">
    <section class="hover:cursor-alias" @click="onShowInput">
      <!-- 被回复评论 -->
      <template v-if="comment.replyToId">
        <UserName :name="comment.name" :website="comment.website" />
        <span class="px-0.5 text-gray-800">回复</span>
        <UserName :name="replyName" :website="replyWebsite" />
        <span class="pr-1">:</span>
        <span class="comment-content">{{ comment.content }}</span>
      </template>
      <!-- 普通评论 -->
      <template v-else>
        <UserName :name="comment.name" :website="comment.website" />
        <span class="pr-1">:</span>
        <span class="comment-content">{{ comment.content }}</span>
      </template>
    </section>

    <!-- 回复框 -->
    <Reply v-if="isDisplay" :reply-name="comment.name" />
  </div>
</template>

<style scoped>
.comment-content{
  @apply text-gray-800 whitespace-pre-wrap overflow-hidden;
}
</style>
