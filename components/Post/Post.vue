<script setup lang="ts">
import Divider from '../Common/Divider.vue'
import HeightTransition from '../Common/HeightTransition.vue'
import ToolBar from './ToolBar.vue'
import Reply from './Reply.vue'
import Like from './Like.vue'
import Comment from './Comment.vue'

const props = defineProps<{
  currentPost: number | null
  currentReply: number | null
  data: {
    id: number
    name: string
    content: string
    date: string
    address: string
    likes?: { id: number, name: string }[]
    comments?: { id: number, name: string, content: string, website?: string, parentId?: number }[]
  }
}>()

const emit = defineEmits(['update:currentPost', 'update:currentReply'])

const { public: env } = useRuntimeConfig()
const createTime = useLocaleTimeAgo(props.data.date)

const isDisplayToolbar = computed(() => props.data.id === props.currentPost)
function onToggleToolbar() {
  emit('update:currentPost', props.data.id)
}
function onHideToolbar() {
  emit('update:currentPost', null)
}

const isDisplayReply = computed(() => props.data.id === props.currentReply)
function onToggleReply() {
  emit('update:currentReply', props.data.id)
}
function onHideReply() {
  emit('update:currentReply', null)
}

const hasLike = computed(() => props.data.likes && props.data.likes.length > 0)
const hasComment = computed(() => props.data.comments && props.data.comments.length > 0)
const isDisplayFooter = computed(() => hasLike.value || hasComment.value)

const currentCommentReply = ref<number | null>(null)
function onToggleCommentReply(id: number | null) {
  currentCommentReply.value = id
}
</script>

<template>
  <article class="flex gap-3 pt-3">
    <img class="h-9 w-9 flex-shrink-0 rounded-md bg-white object-cover" :src="env.AVATAR" alt="avatar">
    <main class="cursor-default overflow-hidden text-sm">
      <span class="block pb-2 text-primary">{{ data.name }}</span>
      <p class="pb-3 text-gray-800">
        {{ data.content }}
      </p>
      <div class="flex flex-col gap-1">
        <!-- 地址 -->
        <address v-if="data.address" class="text-xs text-primary not-italic">
          {{ data.address }}
        </address>
        <!-- 时间和工具栏 -->
        <div class="relative flex items-center justify-between">
          <time class="text-xs text-gray-400">{{ createTime }}</time>
          <button class="rounded bg-bgc px-1 text-primary" @click.stop="onToggleToolbar">
            <div class="i-ri:more-fill text-xl" />
          </button>
          <ToolBar :visible="isDisplayToolbar" :data="data" @hide="onHideToolbar" @reply="onToggleReply" />
        </div>
        <!-- 回复表单 -->
        <HeightTransition>
          <Reply v-if="isDisplayReply" :post-id="data.id" @hide="onHideReply" />
        </HeightTransition>
        <!-- 评论区 -->
        <div v-if="isDisplayFooter" class="overflow-hidden rounded bg-bgc">
          <Like v-if="hasLike" :reply="data.likes" />
          <div v-if="hasComment" class="flex flex-col gap-1 pb-2 text-primary">
            <Divider />
            <Comment v-for="item in data.comments" :key="item.id" :comment="item" @click.stop="onToggleCommentReply(item.id)">
              <Reply
                v-if="currentCommentReply === item.id"
                :post-id="data.id"
                :comment-id="item.id"
                :reply-name="item.name"
                @hide="onToggleCommentReply(null)"
              />
            </Comment>
          </div>
        </div>
      </div>
      <!-- 上下分割线 -->
      <Divider class="pt-3" />
    </main>
  </article>
</template>
