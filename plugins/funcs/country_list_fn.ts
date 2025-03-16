import { Connect } from 'vite'
import { ICountryList, IResData } from '../types'
import { mockCountryList } from '../mock'
import { randNum } from '../utils'

const countryListFn: Connect.NextHandleFunction = (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const countryListData = mockCountryList(randNum(100_000, 200_000) /** amount */)
  const resData: ICountryList & IResData = {
    code: 200,
    message: '获取营收排行榜成功',
    data: countryListData.countryList,
  }
  for (const item of resData.data) {
    item.revenue = randNum(1_000_000, 1_000_000_000)
  }
  resData.data.sort((a, b) => b.revenue! - a.revenue!)
  res.end(JSON.stringify(resData))
}

export default countryListFn
