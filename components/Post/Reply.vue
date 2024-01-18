<script setup lang="ts">
import autosize from '@github/textarea-autosize'
import type { PostItem } from '~/server/api/types'

const { replyName, parentId } = defineProps<{ replyName: string, parentId?: string | null }>()
const emit = defineEmits(['onClose'])
const postItem = inject<PostItem>('postItem')!
const textareaRef = ref<HTMLElement | null>(null)

// 表单字段
const fields = ref([
  { name: 'content', type: 'text', value: '', maxlength: 140, required: true, placeholder: '内容 *' },
  {
    name: 'name',
    type: 'text',
    value: '',
    maxlength: 32,
    required: true,
    placeholder: '昵称 *',
    pattern: '^[a-zA-Z\\u4E00-\\u9FA5][a-zA-Z0-9\\u4E00-\\u9FA5\\-·]*[a-zA-Z0-9\\u4E00-\\u9FA5]?$',
  },
  { name: 'email', type: 'email', value: '', maxlength: 70, required: true, placeholder: '邮箱 *' },
  { name: 'website', type: 'url', value: '', maxlength: 70, required: false, placeholder: '网站' },
])

function onAutoSizeTextarea() {
  nextTick(() =>
    autosize(textareaRef.value as HTMLTextAreaElement))
}

// 提交
async function onSubmit(e: Event) {
  e.preventDefault()

  const data = { postId: postItem.id, parentId, ...fields.value.reduce((obj, item) => ({ ...obj, [item.name]: item.value }), {}) }

  const { data: replyData } = await useFetch('/api/comment', { method: 'POST', body: data })

  if (replyData && replyData.value?.result) {
    postItem.comments.push(replyData.value.result)
    emit('onClose')
  }
}

// 挂载时使 textarea 高度自适应
onMounted(() => {
  onAutoSizeTextarea()
})
</script>

<template>
  <div class="mt-1 h-full w-full border b-primaryGreen rounded bg-white p-2">
    <form @submit="onSubmit">
      <textarea
        ref="textareaRef"
        v-model="fields[0].value"
        class="w-full resize-none b-none outline-none"
        :placeholder="`回复 ${replyName} :`"
        :maxlength="fields[0].maxlength"
        :required="fields[0].required"
      />
      <div class="flex items-start justify-between">
        <div class="w-2/3 flex flex-col rounded bg-bg p-2">
          <input
            v-for="field in fields.slice(1)"
            :key="field.name"
            v-model="field.value"
            class="border-b bg-transparent px-2 pt-1 outline-none first:pt-0"
            :name="field.name"
            :type="field.type"
            :maxlength="field.maxlength"
            :placeholder="field.placeholder"
            :required="field.required"
            :pattern="field?.pattern"
          >
        </div>
        <button class="rounded bg-primaryGreen px-5 py-1 text-white">
          回复
        </button>
      </div>
    </form>
  </div>
</template>
