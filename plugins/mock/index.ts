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

const mockMapList = (
  amount: number,
): /** ! 类型体操 */ (IRobotList['data'][number] & {
  lat: number
  lng: number
})[] => {
  return mockjs.mock({
    [`robotList|${amount}`]: [
      {
        'id|+1': 1, // id: '@id()'
        'lng|28-30.7': 30,
        'lat|118-120.7': 120,
        'state|1-5': 3,
        'failureNum|0-200': 100,
        address: '@county(true)',
        name: '@word',
        admin: '@cname',
        email: '@email',
      },
    ],
  }).robotList
  // .robotList.map((item) => ({
  //   ...item,
  //   state: randNum(0, 5) + 1,
  //   failureNum: randNum(0, 200),
  // }))
}

export { mockCountryList, mockRobotList, mockMapList }
