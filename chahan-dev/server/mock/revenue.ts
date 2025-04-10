import mockjs from 'mockjs'
import type { IRevenueItem } from '~/types/dashboard'

export function mockRevenueList(amount: number): {
  revenueList: IRevenueItem[]
} {
  return mockjs.mock({
    [`revenueList|${amount}`]: [
      {
        'id|+1': 1,
        address: '@county(true)',
        revenue: '@integer(1000000, 1000000000)',
      },
    ],
  })
}
