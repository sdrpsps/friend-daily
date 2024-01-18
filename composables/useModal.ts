import { type ComponentCustomProps, type VNode, createVNode, render } from 'vue'
import DialogConstructor from '~/components/Modal/Modal.vue'

interface ModalOptions extends ComponentCustomProps {
  title?: string
  content?: string
  visible?: boolean
  onClose?: () => void
}

interface ModalInstance {
  id: string
  vnode: VNode
  container: Element
}

// 模态框实例
const instances: ModalInstance[] = []
let seed = 0

export default function useModal(options: ModalOptions) {
  // 准备渲染容器
  const container = document.createElement('div')

  // 生成唯一标识
  const id = `dialog-${seed++}`

  // 自定义关闭逻辑
  const userOnClose = options.onClose
  options.onClose = () => {
    close(id)
    if (userOnClose)
      userOnClose()
  }

  // 生成 vnode
  const vnode = createVNode(DialogConstructor, options as any)
  // 渲染
  render(vnode, container)
  document.body.appendChild(container) // 确保元素被添加到 body
  // 推入实例列表
  instances.push({ id, vnode, container })

  return { close: () => close(id) } // 返回一个 close 函数供外部调用
}

function close(id: string) {
  const index = instances.findIndex(item => item.id === id)
  if (index !== -1) {
    const instance = instances[index]
    render(null, instance.container) // 清除 vnode
    instance.container.parentNode?.removeChild(instance.container) // 从 DOM 中移除
    instances.splice(index, 1) // 从实例列表中移除
  }
}
