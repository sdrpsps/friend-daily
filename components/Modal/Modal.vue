<script setup lang="ts">
defineProps({
  id: String,
  title: String,
  content: String,
})

const emit = defineEmits(['close'])
const visible = ref(false)
function show() {
  visible.value = true
}

function onClose() {
  visible.value = false
  setTimeout(() => {
    emit('close')
  }, 300)
}

onMounted(() => {
  show()
})
</script>

<template>
  <teleport to="body">
    <transition name="dialog-fade">
      <div v-show="visible" class="fixed bottom-0 left-0 right-0 top-0 z-99 flex items-center justify-center bg-black/50">
        <div class="w-2/3 rounded bg-white p-5 md:w-xl">
          <div class="text-lg leading-6">
            <slot name="header">
              <span class="text-slate-700">
                {{ title }}
              </span>
            </slot>
          </div>
          <div class="py-5">
            <slot>
              <span class="whitespace-pre-line text-primary leading-6">
                {{ content }}
              </span>
            </slot>
          </div>
          <div class="flex justify-end">
            <slot name="footer">
              <button class="rounded bg-primary px-5 py-1 text-sm text-white" @click="onClose">
                关闭
              </button>
            </slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.dialog-fade-enter-active {
  animation: dialog-fade-in 0.3s;
}

.dialog-fade-leave-active {
  animation: dialog-fade-out 0.3s;
}

@keyframes dialog-fade-in {
  0% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes dialog-fade-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
}
</style>
