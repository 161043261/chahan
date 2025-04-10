export const WHITE_LIST = ['/login', '/register']

export const ROBOT_STATES = [
  '全部' /** 0 */,
  '闲置' /** 1 */,
  '使用' /** 2 */,
  '故障' /** 3 */,
  '维修' /** 4 */,
  '报废' /** 5 */,
]

export const ORDER_STATES = [
  '全部' /** 0 */,
  '进行中' /** 1 */,
  '已完成' /** 2 */,
  '已取消' /** 3 */,
]

export const ROBOT_STATE2TEXT_AND_TYPE = new Map<
  number,
  {
    text: (typeof ROBOT_STATES)[number]
    type: 'primary' | 'success' | 'info' | 'warning' | 'danger'
  }
>([
  [1, { text: ROBOT_STATES[1], type: 'primary' }],
  [2, { text: ROBOT_STATES[2], type: 'success' }],
  [3, { text: ROBOT_STATES[3], type: 'info' }],
  [4, { text: ROBOT_STATES[4], type: 'warning' }],
  [5, { text: ROBOT_STATES[5], type: 'danger' }],
])

export const ORDER_STATE2TEXT_AND_TYPE = new Map<
  number,
  {
    text: (typeof ORDER_STATES)[number]
    type: 'primary' | 'success' | 'info'
  }
>([
  [1, { text: ORDER_STATES[1], type: 'primary' }],
  [2, { text: ORDER_STATES[2], type: 'success' }],
  [3, { text: ORDER_STATES[3], type: 'info' }],
])

export const AMAP_JS_KEY = 'e5e46a8ca6baad8f8c9b5c52af11bed1'
export const AMAP_WEB_KEY = 'd8431c605765d95bc194bb1d76c4fe60'
