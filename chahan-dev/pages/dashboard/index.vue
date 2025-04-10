<script lang="tsx" setup>
import { ElCol, ElRow, ElCard, ElTimeline, ElTimelineItem } from 'element-plus'
import { useUserState } from '~/composables/useUserStore'
import RecursiveChild from '~/components/dashboard/RecursiveChild'
import { useChart } from '~/composables/useChart'
import getChartOption from './chart_option'
import getChartOption2 from './chart_option2'
import getChartOption3 from './chart_option3'
import type { IRevenueItem, ITimeLineItem } from '~/types/dashboard'
import VirtualList from '~/components/VirtualList'
// import bus from '~/utils/bus'
import { Refresh } from '@icon-park/vue-next'
import { commaSep } from '~/utils/comma_sep'
import toast from '~/utils/toast'

const userState = useUserState()
const { menuList } = userState

const chartRef = ref<HTMLDivElement | null>(null)
const chartRef2 = ref<HTMLDivElement | null>(null)
const chartRef3 = ref<HTMLDivElement | null>(null)

const updateChart = useChart(chartRef, getChartOption)
const updateChart2 = useChart(chartRef2, getChartOption2)
const updateChart3 = useChart(chartRef3, getChartOption3)

const renderFunc = (props: { item: IRevenueItem; idx: number }) => {
  return (
    <div
      class={['flex']}
      style={{
        backgroundColor: `${props.idx % 2 === 0 ? '#e8f9ff' : '#fff'}`,
      }}
    >
      <div class="w-[20%] text-center">{`${commaSep(props.item.revenue ?? 0)}`}</div>
      <div class="w-[80%] truncate">{`${props.item.address}`}</div>
    </div>
  )
}

const timelineList = reactive<ITimeLineItem[]>([
  /** { timestamp: Date.now(), message: '测试' } */
])

const formatter = (timestamp: number) => {
  const date = new Date(timestamp)
  const hh = date.getHours().toString().padStart(2, '0')
  const mm = date.getMinutes().toString().padStart(2, '0')
  const ss = date.getSeconds().toString().padStart(2, '0')
  return `${hh}:${mm}:${ss}`
}
// bus.subscribe('http-response', (item: ITimeLineItem) => timelineList.unshift(item))
let timer: null | number | NodeJS.Timeout = null

// 资源清理
onBeforeUnmount(() => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
})

const animated = ref<boolean>(false)
const animatedIdx = ref(0)

/**
 *
 * @param idx 索引
 * @param callbacks (多个) 回调函数
 * @description 节流 throttle
 */
const handleClick = async (idx: 0 | 1 | 2, callbacks: (() => void)[]) => {
  if (timer) {
    return
  }
  // const { default: toast } = await import('~/utils/toast')
  // proxy?.$toast.default('请等待')
  toast.default('请等待')

  animated.value = true
  animatedIdx.value = idx
  timer = setTimeout(() => {
    animated.value = false
    timer = null
    callbacks.forEach((cb) => cb())
  }, 2000)
}

const virtualListRef = ref<
  InstanceType<typeof VirtualList> & {
    updateLargeList: () => Promise<void>
  }
>()
const virtualListSize = ref<number>(0)

// provide
provide('virtualListSize' /** key */, virtualListSize /** value */)
</script>

<template>
  <main>
    <ElRow :gutter="20">
      <ElCol :span="18">
        <ElCard class="h-[150px] !rounded-3xl">
          <template #header>
            <h1 class="text-[20px]">快捷方式</h1>
          </template>
          <div class="flex justify-center gap-[80px]">
            <RecursiveChild v-for="item of menuList" :key="item.url" :item="item" />
          </div>
        </ElCard>

        <ElCard class="mt-[20px] h-[500px] !rounded-3xl">
          <template #header>
            <div class="flex items-center gap-[10px]">
              <h1 class="text-[20px]">炒饭机器人统计</h1>
              <Refresh
                theme="outline"
                size="24"
                fill="#333"
                :stroke-width="3"
                class="cursor-pointer"
                :class="{ ['rotate-x']: animated && animatedIdx === 0 }"
                @click="handleClick(0, [updateChart, updateChart2])"
              />
            </div>
          </template>
          <ElRow>
            <ElCol :span="8">
              <div ref="chartRef" class="h-[400px] w-[100%]" />
            </ElCol>
            <ElCol :span="16">
              <div ref="chartRef2" class="h-[400px] w-[100%]" />
            </ElCol>
          </ElRow>
        </ElCard>

        <ElCard class="mt-[20px] !rounded-3xl">
          <template #header>
            <div class="flex items-center gap-[10px]">
              <h1 class="text-[20px]">营收排行榜, 数据量 {{ virtualListSize }}</h1>
              <Refresh
                theme="outline"
                size="24"
                fill="#333"
                :stroke-width="3"
                class="cursor-pointer"
                :class="{ ['rotate-x']: animated && animatedIdx === 2 }"
                @click="handleClick(2, [() => virtualListRef?.updateLargeList()])"
              />
            </div>
          </template>
          <Suspense>
            <template #default>
              <VirtualList
                ref="virtualListRef"
                :item-height="50"
                :render-func="renderFunc"
                :height="400"
                :large-list-url="'/api/revenue'"
              />
            </template>
            <template #fallback />
          </Suspense>
        </ElCard>
      </ElCol>

      <ElCol :span="6">
        <ElCard class="h-[370px] !rounded-3xl">
          <template #header>
            <div class="flex items-center gap-[10px]">
              <h1 class="text-[20px]">机器人五边形数据</h1>
              <Refresh
                theme="outline"
                size="24"
                fill="#333"
                :stroke-width="3"
                class="cursor-pointer"
                :class="{ ['rotate-x']: animated && animatedIdx === 1 }"
                @click="handleClick(1, [updateChart3])"
              />
            </div>
          </template>
          <div ref="chartRef3" class="h-[240px] w-[100%]" />
        </ElCard>

        <ElCard class="mt-[20px] h-[500px] !rounded-3xl">
          <ElTimeline class="overflow-auto">
            <ElTimelineItem
              v-for="timeline of timelineList"
              :key="timeline.timestamp"
              center
              :timestamp="formatter(timeline.timestamp)"
            >
              <ElCard class="!rounded-xl">
                {{ timeline.message }}
              </ElCard>
            </ElTimelineItem>
          </ElTimeline>
        </ElCard>
      </ElCol>
    </ElRow>
  </main>
</template>

<style scoped lang="scss">
.rotate-x {
  animation: rotateX 2s linear;
}

@keyframes rotateX {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.rotate-y {
  animation: rotateY 2s linear infinite;
  // transform-style: preserve-3d;
}

@keyframes rotateY {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
}
</style>
