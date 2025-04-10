//! useState<T>(init?: () => T | Ref<T>): Ref<T>
//! useState<T>(key: string, init?: () => T | Ref<T>): Ref<T>

import { onMounted, onUnmounted, type Ref } from 'vue'
import echarts, { type ECOption } from '~/utils/echarts'
import { LineChart } from 'echarts/charts'
echarts.use([LineChart])

export function useChart(
  elemRef: Ref<HTMLElement | null>,
  getChartOption: () => Promise<ECOption>,
) {
  let chartInstance: echarts.ECharts | null = null
  const initChart = async () => {
    if (elemRef.value) {
      chartInstance = echarts.init(elemRef.value, { ssr: true })
      chartInstance.setOption(await getChartOption())
    }
  }

  const resizeChart = () => {
    chartInstance?.resize()
  }

  const updateChart = async () => {
    chartInstance?.setOption(await getChartOption())
  }

  onMounted(() => {
    initChart()
    window.addEventListener('resize', resizeChart)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', resizeChart)
    chartInstance?.dispose() // 释放图表实例占用的资源
  })

  return updateChart
}
