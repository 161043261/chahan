export interface IResData {
  code: number
  message: string
}

export type IRobotList = {
  data: {
    list: IRobotData[]
    total: number
  }
} & IResData

export type IMapList = {
  data: {
    list: (IRobotData & {
      lat: number
      lng: number
    })[]
  }
} & IResData

interface IRobotData {
  id: number
  name: string
  address: string
  state:
    | 1 // 闲置
    | 2 // 使用
    | 3 // 故障
    | 4 // 维修
    | 5 // 报废
  failureNum: number
  admin: string
  email: string
}

export type { IRobotData }

export type IChartData4 = {
  data: {
    name: string
    dataArr: number[]
  }[]
} & IResData
