<script setup lang="ts">
import type { PostItem, PostsResponse } from '~/server/api/post/types'

const postList = ref<PostItem[]>([])
const { data } = await useFetch<PostsResponse>('/api/post')
postList.value = [...postList.value, ...data.value!.posts]
</script>

<template>
  <div class="px-5 pb-2 pt-12">
    <Post v-for="post in postList" :key="post.id" :post="post" />
  </div>
</template>
