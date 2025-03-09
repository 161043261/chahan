import { createVNode, render } from 'vue'
import ToastIndex from './ToastIndex.vue'
import type { App, Plugin, Ref, VNode } from 'vue'
import { debounced } from '@/utils'

/**
 * @description 一个自定义 toast Vue 插件
 */
export const toastPlugin: Plugin = {
  install(app: App) {
    // 创建容器 (document.body)
    const container = document.body

    // 防抖 debounce (只触发最后一次)
    // let timer: number | null = null
    // 默认 toast
    const defaultVNode: VNode = createVNode(ToastIndex, {
      message: '默认消息',
      // type: 'default'
      // duration: 1500
    })

    /**
     *
     * @param options { message, type?, duration? }
     * @description 挂载 toast (防抖 debounce)
     */
    const mountToast = (options: {
      message: string
      type?: 'success' | 'error' | 'warning' | 'default'
      duration?: number
    }) => {
      console.log('mountToast')
      // 资源清理
      // if (timer) {
      //   clearTimeout(timer)
      //   timer = null
      // }
      //! duration >= 500 && duration <= 2500, default 1500
      const duration = Math.min(
        2500,
        Math.max(500, options.duration ?? 1500 /** defaultDuration */),
      )

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

      // timer = setTimeout(() => {
      //   render(null, container)
      //   timer = null
      // }, duration)
    }

    // 注册全局方法
    app.config.globalProperties.$toast = {
      _isAlive: defaultVNode.component?.exposed?.isAlive,
      _mount: defaultVNode.component?.exposed?.mount,
      default: debounced((message: string) => mountToast({ message }), 100),
      success: debounced((message: string) => mountToast({ message, type: 'success' }), 100),
      warning: debounced(
        (message: string) =>
          mountToast({
            message,
            type: 'warning',
          }),
        100,
      ),
      error: debounced(
        (message: string) =>
          mountToast({
            message,
            type: 'error',
          }),
        100,
      ),
    }

    // app.config.globalProperties.$unmounted = () => {
    //   if (timer) {
    //     clearTimeout(timer)
    //     timer = null
    //   }
    // }
  },
}

// 类型扩展
declare module 'vue' {
  export interface ComponentCustomProperties {
    $toast: {
      _isAlive: Ref<boolean>
      _mount: () => void
      default: (message: string) => void
      success: (message: string) => void
      warning: (message: string) => void
      error: (message: string) => void
    }
  }
}
