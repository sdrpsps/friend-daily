<script setup lang="ts">
import type { PostItem } from '~/server/api/post/types'

const postItem = inject<PostItem>('postItem')!
</script>

<template>
  <div v-if="postItem.likes.length > 0" class="w-full flex bg-bg px-2 py-2 text-primary">
    <div class="i-icon-park-outline:like mt-[1px] flex-none text-lg" />
    <div class="pl-3 text-sm">
      {{ postItem.likes.map(item => item.name).join('，') }}
    </div>
  </div>
</template>
