<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
import Like from '~/components/Post/Like.vue'
import Comment from '~/components/Post/Comment.vue'
import type { Like as ILike, PostItem } from '~/server/api/post/types'

const postItem = inject<PostItem>('postItem')!
const createTime = computed(() => useTimeAgo(postItem.createdAt).value.replace(/^["|'](.*)["|']$/g, '$1'))

// 通过是否有评论和点赞来显示下边距
const hasPaddingBottom = computed(() =>
  (postItem.comments.length > 0 || postItem.likes.length > 0) ? 'pb-4' : '',
)

// 浮动菜单显示判断
const toolbarRef = ref<HTMLElement | null>(null)
const { isDisplay } = useClickOutside(toolbarRef)

// 点赞
const likeStatus = ref(false)
async function onLike() {
  if (likeStatus.value) {
    const { data } = await useFetch('/api/post/like', { method: 'DELETE', body: { id: postItem.id } })

    const index = postItem.likes.findIndex(item => item.id === data.value?.result.id)
    postItem.likes.splice(index, 1)
  }
  else {
    const { data } = await useFetch('/api/post/like', { method: 'POST', body: { id: postItem.id } })

    postItem.likes.push(data.value?.result as ILike)
    setTimeout(() => {
      isDisplay.value = false
    }, 300)
  }
  likeStatus.value = !likeStatus.value
}
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
        <div class="i-ri:more-fill text-xl" @click="isDisplay = !isDisplay" />
        <!-- 浮动菜单 -->
        <Transition>
          <div v-if="isDisplay" class="triangle-right absolute right-[40px] flex rounded bg-toolbar py-2 text-white -top-[8px]">
            <div class="w-20 flex items-center justify-center border-r border-slate-800" @click="onLike">
              <div v-if="!likeStatus" class="i-icon-park-outline:like" />
              <div v-else class="i-icon-park-solid:like text-rose-500" />
              <div class="pl-1">
                赞
              </div>
            </div>
            <div class="w-20 flex items-center justify-center">
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
  transition: all .3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(80%);
}
</style>
