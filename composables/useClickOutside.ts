import { ref, unref } from 'vue'
import { useEventListener } from '@vueuse/core'
import type { ComponentPublicInstance, Ref } from 'vue'

function useClickOutside(elementRef: Ref<HTMLElement | ComponentPublicInstance | null>) {
  const isDisplay = ref(false)

  const handler = (e: MouseEvent) => {
    const el = unref(elementRef) // 使用 unref 来统一处理 ref 和普通值
    if (!el)
      return

    // 如果 elementRef 是 Vue 组件实例，使用它的 $el 属性。
    // 否则，如果是 HTML 元素，直接使用 el
    const targetElement = (el as ComponentPublicInstance).$el ? (el as ComponentPublicInstance).$el : el as HTMLElement

    // 检查点击事件的目标是否在 targetElement 外部
    if (!targetElement.contains(e.target as Node))
      isDisplay.value = false // 如果在外部，则设置显示状态为 false
    else
      isDisplay.value = true
  }

  useEventListener('click', handler) // 使用 useEventListener 钩子监听点击事件

  return { isDisplay }
}

export default useClickOutside
