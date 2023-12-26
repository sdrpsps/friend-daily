<script setup lang="ts">
import ImageGrid1 from '~/components/Image/Grid1.vue'
import ImageGrid2 from '~/components/Image/Grid2.vue'
import ImageGrid3 from '~/components/Image/Grid3.vue'
import type { PostItem } from '~/server/api/post/types'

const props = defineProps<{ post: PostItem }>()
// 跨组件
provide<PostItem>('postItem', props.post)
const avatar = computed(() => 'https://static.bytespark.app/file/ed02ef201195aef1be23e.png')

function getGridComponent(imageCount: number) {
  const gridMapping: Record<number, InstanceType<typeof ImageGrid1>> = {
    1: ImageGrid1,
    2: ImageGrid2,
    3: ImageGrid3,
    4: ImageGrid2,
    5: ImageGrid2,
    6: ImageGrid2,
    7: ImageGrid2,
    8: ImageGrid3,
    9: ImageGrid3,
  }

  return gridMapping[imageCount]
}
</script>

<template>
  <div class="flex gap-3 pt-3">
    <!-- 头像 -->
    <img class="h-9 w-9 rounded-md bg-white" :src="avatar" alt="avatar">
    <!-- 内容 -->
    <div class="w-full cursor-default text-sm">
      <span class="block pb-2 text-primary">{{ post.user.name }}</span>
      <p class="text-gray-800">
        {{ post.title }}
      </p>
      <div class="pb-4 pt-1">
        <component :is="getGridComponent(post.media.length)" :media="post.media" />
      </div>
      <!-- 底部 -->
      <PostFooter />
    </div>
  </div>
</template>
