import ToastIndex from '~/components/toast/ToastIndex'
import { createVNode, render } from 'vue'

export function createToast():
  | {
      default: (message: string, duration?: number) => void
      success: (message: string, duration?: number) => void
      warning: (message: string, duration?: number) => void
      error: (message: string, duration?: number) => void
    }
  | undefined {
  if (!document) {
    return // Server Side
  }
  // 创建容器 (document.body)
  const container = document.body

  // 防抖 debounce (只触发最后一次)
  // let timer: number | null = null

  /**
   *
   * @param options { message, type?, duration? }
   * @description 挂载 toast (防抖 debounce)
   */
  const mountToast = (options: {
    message: string
    type: 'success' | 'error' | 'warning' | 'default'
    duration: number
  }) => {
    //! duration >= 500 && duration <= 2500, default 1500
    const duration = Math.min(2500, Math.max(500, options.duration ?? 1500 /** defaultDuration */))

    // 清除旧 toast
    render(null, container)
    // 创建新 toast
    const vnode: VNode = createVNode(ToastIndex, {
      message: options.message,
      type: options.type ?? 'default',
      duration,
    })

    // 渲染到容器 (document.body)
    render(vnode, container)
    vnode.component?.exposed?.mount()
  }

  return {
    default: (message: string, duration?: number) =>
      mountToast({ message, type: 'default', duration: duration ?? 1500 }),
    success: (message: string, duration?: number) =>
      mountToast({ message, type: 'success', duration: duration ?? 1500 }),
    warning: (message: string, duration?: number) =>
      mountToast({ message, type: 'warning', duration: duration ?? 1500 }),
    error: (message: string, duration?: number) =>
      mountToast({ message, type: 'error', duration: duration ?? 1500 }),
  }
}

export interface Toast {
  default: (message: string, duration?: number) => void
  success: (message: string, duration?: number) => void
  warning: (message: string, duration?: number) => void
  error: (message: string, duration?: number) => void
}

export default createToast() as Toast
