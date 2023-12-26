<script setup lang="ts">
import type { PostItem } from '~/server/api/post/types'

const postItem = inject<PostItem>('postItem')!
</script>

<template>
  <div v-if="postItem.likes.length > 0" class="bg-bg w-full text-primary flex px-2 py-2">
    <div class="mt-[1px] flex-none i-icon-park-outline:like text-lg" />
    <div class="pl-3 text-sm">
      {{ postItem.likes.map(item => item.name).join('，') }}
    </div>
  </div>
</template>
