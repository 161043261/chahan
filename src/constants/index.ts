export const white_list = new Set<string>(['/login'])

export const robot_states = [
  '闲置' /** 1 */,
  '使用' /** 2 */,
  '故障' /** 3 */,
  '维修' /** 4 */,
  '报废' /** 5 */,
]

export const state_id2text_type = new Map<
  number,
  {
    text: (typeof robot_states)[number] // 也可以
    type: 'primary' | 'success' | 'info' | 'warning' | 'danger'
  }
>([
  [1, { text: '闲置', type: 'primary' }],
  [2, { text: '使用', type: 'success' }],
  [3, { text: '故障', type: 'info' }],
  [4, { text: '维修', type: 'warning' }],
  [5, { text: '报废', type: 'danger' }],
])
