export function getDate() {
  const pad0 = (num: number) => num.toString().padStart(2, '0')
  const date = new Date()
  return `${date.getFullYear()}-${pad0(date.getMonth() + 1)}-${pad0(date.getDate())}`
}

export function getTime() {
  const pad0 = (num: number) => num.toString().padStart(2, '0')
  const date = new Date()
  return `${pad0(date.getHours())}:${pad0(date.getMinutes())}:${pad0(date.getSeconds())}`
}

export function randNum(from: number, to: number): number {
  return Math.floor(Math.random() * (to - from)) + from
}

export function randArr(from: number, to: number, length: number): number[] {
  return Array.from(
    {
      length,
    },
    (/** */) => randNum(from, to),
  )
}
