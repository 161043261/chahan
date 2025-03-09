/* eslint-disable @typescript-eslint/no-explicit-any */

// 防抖 debounce
export const debounced = (fn: (...args: any) => void, delay: number): typeof fn => {
  let timer: number | null = null
  const debouncedFn: typeof fn = (...args) => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn(...args)
      timer = null
    }, delay)
  }
  // 资源清理
  // onBeforeUnmount(() => {
  //   if (timer) {
  //     clearTimeout(timer)
  //     timer = null
  //   }
  // })

  return debouncedFn
}

// 节流 throttle
export const throttled = (fn: (...args: any) => void, delay: number): typeof fn => {
  let timer: number | null = null
  const throttledFn: typeof fn = (...args) => {
    if (timer) {
      return
    }
    fn(...args)
    timer = setTimeout(() => {
      timer = null
    }, delay)
  }
  // 资源清理
  // onBeforeUnmount(() => {
  //   if (timer) {
  //     clearTimeout(timer)
  //     timer = null
  //   }
  // })
  return throttledFn
}
