<script setup lang="ts">
function getTotalHeight(el: HTMLElement) {
  const style = getComputedStyle(el)
  const marginTop = Number.parseFloat(style.marginTop) || 0
  const marginBottom = Number.parseFloat(style.marginBottom) || 0
  const paddingTop = Number.parseFloat(style.paddingTop) || 0
  const paddingBottom = Number.parseFloat(style.paddingBottom) || 0

  return el.scrollHeight + paddingTop + paddingBottom + marginTop + marginBottom
}

function onEnter(element: Element) {
  const el = element as HTMLElement
  el.style.height = `${getTotalHeight(el)}px`
}

function onLeave(element: Element) {
  const el = element as HTMLElement
  el.style.height = '0px'
}
</script>

<template>
  <Transition @enter="onEnter" @leave="onLeave">
    <slot />
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all .3s ease-in-out;
  overflow: hidden;
}

.v-enter-from,
.v-leave-to {
  height: 0;
}
</style>
