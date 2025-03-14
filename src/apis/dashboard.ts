import { Api } from '@/constants/apis'
import type { IChartData, IChartData2, IChartData3, ICountryList } from '@/types/dashboard'
import { get } from '@/utils/http'

async function chartDataApi(): Promise<IChartData> {
  return get(Api.ChartData)
}

async function chartDataApi2(): Promise<IChartData2> {
  return get(Api.ChartData2)
}

async function chartDataApi3(): Promise<IChartData3> {
  return get(Api.ChartData3)
}

async function countryListApi(): Promise<ICountryList> {
  return get(Api.CountryList)
}

export { chartDataApi, chartDataApi2, chartDataApi3, countryListApi }
