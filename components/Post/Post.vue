<script setup lang="ts">
const avatar = computed(() => 'https://static.bytespark.app/file/ed02ef201195aef1be23e.png')
</script>

<template>
  <div class="flex gap-3 pt-3">
    <!-- 头像 -->
    <img class="w-9 h-9 rounded-md bg-white" :src="avatar" alt="avatar">
    <!-- 内容 -->
    <div class="text-sm cursor-default">
      <span class="text-primary pb-2 block">Sunny</span>
      <p class="text-gray-800">
        人若要云淡风轻，就需要极高的修养；房子要装得质朴无华，则需要昂贵的代价，非常人能奢想。凡事多如此，简单的往往最贵，除非是真简单。
      </p>
      <div class="pt-1 pb-4">
        <ImageGrid1 />
        <ImageGrid2 />
        <ImageGrid3 />
      </div>
      <!-- 底部 -->
      <PostFooter />
    </div>
  </div>
</template>
