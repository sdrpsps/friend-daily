<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    canLoadMore: boolean
    loadingText?: string
    fullText?: string
  }>(),
  {
    loadingText: '加载中...',
    fullText: '看完了',
  },
)

const emit = defineEmits(['load'])

const loadMoreTrigger = ref(null)

onMounted(() => {
  useIntersectionObserver(
    loadMoreTrigger,
    ([{ isIntersecting }]) => {
      if (isIntersecting && props.canLoadMore) {
        emit('load')
      }
    },
    {
      threshold: 0.1, // 当目标元素的 10% 可见时触发回调
    },
  )
})
</script>

<template>
  <footer ref="loadMoreTrigger" class="flex items-center justify-center">
    <div class="text-gray-300">
      <div v-if="canLoadMore" class="flex items-center justify-center gap-1">
        <div class="i-eos-icons:loading" />
        <span class="text-xs">{{ loadingText }}</span>
      </div>
      <span v-else class="text-xs">
        {{ fullText }}
      </span>
    </div>
  </footer>
</template>
