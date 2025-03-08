import { Api } from '@/constants/apis'
import type { IOrderList, IResData } from '@/types/order'
import { get } from '@/utils/http'

export function orderQueryApi(params: {
  id?: number
  state?: 0 | 1 | 2 | 3
  robotId?: number
  robotName?: string
  startDate?: string
  endDate?: string
  pageNum: number
  pageSize: number
}): Promise<IOrderList> {
  return get(Api.OrderQuery, params)
}

export async function orderDeleteApi(params: { idArr: number[] }): Promise<IResData> {
  return get(Api.OrderDelete, params)
}
