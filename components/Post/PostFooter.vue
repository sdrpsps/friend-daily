<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
import Like from '~/components/Post/Like.vue'
import Comments from '~/components/Post/Comments.vue'
import Reply from '~/components/Post/Reply.vue'
import type { Like as ILike, PostItem } from '~/server/api/types'

const postItem = inject<PostItem>('postItem')!
const createTime = computed(() => useTimeAgo(postItem.createdAt).value.replace(/^["|'](.*)["|']$/g, '$1'))

// 浮动菜单显示判断
const toolbarRef = ref<HTMLElement | null>(null)
const { isDisplay: isDisplayToolbar } = useClickOutside(toolbarRef)

// 点赞
const likeStatus = ref(false)
async function onLike() {
  if (likeStatus.value) {
    const { data } = await useFetch('/api/like', { method: 'DELETE', body: { postId: postItem.id } })

    const index = postItem.likes.findIndex(item => item.id === data.value?.result.id)
    postItem.likes.splice(index, 1)
  }
  else {
    const { data } = await useFetch('/api/like', { method: 'POST', body: { postId: postItem.id } })

    postItem.likes.push(data.value?.result as ILike)
    setTimeout(() => {
      isDisplayToolbar.value = false
    }, 300)
  }
  likeStatus.value = !likeStatus.value
}

const replyRef = ref<HTMLDivElement | null>(null)
// 是否显示回复评论框
const isDisplayReply = ref(false)
function onShowReply() {
  isDisplayReply.value = !isDisplayReply.value
  setTimeout(() => {
    isDisplayToolbar.value = false
  }, 300)
}

// 通过是否有评论和是否显示回复来显示点赞评论分割线
const isDisplayDivider = computed(() =>
  (postItem.comments.length > 0 || isDisplayReply.value),
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
      <div ref="toolbarRef" class="relative cursor-pointer rounded bg-bg px-1 text-primary">
        <div class="i-ri:more-fill text-xl" @click="isDisplayToolbar = !isDisplayToolbar" />
        <!-- 浮动菜单 -->
        <Transition>
          <div v-if="isDisplayToolbar" class="triangle-right absolute right-[40px] flex rounded bg-toolbar py-2 text-white -top-[8px]">
            <div class="w-20 flex items-center justify-center border-r border-slate-800" @click="onLike">
              <div v-if="!likeStatus" class="i-icon-park-outline:like" />
              <div v-else class="i-icon-park-solid:like text-rose-500" />
              <div class="pl-1">
                赞
              </div>
            </div>
            <div class="w-20 flex items-center justify-center" @click="onShowReply">
              <div class="i-icon-park-outline:comment" />
              <div class="pl-1">
                评论
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
    <!-- 点赞和评论 -->
    <div class="overflow-hidden rounded bg-bg">
      <!-- 点赞列表 -->
      <Like />
      <!-- 分割线 -->
      <span v-if="isDisplayDivider" class="block border-b border-divider" />
      <!-- 回复 -->
      <div v-if="isDisplayReply" ref="replyRef" class="px-3 py-1">
        <Reply :reply-name="postItem.user.name" />
      </div>
      <!-- 评论区 -->
      <Comments />
    </div>
    <!-- 底部分割线 -->
    <span class="block border-b border-divider pt-3" />
  </div>
</template>

<style scoped>
/* 三角形 */
.triangle-right::after{
  content: '';
  position: absolute;
  top: 50%;
  right: -5px;
  transform: translateY(-50%);
  border-left: 5px solid #4b5153;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
}

/* 浮动菜单动画 */
.v-enter-active,
.v-leave-active {
  transition: all .2s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(20%);
}
</style>
