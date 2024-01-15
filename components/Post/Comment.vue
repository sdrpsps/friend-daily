<script setup lang="ts">
import autosize from '@github/textarea-autosize'
import UserName from '~/components/Post/UserName.vue'
import type { Comment, PostItem } from '~/server/api/post/types'

const { comment } = defineProps<{ comment: Comment }>()
const postItem = inject<PostItem>('postItem')!

// 获取回复用户
const replyName = computed(() => postItem.comments.find(item => item.id === comment.replyToId)?.name)
const replyWebsite = computed(() => postItem.comments.find(item => item.id === comment.replyToId)?.website)

// 显示输入框
const isDisplay = ref(false)
const textareaRef = ref<HTMLElement | null>(null)
// 表单字段
const fields = ref([
  { name: 'content', type: 'text', value: '', maxlength: 140, required: true, placeholder: '内容 *', pattern: /.+/ },
  {
    name: 'author',
    type: 'text',
    value: '',
    maxlength: 32,
    required: true,
    placeholder: '昵称 *',
    pattern: /^[a-zA-Z\u4E00-\u9FA5][a-zA-Z0-9\u4E00-\u9FA5\-·]*[a-zA-Z0-9\u4E00-\u9FA5]?$/,
  },
  { name: 'email', type: 'email', value: '', maxlength: 70, required: true, placeholder: '邮箱 *', pattern: /^([a-zA-Z0-9_\.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,10})$/ },
  { name: 'website', type: 'url', value: '', maxlength: 70, required: false, placeholder: '网站', pattern: /^https?:\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\+\.\/~!@#%&amp;_=\|;:,?]*[\w\-\+\/~@#%&amp;_=\|])?$/ },
])

// 显示回复评论
function onShowInput() {
  isDisplay.value = !isDisplay.value
  // 文本框高度自适应
  if (isDisplay.value) {
    nextTick(() =>
      autosize(textareaRef.value as HTMLTextAreaElement))
  }
}

// 提交
function onSubmit() {
  const errors: string[] = []

  fields.value.forEach((item) => {
    if (!item.value && item.required)
      errors.push(`${item.name}不能为空`)
    if (item.pattern && !new RegExp(item.pattern).test(item.value))
      errors.push(`${item.name}格式不正确`)
  })
  if (errors.length) {
    // ...
  }
  else {
    // ...
  }
}
</script>

<template>
  <div>
    <div>
      <!-- 被回复评论 -->
      <template v-if="comment.replyToId">
        <UserName :name="comment.name" :website="comment.website" />
        <span class="px-0.5 text-gray-800">回复</span>
        <UserName :name="replyName" :website="replyWebsite" />
        <span class="pr-1">:</span>
        <span class="comment-content hover:cursor-alias" @click="onShowInput">{{ comment.content }}</span>
      </template>
      <!-- 普通评论 -->
      <template v-else>
        <UserName :name="comment.name" :website="comment.website" />
        <span class="pr-1">:</span>
        <span class="comment-content hover:cursor-alias" @click="onShowInput">{{ comment.content }}</span>
      </template>
    </div>

    <div v-if="isDisplay" class="mt-1 h-full w-full border b-primaryGreen rounded bg-white p-2">
      <textarea ref="textareaRef" v-model="fields[0].value" class="w-full resize-none b-none outline-none" :placeholder="`回复 ${comment.name} :`" />
      <div class="flex items-start justify-between">
        <form class="w-58 flex flex-col rounded bg-bg p-2">
          <input v-for="field in fields.slice(1)" :key="field.name" v-model="field.value" class="border-b bg-transparent px-2 pb-1 outline-none" :name="field.name" :type="field.type" :maxlength="field.maxlength" :placeholder="field.placeholder">
        </form>
        <button class="rounded bg-bg px-5 py-1" @click="onSubmit">
          回复
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.comment-content{
  @apply text-gray-800 whitespace-pre-wrap overflow-hidden;
}
</style>
