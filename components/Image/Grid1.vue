<script setup lang="ts">
const contentImage = computed(() => 'https://static.bytespark.app/file/399c701beb0e6787db70f.jpg')
</script>

<template>
  <div class="grid grid-cols-1 max-w-[300px]">
    <img class="object-cover object-center rounded cursor-zoom-in" :src="contentImage" alt="content-image">
  </div>
</template>
