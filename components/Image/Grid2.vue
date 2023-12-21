<script setup lang="ts">
const contentImage = computed(() => 'https://static.bytespark.app/file/ed02ef201195aef1be23e.jpg')
</script>

<template>
  <div class="grid grid-cols-2 gap-1 w-max">
    <img v-for="item in 2" :key="item" class="object-cover object-center aspect-square rounded cursor-zoom-in w-36 h-36" :src="contentImage" alt="content-image">
  </div>
</template>
