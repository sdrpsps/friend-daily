<script setup lang="ts">
const props = defineProps<{ like: string[] }>()

const userList = computed(() => props.like.filter(item => item !== '访客').join('，'))
const visitorCount = computed(() => props.like.reduce((acc, item) => item === '访客' ? acc + 1 : acc, 0))
</script>

<template>
  <div class="w-full flex px-2 py-2 text-primary">
    <div class="i-icon-park-outline:like mt-[1px] flex-none text-lg" />
    <div class="select-none pl-3 text-sm">
      {{ `${userList}${visitorCount > 0 ? `，${visitorCount}个访客` : ''}` }}
    </div>
  </div>
</template>
