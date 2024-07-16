<script setup lang="ts">
import Divider from '../Common/Divider.vue'
import HeightTransition from '../Common/HeightTransition.vue'
import ImageGrid from '../Common/ImageGrid.vue'
import ImagePreview from '../Common/ImagePreview.vue'
import Comment from './Comment.vue'
import Like from './Like.vue'
import Reply from './Reply.vue'
import ToolBar from './ToolBar.vue'
import type { Post } from '~/types/post'

const props = defineProps<{ data: Post }>()

const { public: env } = useRuntimeConfig()
const createTime = useLocaleTimeAgo(props.data.createdAt)

const { currentPostId, currentReplyId } = storeToRefs(useWebsiteStore())

const initImageIndex = ref<number | null>(null)
const isPreviewVisible = ref(false)
function onClickImage(index: number) {
  initImageIndex.value = index
  isPreviewVisible.value = true
}

const isDisplayToolbar = computed(() => props.data.id === currentPostId.value)
function onToggleToolbar(id: number | null) {
  currentPostId.value = id
}

const isDisplayReply = computed(() => props.data.id === currentReplyId.value)
function onToggleReply(id: number | null) {
  currentReplyId.value = id
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
    <main class="w-full cursor-default overflow-hidden text-sm">
      <span class="block pb-2 text-primary">{{ env.USERNAME }}</span>
      <p class="pb-3 text-gray-800">
        {{ data.content }}
      </p>
      <div class="flex flex-col gap-2">
        <!-- 图片 -->
        <ImageGrid v-if="data.assets" :images="data.assets" @image-click="onClickImage" />
        <ImagePreview v-if="data.assets" v-model:visible="isPreviewVisible" :images="data.assets" :index="initImageIndex" />
        <!-- 地址 -->
        <address v-if="data.address" class="text-xs text-primary not-italic">
          {{ data.address }}
        </address>
        <!-- 时间和工具栏 -->
        <div class="relative flex items-center justify-between">
          <time class="text-xs text-gray-400">{{ createTime }}</time>
          <button class="rounded bg-bgc px-1 text-primary" @click.stop="onToggleToolbar(data.id)">
            <div class="i-ri:more-fill text-xl" />
          </button>
          <ToolBar :visible="isDisplayToolbar" @hide="onToggleToolbar(null)" @reply="onToggleReply(data.id)" />
        </div>
        <!-- 回复表单 -->
        <HeightTransition>
          <Reply v-if="isDisplayReply" :post-id="data.id" @hide="onToggleReply(null)" />
        </HeightTransition>
        <!-- 评论区 -->
        <div v-if="isDisplayFooter" class="overflow-hidden rounded bg-bgc">
          <Like v-if="hasLike" :like="data.likes" />
          <div v-if="hasComment" class="flex flex-col gap-1 pb-2 text-primary">
            <Divider />
            <Comment v-for="item in data.comments" :key="item.id" :comment="item" @click.stop="onToggleCommentReply(item.id)">
              <Reply
                v-if="currentCommentReply === item.id"
                :post-id="data.id"
                :parent-id="item.id"
                :parent-name="item.name"
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
