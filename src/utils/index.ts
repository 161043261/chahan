/* eslint-disable @typescript-eslint/no-explicit-any */
export const debounced = (fn: (...args: any[]) => void, delay: number): typeof fn => {
  let timer: number | null = null
  const debouncedFn: typeof fn = (...args) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
  return debouncedFn
}

export const throttled = (fn: (...args: any[]) => void, delay: number): typeof fn => {
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
  return throttledFn
}
