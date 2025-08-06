import mockjs from 'mockjs'
import type { IRevenueList, IOrderList, IRobotList } from '../types'
import { randArr } from '../utils'

type IRevenueListData = IRevenueList['data']
const mockRevenueList = (
  amount: number,
): {
  revenueList: IRevenueListData
} => {
  return mockjs.mock({
    [`revenueList|${amount}`]: [
      {
        'id|+1': 1,
        address: '@county(true)',
        revenue: '@integer(1000000, 1000000000)',
      },
    ],
  })
}

const mockRobotList = (amount: number): IRobotList['data'] => {
  return mockjs.mock({
    [`robotList|${amount}`]: [
      {
        'id|+1': 1, // id: '@id()'
        'lng|28-30.6': 28,
        'lat|118-120.6': 118,
        'state|1-5': 1,
        'failureNum|0-200': 0,
        address: '@county(true)',
        name: '@word',
        admin: '@cname',
        email: '@email',
      },
    ],
  }).robotList
}

const mockOrderList = (amount: number, robotList: IRobotList['data']): IOrderList['data'] => {
  const robotIdArr = randArr(0, robotList.length, amount)
  const year = new Date().getFullYear()
  return mockjs
    .mock({
      [`orderList|${amount}`]: [
        {
          //! mockjs 语法
          id: "@string('number', 7)", // 7 位数字
          'state|1': [1, 2, 3], // 'state|1-3': 1,
          date: `@date('${year}-MM-dd')`,
          'robotId|1': robotIdArr,
        },
      ],
    })
    .orderList.map((item: IOrderList['data'][number]) => {
      item.robotName = robotList[item.robotId].name
      return item
    })
}

export { mockRevenueList, mockRobotList, mockOrderList }
