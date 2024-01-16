<script setup lang="ts">
import autosize from '@github/textarea-autosize'

const { replyName } = defineProps<{ replyName: string }>()
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

function onAutoSizeTextarea() {
  nextTick(() =>
    autosize(textareaRef.value as HTMLTextAreaElement))
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

// 挂载时使 textarea 高度自适应
onMounted(() => {
  onAutoSizeTextarea()
})
</script>

<template>
  <div class="mt-1 h-full w-full border b-primaryGreen rounded bg-white p-2">
    <textarea ref="textareaRef" v-model="fields[0].value" class="w-full resize-none b-none outline-none" :placeholder="`回复 ${replyName} :`" />
    <div class="flex items-start justify-between">
      <form class="w-2/3 flex flex-col rounded bg-bg p-2">
        <input v-for="field in fields.slice(1)" :key="field.name" v-model="field.value" class="border-b bg-transparent px-2 pt-1 outline-none first:pt-0" :name="field.name" :type="field.type" :maxlength="field.maxlength" :placeholder="field.placeholder">
      </form>
      <button class="rounded bg-primaryGreen px-5 py-1 text-white" @click="onSubmit">
        回复
      </button>
    </div>
  </div>
</template>
