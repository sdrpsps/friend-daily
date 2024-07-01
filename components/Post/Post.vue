<script setup lang="ts">
import ToolBar from './ToolBar.vue'
import Comment from './Comment.vue'

const props = defineProps<{
  currentPost: number | null
  currentComment: number | null
  data: { id: number, name: string, content: string, date: string, address: string }
}>()

const emit = defineEmits(['update:currentPost', 'update:currentComment'])

const { public: env } = useRuntimeConfig()
const createTime = useLocaleTimeAgo(props.data.date)

const isDisplayToolbar = computed(() => props.data.id === props.currentPost)
function toggleToolbar() {
  emit('update:currentPost', props.data.id)
}
function hideToolbar() {
  emit('update:currentPost', null)
}

const isDisplayComment = computed(() => props.data.id === props.currentComment)
function toggleComment() {
  emit('update:currentComment', props.data.id)
}
function hideComment() {
  emit('update:currentComment', null)
}
</script>

<template>
  <article class="flex gap-3 pt-3">
    <img class="h-9 w-9 rounded-md bg-white object-cover" :src="env.AVATAR" alt="avatar">
    <main class="w-full cursor-default text-sm">
      <span class="block pb-2 text-primary">{{ data.name }}</span>
      <p class="pb-3 text-gray-800">
        {{ data.content }}
      </p>
      <div class="flex flex-col gap-1">
        <address v-if="data.address" class="text-xs text-primary not-italic">
          {{ data.address }}
        </address>
        <div class="relative flex items-center justify-between">
          <time class="text-xs text-gray-400">{{ createTime }}</time>
          <button class="rounded bg-bgc px-1 text-primary" @click.stop="toggleToolbar">
            <div class="i-ri:more-fill text-xl" />
          </button>
          <ToolBar :visible="isDisplayToolbar" :data="data" @hide="hideToolbar" @comment="toggleComment" />
        </div>
        <Comment v-if="isDisplayComment" :data="data" @hide="hideComment" />
      </div>
      <span class="block border-b border-divider pt-3" />
    </main>
  </article>
</template>
