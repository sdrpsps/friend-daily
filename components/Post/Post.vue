<script setup lang="ts">
import type { DefineComponent } from 'vue'
import ImageGrid1 from '~/components/Image/Grid1.vue'
import ImageGrid2 from '~/components/Image/Grid2.vue'
import ImageGrid3 from '~/components/Image/Grid3.vue'
import type { Media, PostItem } from '~/server/api/types'

const props = defineProps<{ post: PostItem }>()
// 跨组件
provide<PostItem>('postItem', props.post)
const avatar = computed(() => 'https://static.bytespark.app/file/ed02ef201195aef1be23e.png')

// 根据图片数量映射不同的组件
type GridComponentType = DefineComponent<{ media: Media[] }, object, any>
const gridMapping: Record<number, GridComponentType> = {
  1: ImageGrid1 as GridComponentType,
  2: ImageGrid2 as GridComponentType,
  3: ImageGrid3 as GridComponentType,
  4: ImageGrid2 as GridComponentType,
  5: ImageGrid2 as GridComponentType,
  6: ImageGrid2 as GridComponentType,
  7: ImageGrid2 as GridComponentType,
  8: ImageGrid3 as GridComponentType,
  9: ImageGrid3 as GridComponentType,
}
function getGridComponent(imageCount: number) {
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
        <ClientOnly>
          <component :is="getGridComponent(post.media.length)" :media="post.media" />
        </ClientOnly>
      </div>
      <!-- 底部 -->
      <PostFooter />
    </div>
  </div>
</template>
