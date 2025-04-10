import { randNum } from '~/utils'
import { mockRevenueList } from '../mock/revenue'
import type { Res } from '~/types/resp'
import type { IRevenueItem } from '~/types/dashboard'

export default defineEventHandler(async (/** event */) => {
  const amount = randNum(100_000, 200_000)
  const { revenueList } = mockRevenueList(amount)
  return {
    msg: '获取营收排行榜成功',
    data: revenueList,
  } as Res<IRevenueItem[]>
})
