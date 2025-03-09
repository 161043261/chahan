import type { IResData } from './dashboard'
export type { IResData }

export interface IOrderData {
  id: string
  state: 0 | 1 | 2 | 3
  robotId: number
  robotName: string
  date: string
}

export type IOrderList = {
  data: {
    list: IOrderData[]
    total: number
  }
} & IResData
