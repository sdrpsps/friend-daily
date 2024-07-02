<script setup lang="ts">
import autosize from '@github/textarea-autosize'
import { nextTick, onMounted, ref } from 'vue'

defineProps<{
  postId: number
  commentId?: number
  replyName?: string
}>()

const emit = defineEmits(['hide'])
function onHide() {
  emit('hide')
}

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
  nextTick(() => autosize(textareaRef.value as HTMLTextAreaElement))
}

// 提交
async function onSubmit(e: Event) {
  e.preventDefault()
}

// 挂载时使 textarea 高度自适应
onMounted(() => {
  onAutoSizeTextarea()
})
</script>

<template>
  <div class="mt-1 overflow-auto border b-primaryGreen rounded">
    <form v-click-outside="onHide" class="rounded bg-white p-2" @submit="onSubmit">
      <textarea
        ref="textareaRef"
        v-model="fields[0].value"
        class="w-full resize-none b-none outline-none"
        :placeholder="`${replyName ? `回复${replyName}:` : '评论'}`"
        :maxlength="fields[0].maxlength"
        :required="fields[0].required"
      />
      <div class="flex items-start justify-between">
        <div class="bg-bg w-2/3 flex flex-col rounded py-2">
          <input
            v-for="field in fields.slice(1)"
            :key="field.name"
            v-model="field.value"
            class="border-b bg-transparent pt-1 outline-none first:pt-0"
            :name="field.name"
            :type="field.type"
            :maxlength="field.maxlength"
            :placeholder="field.placeholder"
            :required="field.required"
            :pattern="field?.pattern"
          >
        </div>
        <button class="rounded bg-primaryGreen px-5 py-1 text-white">
          {{ replyName ? '回复' : '评论' }}
        </button>
      </div>
    </form>
  </div>
</template>
