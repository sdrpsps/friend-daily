<script setup lang="ts">
import autosize from '@github/textarea-autosize'
import { nextTick, onMounted, ref } from 'vue'
import type { PostCommentResponse } from '@/types/comment'

const props = defineProps<{
  postId: number
  parentId?: number
  parentName?: string
}>()

const emit = defineEmits(['hide', 'updateComment'])

const { onUpdatePostComment } = useWebsiteStore()

const textareaRef = ref<HTMLTextAreaElement | null>(null)

const comment = ref<Record<string, string | number>>({
  content: '',
  name: '',
  email: '',
  website: '',
})

function onHide() {
  emit('hide')
}

function onAutoSizeTextarea() {
  nextTick(() => {
    if (textareaRef.value) {
      autosize(textareaRef.value)
    }
  })
}

function generateBody() {
  const body = { ...comment.value }

  Object.keys(body).forEach((key) => {
    if (body[key] === '') {
      delete body[key]
    }
  })

  if (props.parentId) {
    body.parentId = props.parentId
  }

  return body
}

async function onSubmit(e: Event) {
  e.preventDefault()

  const { data, success } = await $fetch<PostCommentResponse>(`/api/comment/${props.postId}`, {
    method: 'POST',
    body: generateBody(),
  })

  if (success) {
    onHide()
    onUpdatePostComment(props.postId)
    const user = useUser()
    user.value = data
  }
}

onMounted(() => {
  onAutoSizeTextarea()
  const user = useUser()

  if (!user.value || user.value.name === '访客') {
    return
  }
  comment.value.name = user.value.name
  comment.value.email = user.value.email
  comment.value.website = user.value.website
})
</script>

<template>
  <div v-click-outside="onHide" class="mt-1 overflow-auto border b-primaryGreen rounded" @click.stop>
    <form class="rounded bg-white p-2" @submit="onSubmit">
      <textarea
        ref="textareaRef"
        v-model="comment.content"
        class="w-full resize-none b-none outline-none"
        :placeholder="`${props.parentName ? `回复${props.parentName}:` : '评论'}`"
        maxlength="140"
        required
      />
      <div class="mt-2 flex items-start justify-between">
        <div class="bg-bg w-2/3 flex flex-col rounded py-2">
          <input
            v-model="comment.name"
            class="border-b bg-transparent pt-1 outline-none"
            name="name"
            type="text"
            maxlength="32"
            placeholder="昵称 *"
            required
            pattern="^[a-zA-Z\\u4E00-\\u9FA5][a-zA-Z0-9\\u4E00-\\u9FA5\\-·]*[a-zA-Z0-9\\u4E00-\\u9FA5]?$"
          >
          <input
            v-model="comment.email"
            class="border-b bg-transparent pt-1 outline-none"
            name="email"
            type="email"
            placeholder="邮箱 *"
            required
          >
          <input
            v-model="comment.website"
            class="border-b bg-transparent pt-1 outline-none"
            name="website"
            type="url"
            placeholder="网站"
          >
        </div>
        <button class="rounded bg-primaryGreen px-5 py-1 text-white">
          {{ props.parentName ? '回复' : '评论' }}
        </button>
      </div>
    </form>
  </div>
</template>
