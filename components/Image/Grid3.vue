<script setup lang="ts">
const contentImage = computed(() => 'https://static.bytespark.app/file/ed02ef201195aef1be23e.jpg')
</script>

<template>
  <div class="grid grid-cols-3 gap-1 w-max">
    <img v-for="item in 3" :key="item" class="object-cover object-center aspect-square rounded cursor-zoom-in w-32 h-32" :src="contentImage" alt="content-image">
  </div>
</template>
