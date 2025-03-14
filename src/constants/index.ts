export const white_list = new Set<string>(['/login', '/notFound'])

export const robot_states = [
  '全部' /** 0 */,
  '闲置' /** 1 */,
  '使用' /** 2 */,
  '故障' /** 3 */,
  '维修' /** 4 */,
  '报废' /** 5 */,
]

export const order_states = [
  '全部' /** 0 */,
  '进行中' /** 1 */,
  '已完成' /** 2 */,
  '已取消' /** 3 */,
]

export const robot_state2text_and_type = new Map<
  number,
  {
    text: (typeof robot_states)[number]
    type: 'primary' | 'success' | 'info' | 'warning' | 'danger'
  }
>([
  [1, { text: robot_states[1], type: 'primary' }],
  [2, { text: robot_states[2], type: 'success' }],
  [3, { text: robot_states[3], type: 'info' }],
  [4, { text: robot_states[4], type: 'warning' }],
  [5, { text: robot_states[5], type: 'danger' }],
])

export const order_state2text_and_type = new Map<
  number,
  {
    text: (typeof order_states)[number]
    type: 'primary' | 'success' | 'info'
  }
>([
  [1, { text: order_states[1], type: 'primary' }],
  [2, { text: order_states[2], type: 'success' }],
  [3, { text: order_states[3], type: 'info' }],
])

export const amap_js_key = 'e5e46a8ca6baad8f8c9b5c52af11bed1'
export const amap_web_key = 'd8431c605765d95bc194bb1d76c4fe60'
