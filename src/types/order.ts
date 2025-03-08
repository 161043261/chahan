import type { IResData } from './dashboard'
export type { IResData }

export interface IOrderData {
  id: number
  state: 1 | 2 | 3
  robotId: number
  robotName: string
}

export type IOrderList = {
  data: {
    list: IOrderData[]
    total: number
  }
} & IResData
