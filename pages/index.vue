<script setup lang="ts">
import Post from '@/components/Post/Post.vue'
import LoadMore from '~/components/Layout/LoadMore.vue'
import type { GetPostsResponse, Post as IPost } from '@/types/post'

defineOptions({
  name: 'FriendDaily',
})

const currentState = ref({
  post: null,
  reply: null,
})

const postList = ref<IPost[]>([])
const pageNum = ref(1)
const pageSize = ref(3)
const postTotal = ref(0)

async function onSearch() {
  const { data, total } = await $fetch<GetPostsResponse>('/api/post', {
    query: { pageNum: pageNum.value, pageSize: pageSize.value },
  })
  postList.value = [...postList.value, ...data]
  postTotal.value = total
}

function onLoadMore() {
  pageNum.value++
  onSearch()
}

await onSearch()
</script>

<template>
  <Post
    v-for="item in postList"
    :key="item.id"
    v-model:current-post="currentState.post"
    v-model:current-reply="currentState.reply"
    :data="item"
  />
  <LoadMore :can-load-more="postList.length !== postTotal" @load="onLoadMore" />
</template>
