<script setup lang="ts">
import type { PostsResponse } from '~/server/api/post/types'

const { data: postList } = await useFetch<PostsResponse>('/api/post')
</script>

<template>
  <div class="px-5 pt-12">
    <Post v-for="post in postList.posts" :key="post.id" :post="post" />
  </div>
</template>
