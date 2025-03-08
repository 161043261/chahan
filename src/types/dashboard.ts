export interface IResData {
  code: number
  message: string
}

export type IChartData = {
  data: {
    value: number
    name: string
  }[]
} & IResData

export type IChartData2 = {
  data: {
    name: string
    dataArr: number[]
  }[]
} & IResData

export type IChartData3 = {
  data: [number, number, number, number, number]
} & IResData

export type ICountryList = {
  data: {
    id: number
    address: string
    revenue: number
  }[]
} & IResData

export interface ITimeLineItem {
  timestamp: number
  message: string
}
