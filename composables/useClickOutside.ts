import { useEventListener } from '@vueuse/core'

function useClickOutside(elementRef: Ref<HTMLElement | null>) {
  const isDisplay = ref(false)

  // 给界面绑定上事件
  const handler = (e: MouseEvent) => {
    if (!elementRef.value)
      return

    if (!elementRef.value.contains(e.target as HTMLElement))
      isDisplay.value = false
  }

  useEventListener('click', handler)
  return { isDisplay }
}

export default useClickOutside
