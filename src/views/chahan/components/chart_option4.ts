/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ECOption } from '@/utils/echarts'
import { chartDataApi4 } from '@/apis/chahan'

const getChartOption4 = async () => {
  const chartData = await chartDataApi4()
  const chartOption: ECOption = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: [],
    },
    xAxis: {
      type: 'category',
      data: [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月',
      ],
    },
    yAxis: [
      {
        type: 'value',
        name: '出售',
        position: 'left',
      },
      {
        type: 'value',
        name: '出租',
        position: 'right',
      },
    ],
    series: [
      {
        name: '',
        type: 'bar',
        data: [],
        yAxisIndex: 0,
        itemStyle: {
          // -color-green: rgba(184, 233, 134); // #b8e986;
          color: '#b8e986',
        },
      },
      {
        name: '',
        type: 'line',
        data: [],
        yAxisIndex: 1,
        itemStyle: {
          // --color-1st: #3d8d7a;
          color: '#3d8d7a',
        },
        smooth: true,
      },
    ],
  }

  ;(chartOption.legend as any).data = chartData.data.map((item) => item.name)
  const { name, dataArr } = chartData.data[0]
  ;(chartOption.series as any)[0].name = name
  ;(chartOption.series as any)[0].data = dataArr

  const { name: name2, dataArr: dataArr2 } = chartData.data[1]
  ;(chartOption.series as any)[1].name = name2
  ;(chartOption.series as any)[1].data = dataArr2
  return chartOption
}

export default getChartOption4
