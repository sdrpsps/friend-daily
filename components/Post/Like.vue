<script setup lang="ts">
import type { PostItem } from '~/server/api/post/types'

const postItem = inject<PostItem>('postItem')!
</script>

<template>
  <div v-if="postItem.likes.length > 0" class="bg-bg w-full text-primary flex items-center px-2 py-2 rounded">
    <div class="i-icon-park-outline:like mr-3 text-lg" />
    <div class="text-xs">
      {{ postItem.likes.map(item => item.name).join('，') }}
    </div>
  </div>
</template>
