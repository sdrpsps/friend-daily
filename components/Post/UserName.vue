<script setup lang="ts">
defineProps<{ name: string, website: string | null }>()
</script>

<template>
  <span v-if="!website">{{ name }}</span>
  <a v-else :href="website" target="_blank">{{ name }}</a>
</template>
