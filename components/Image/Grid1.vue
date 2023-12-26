<script setup lang="ts">
import viewerConfig from './config'
import type { Media } from '~/server/api/post/types'

defineProps<{ media: Media[] }>()
</script>

<template>
  <div v-viewer.static="viewerConfig" class="grid grid-cols-1 w-2/3">
    <img class="aspect-square cursor-zoom-in rounded object-cover object-center" :src="media[0].url" alt="content-image">
  </div>
</template>
