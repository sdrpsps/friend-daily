<script setup lang="ts">
import Post from '@/components/Post/Post.vue'

defineOptions({
  name: 'FriendDaily',
})

const currentState = ref({
  post: null,
  reply: null,
})

const postList = ref<any[]>([])
const pageNum = ref(1)
const pageSize = ref(5)

const { data, status, error } = await useFetch('/api/post', {
  query: { pageNum: pageNum.value, pageSize: pageSize.value },
})

if (!error.value && data.value) {
  postList.value = data.value?.data
}
</script>

<template>
  <div v-if="status === 'pending'" class="i-eos-icons:loading h-12 w-12" />
  <Post
    v-for="item in postList"
    v-else
    :key="item.id"
    v-model:current-post="currentState.post"
    v-model:current-reply="currentState.reply"
    :data="item"
  />
</template>
