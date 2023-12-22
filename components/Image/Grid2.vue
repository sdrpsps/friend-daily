<script setup lang="ts">
const contentImage = computed(() => 'https://static.bytespark.app/file/399c701beb0e6787db70f.jpg')
</script>

<template>
  <div class="grid grid-cols-2 gap-1 w-2/3">
    <img v-for="item in 2" :key="item" class="object-cover object-center aspect-square rounded cursor-zoom-in w-full" :src="contentImage" alt="content-image">
  </div>
</template>
