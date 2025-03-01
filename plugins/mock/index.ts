import mockjs from 'mockjs'
import type { ICountryList, IRobotList } from '../types'
import { randNum } from '../utils'
type ICountryListData = ICountryList['data']

const mockCountryList = (
  amount: number,
): {
  countryList: ICountryListData
} => {
  return mockjs.mock({
    [`countryList|${amount}`]: [
      {
        'id|+1': 1,
        address: '@county(true)',
      },
    ],
  })
}

const mockRobotList = (amount: number): IRobotList['data'] => {
  const robotList: IRobotList['data'] = mockCountryList(amount).countryList.map((item) => ({
    id: item.id,
    address: item.address,
    name: mockjs.Random.word(),
    state: randNum(0, 5) + 1,
    failureNum: randNum(0, 200),
    admin: mockjs.Random.cname(),
    email: mockjs.Random.email(),
  }))
  return robotList
}

export { mockCountryList, mockRobotList }
