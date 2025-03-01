import type { IRobotList, IResData, IChartData4 } from '@/types/robot'
import { get } from '@/utils/http'

enum Api {
  RobotQuery = '/robotQuery',
  RobotAdd = '/robotAdd',
  RobotDelete = '/robotDelete',
  RobotUpdate = '/robotUpdate',
  ChartData4 = '/chartData4',
}

export async function robotQueryApi(params: {
  name?: string
  address?: string
  state?: 0 | 1 | 2 | 3 | 4 | 5
  pageNum: number
  pageSize: number
}): Promise<IRobotList> {
  return get(Api.RobotQuery, params)
}

export async function robotAddApi(params: {
  name: string
  address: string
  state: 1 | 2 | 3 | 4 | 5
  failureNum: number
  admin: string
  email: string
}): Promise<IResData> {
  return get(Api.RobotAdd, params)
}

export async function robotUpdateApi(params: {
  id: number
  address: string
  state: 1 | 2 | 3 | 4 | 5
  failureNum: number
  email: string
}): Promise<IResData> {
  return get(Api.RobotUpdate, params)
}

export async function robotDeleteApi(params: { id: number }): Promise<IResData> {
  return get(Api.RobotDelete, params)
}

export async function chartDataApi4(): Promise<IChartData4> {
  return get(Api.ChartData4)
}
