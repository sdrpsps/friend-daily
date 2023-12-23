<script setup lang="ts">
import viewerConfig from './config'
import type { Media } from '~/server/api/post/types'

defineProps<{ media: Media[] }>()
</script>

<template>
  <div v-viewer.static="viewerConfig" class="grid grid-cols-1 w-2/3">
    <img class="object-cover object-center aspect-square rounded cursor-zoom-in" :src="media[0].url" alt="content-image">
  </div>
</template>
