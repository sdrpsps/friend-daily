<script setup lang="ts">
import Post from '@/components/Post/Post.vue'
import LoadMore from '@/components/Layout/LoadMore.vue'
import type { GetPostsResponse } from '~/types/post'

defineOptions({
  name: 'FriendDaily',
})

const { onLoadMore } = useWebsiteStore()
const { postList, pageNum, pageSize, postTotal, canLoadMore } = storeToRefs(useWebsiteStore())

async function onSearch() {
  const { data } = await useFetch<GetPostsResponse>('/api/post', {
    query: { pageNum: pageNum.value, pageSize: pageSize.value },
  })

  if (data.value) {
    postList.value = [...postList.value, ...data.value.data]
    postTotal.value = data.value.total
  }
}

await onSearch()
</script>

<template>
  <section class="px-5 pt-12">
    <Post v-for="item in postList" :key="item.id" :data="item" />
    <LoadMore :can-load-more="canLoadMore" @load="onLoadMore" />
  </section>
</template>
