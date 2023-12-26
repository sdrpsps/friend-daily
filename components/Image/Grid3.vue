<script setup lang="ts">
import viewerConfig from './config'
import type { Media } from '~/server/api/post/types'

defineProps<{ media: Media[] }>()
</script>

<template>
  <div v-viewer.static="viewerConfig" class="grid grid-cols-3 w-4/5 gap-1">
    <img v-for="item in media" :key="item.url" class="aspect-square w-full cursor-zoom-in rounded object-cover object-center" :src="item.url" alt="content-image">
  </div>
</template>
