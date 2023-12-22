<script setup lang="ts">
import viewerConfig from './config'

const contentImage = computed(() => 'https://static.bytespark.app/file/399c701beb0e6787db70f.jpg')
</script>

<template>
  <div v-viewer.static="viewerConfig" class="grid grid-cols-1 w-2/3">
    <img class="object-cover object-center aspect-square rounded cursor-zoom-in" :src="contentImage" alt="content-image">
  </div>
</template>
