<script setup lang="ts">
const props = defineProps<{ visible: boolean, postId: number, like: string[] }>()

const emit = defineEmits(['hide', 'reply'])

const { onUpdatePostLike } = useWebsiteStore()

function onHide() {
  emit('hide')
}

const user = useUser()
const isGuest = computed(() => user.value.id === 2)
const isLike = isGuest.value ? ref(false) : computed(() => props.like.includes(user.value.name))

async function onLike() {
  if (isLike.value) {
    await $fetch(`/api/like/${props.postId}`, {
      method: 'DELETE',
      body: {
        userId: user.value.id,
      },
    })
  }
  else {
    await $fetch(`/api/like/${props.postId}`, {
      method: 'POST',
      body: {
        userId: user.value.id,
      },
    })
  }

  onUpdatePostLike(props.postId)
  if (isGuest.value) {
    (isLike as Ref<boolean>).value = !(isLike as Ref<boolean>).value
  }

  setTimeout(() => {
    emit('hide')
  }, 500)
}

function onReply() {
  emit('reply')
  emit('hide')
}
</script>

<template>
  <Transition>
    <div v-if="visible" v-click-outside="onHide" class="triangle-right absolute right-[40px] flex rounded bg-toolbar py-2 text-white -top-[8px]">
      <button class="w-20 flex items-center justify-center border-r border-slate-800 bg-toolbar" @click="onLike">
        <div v-if="!isLike" class="i-icon-park-outline:like" />
        <div v-else class="i-icon-park-solid:like text-rose-500" />
        <div class="pl-1">
          赞
        </div>
      </button>
      <button class="w-20 flex items-center justify-center bg-toolbar" @click.stop="onReply">
        <div class="i-icon-park-outline:comment" />
        <div class="pl-1">
          评论
        </div>
      </button>
    </div>
  </Transition>
</template>

<style scoped>
/* 三角形 */
.triangle-right::after{
  content: '';
  position: absolute;
  top: 50%;
  right: -5px;
  transform: translateY(-50%);
  border-left: 5px solid #4b5153;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
}

/* 浮动菜单动画 */
.v-enter-active,
.v-leave-active {
  transition: all .2s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(20%);
}
</style>
