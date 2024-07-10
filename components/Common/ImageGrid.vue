<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ images: string[] }>()
const emit = defineEmits(['imageClick'])

const gridClass = computed(() => {
  const count = props.images.length
  switch (count) {
    case 1:
      return 'grid-cols-1'
    case 2:
      return 'grid-cols-2'
    case 3:
      return 'grid-cols-3'
    case 4:
      return 'grid-cols-2'
    case 5:
      return 'grid-cols-3 grid-rows-2'
    case 6:
      return 'grid-cols-3'
    case 7:
    case 8:
    case 9:
      return 'grid-cols-3'
    default:
      return 'grid-cols-3'
  }
})

function onClickImage(index: number) {
  emit('imageClick', index)
}
</script>

<template>
  <div class="grid gap-2" :class="gridClass">
    <div v-for="(image, index) in images" :key="image" class="aspect-square cursor-zoom-in overflow-hidden rounded" @click="onClickImage(index)">
      <img :src="image" :alt="`Displaying image ${image}`" loading="lazy" class="h-full w-full object-cover">
    </div>
  </div>
</template>
