<script setup lang="ts">
import viewerConfig from './config'
import type { Media } from '~/server/api/post/types'

defineProps<{ media: Media[] }>()
</script>

<template>
  <div v-viewer.static="viewerConfig" class="grid grid-cols-2 gap-1 w-2/3">
    <img v-for="item in media" :key="item.url" class="object-cover object-center aspect-square rounded cursor-zoom-in w-full" :src="item.url" alt="content-image">
  </div>
</template>
