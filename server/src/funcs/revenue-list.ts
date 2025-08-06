import { Request as ExpressRequest, Response as ExpressResponse } from 'express'
import { IRevenueList, IResData } from '../types'
import { mockRevenueList } from '../mock'
import { randNum } from '../utils'

export function revenueListFn(req: ExpressRequest, res: ExpressResponse) {
  res.setHeader('Content-Type', 'application/json')
  const revenueListData = mockRevenueList(randNum(100_000, 200_000) /** amount */)
  const resData: IRevenueList & IResData = {
    code: 200,
    message: '获取营收排行榜成功',
    data: revenueListData.revenueList,
  }
  resData.data.sort((a, b) => b.revenue! - a.revenue!)
  res.end(JSON.stringify(resData))
}

export default revenueListFn
