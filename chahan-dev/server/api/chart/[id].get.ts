import type { ChartData, ChartData2, ChartData3 } from '~/types/chart'
import type { Res } from '~/types/resp'
import { randArr, randNum } from '~/utils'

export default defineEventHandler(async (event) => {
  const chartId = Number.parseInt(event.context.params?.id ?? '')
  if (!Number.isInteger(chartId) || chartId <= 0 || chartId > 4) {
    throw createError({ message: 'chartId 错误' })
  }

  // 1 2 3 4
  switch (chartId) {
    case 1:
      return {
        msg: '获取营收比例成功',
        data: [
          { name: '炒饭A', value: randNum(1, 100) },
          { name: '炒饭B', value: randNum(1, 100) },
          { name: '炒饭C', value: randNum(1, 100) },
        ],
      } as Res<ChartData>

    case 2:
      return {
        msg: '获取充电信息成功',
        data: [
          { name: '充电功率', data: randArr(1, 100, 9) },
          { name: '充电时长', data: randArr(1, 100, 9) },
          { name: '充电量', data: randArr(1, 100, 9) },
        ],
      } as Res<ChartData2>

    case 3:
      return {
        msg: '获取五边形数据成功',
        data: randArr(1, 100, 5),
      } as Res<ChartData3>
  }
})
