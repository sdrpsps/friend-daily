<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'

const props = defineProps<{ images: string[], visible: boolean, index: number | null }>()
const emit = defineEmits(['update:visible'])

const container = ref<HTMLElement | null>(null)
const translateX = ref(0)
const currentIndex = ref(0)
const startX = ref(0)
const startY = ref(0)
const currentTranslateX = ref(0)
const currentTranslateY = ref(0)
const isDragging = ref(false)
const zoomStates = ref(props.images.map(() => ({ scale: 1, translateX: 0, translateY: 0, isZoomed: false, loaded: false })))
const isZoomed = computed(() => zoomStates.value.some(zoomState => zoomState.isZoomed))

const lastClickTime = ref(0)
const doubleClickThreshold = 300

function startDrag(e: MouseEvent | TouchEvent) {
  e.preventDefault()
  isDragging.value = true
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
  startX.value = clientX
  startY.value = clientY
  if (isZoomed.value) {
    currentTranslateX.value = zoomStates.value[currentIndex.value].translateX
    currentTranslateY.value = zoomStates.value[currentIndex.value].translateY
  }
  else {
    currentTranslateX.value = translateX.value
  }
}

function stopDrag(e: MouseEvent | TouchEvent) {
  if (!isDragging.value)
    return

  e.preventDefault()
  isDragging.value = false

  if (!isZoomed.value) {
    const containerWidth = container.value?.clientWidth ?? 0
    const deltaX = translateX.value - currentTranslateX.value
    const threshold = containerWidth / 4

    if (deltaX > threshold) {
      currentIndex.value = Math.max(currentIndex.value - 1, 0)
    }
    else if (deltaX < -threshold) {
      currentIndex.value = Math.min(currentIndex.value + 1, props.images.length - 1)
    }
    translateX.value = -currentIndex.value * containerWidth
  }
}

function onDrag(e: MouseEvent | TouchEvent) {
  if (!isDragging.value)
    return
  e.preventDefault()

  if ('touches' in e && e.touches.length > 1)
    return

  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
  const deltaX = clientX - startX.value
  const deltaY = clientY - startY.value

  if (isZoomed.value) {
    const currentZoomState = zoomStates.value[currentIndex.value]
    currentZoomState.translateX = currentTranslateX.value + deltaX / currentZoomState.scale
    currentZoomState.translateY = currentTranslateY.value + deltaY / currentZoomState.scale
  }
  else {
    translateX.value = currentTranslateX.value + deltaX
  }
}

function onDoubleClick() {
  const current = zoomStates.value[currentIndex.value]
  if (current.isZoomed) {
    current.scale = 1
    current.translateX = 0
    current.translateY = 0
  }
  else {
    current.scale = 2
  }
  current.isZoomed = !current.isZoomed
}

function onClick(e: MouseEvent | TouchEvent) {
  const currentTime = new Date().getTime()
  const timeSinceLastClick = currentTime - lastClickTime.value

  if (timeSinceLastClick < doubleClickThreshold) {
    onDoubleClick()
  }
  else {
    startDrag(e)
  }

  lastClickTime.value = currentTime
}

function onKeydown(event: KeyboardEvent) {
  if (isZoomed.value) {
    const current = zoomStates.value[currentIndex.value]
    current.scale = 1
    current.translateX = 0
    current.translateY = 0
    current.isZoomed = false
  }

  if (event.key === 'ArrowRight')
    currentIndex.value = Math.min(currentIndex.value + 1, props.images.length - 1)
  else if (event.key === 'ArrowLeft')
    currentIndex.value = Math.max(currentIndex.value - 1, 0)
  else if (event.key === 'Escape')
    closePopup()
}

function closePopup() {
  emit('update:visible', false)
}

watch(currentIndex, (newIndex) => {
  nextTick(() => {
    if (!isZoomed.value) {
      translateX.value = -newIndex * (container.value?.clientWidth ?? 0)
    }
  })
})

watch(() => props.visible, (newVal) => {
  if (newVal) {
    currentIndex.value = props.index ?? 0
    document.addEventListener('keydown', onKeydown)
  }
  else {
    zoomStates.value = zoomStates.value.map(item => ({ ...item, translateX: 0, translateY: 0, scale: 1, isZoomed: false }))
    document.removeEventListener('keydown', onKeydown)
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="drag-body">
      <div v-if="visible" class="fixed inset-0 z-100 flex cursor-move items-center justify-center bg-black bg-opacity-50">
        <div class="relative w-95% overflow-hidden rounded-md bg-white md:h-3xl md:w-3xl">
          <button class="absolute right-2 top-2 z-10 overflow-hidden rounded" @click="closePopup">
            <div class="i-material-symbols:close text-xl text-stone-400" />
          </button>
          <div
            ref="container"
            class="relative overflow-hidden"
            @mousedown.prevent="onClick"
            @mouseup.prevent="stopDrag"
            @mouseleave.prevent="stopDrag"
            @mousemove.prevent="onDrag"
            @touchstart.prevent="onClick"
            @touchend.prevent="stopDrag"
            @touchmove.prevent="onDrag"
          >
            <div
              class="flex items-center"
              :class="{ 'transition-transform duration-500 ease-in-out': !isDragging }"
              :style="{ transform: `translateX(${translateX}px)` }"
            >
              <div
                v-for="(image, index) in images"
                :key="`i-${image}`"
                class="h-full w-full flex flex-shrink-0 justify-center"
                :class="{ 'transition-all duration-500 ease-in-out': !isDragging, 'opacity-0': (index !== currentIndex) && isZoomed }"
                :style="{ transform: `translateX(${zoomStates[index].translateX}px) translateY(${zoomStates[index].translateY}px) scale(${zoomStates[index].scale})` }"
              >
                <div v-if="!zoomStates[index].loaded" class="i-eos-icons:loading h-12 w-12" />
                <img v-show="zoomStates[index].loaded" :src="image" alt="Image" class="select-none" @load="zoomStates[index].loaded = true">
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.drag-body-enter-active,
.drag-body-leave-active {
  transition: all .2s ease-in-out;
}

.drag-body-enter-from,
.drag-body-leave-to {
  opacity: 0;
  transform: translateY(-3%);
}
</style>
