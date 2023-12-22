<script setup lang="ts">
import viewerConfig from './config'

const images = [
  'https://picsum.photos/200/200',
  'https://picsum.photos/300/200',
  'https://picsum.photos/250/200',
]
</script>

<template>
  <div v-viewer.static="viewerConfig" class="grid grid-cols-3 gap-1 w-4/5">
    <img v-for="item in images" :key="item" class="object-cover object-center aspect-square rounded cursor-zoom-in w-full" :src="item" alt="content-image">
  </div>
</template>
