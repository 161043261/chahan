<!-- eslint-disable @typescript-eslint/ban-ts-comment -->
<script setup lang="ts">
import {
  h,
  provide,
  reactive,
  ref,
  onBeforeUnmount /** useTemplateRef */,
  // getCurrentInstance,
} from 'vue'
import { ElCol, ElRow, ElCard, ElTimeline, ElTimelineItem } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import RecursiveChild from './RecursiveChild.vue'
import { useChart, type ICustomEventOption } from '@/composables/use-chart.ts'
import getChartOption from './chart-option.ts'
import getChartOption2 from './chart-option2.ts'
import getChartOption3 from './chart-option3.ts'
import { revenueListApi } from '@/apis/dashboard.ts'
import type { IRevenueList, ITimeLineItem } from '@/types/dashboard.ts'
import VirtualList from '@/components/VirtualList.vue'
import bus from '@/utils/bus'
import { Refresh } from '@icon-park/vue-next'
import { commaSep } from '@/utils/comma-sep.ts'
import { useToast } from '@/components/toast/toast.ts'

//============================================
//                                           *
// > main.ts                                 *
// app.use(toastPlugin)                      *
//                                           *
// > DashboardIndex.vue                      *
// const appInstance = getCurrentInstance()  *
// const proxy = appInstance?.proxy          *
// proxy?.$toast.default('请等待')           *
// ----------------------------------------- *
// const toast = useToast('toast')           *
// toast.default('请等待')                   *
//                                           *
//============================================
//                                           *
// > main.ts                                 *
// const toast = createToast()               *
// app.provide('toast', readonly(toast))     *
//                                           *
// > DashboardIndex.vue                      *
// const toast = inject('toast')             *
// toast.default('请等待')                   *
// ----------------------------------------- *
// const toast = useToast2('toast')          *
// toast.default('请等待')                   *
//                                           *
//============================================

// ! getCurrentInstance 必须写在 setup 函数的最外层, 否则 appInstance 为 null
// const appInstance = getCurrentInstance()
// const proxy = appInstance?.proxy
// const toast = inject('toast') as IToast
const toast = useToast()

const userStore = useUserStore()
const { menuList } = storeToRefs(userStore)

const chartRef = ref<HTMLDivElement | null>(null)
const chartRef2 = ref<HTMLDivElement | null>(null)
const chartRef3 = ref<HTMLDivElement | null>(null)

const customEventConfigs: ICustomEventOption[] = [
  {
    evName: 'updateAxisPointer',
    handler: (event, chartInstance) => {
      const xAxisInfo = event.axesInfo?.[0]
      if (import.meta.env.DEV) {
        console.log(xAxisInfo?.value, chartInstance)
      }
    },
  },
]

const updateChart = useChart(chartRef, getChartOption, customEventConfigs)
const updateChart2 = useChart(chartRef2, getChartOption2)
const updateChart3 = useChart(chartRef3, getChartOption3)

//! 类型体操
type RevenueListData = IRevenueList['data']
type RevenueItem = RevenueListData[number]

//! 渲染函数
const renderFunc = (props: { item: RevenueItem; idx: number } /** { emit, slots } */) => {
  return h(
    /* HyperScript */ 'div',
    {
      style: {
        backgroundColor: props.idx % 2 === 0 ? '#ecfcca' : '#fff',
        display: 'flex',
        ['::-webkit-scrollbar']: {
          display: 'none !important',
        },
      },
    },
    [
      h(
        'div',
        {
          style: {
            width: '20%',
            textAlign: 'center',
          },
        },
        `${commaSep(props.item.revenue)}`,
      ),
      h(
        'div',
        {
          style: {
            width: '80%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          },
        },
        `${props.item.address}`,
      ),
    ],
  )
}

//! 异步组件
const fetchRevenueList = async () => (await revenueListApi()).data

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
bus.subscribe('http-response', (item: ITimeLineItem) => timelineList.unshift(item))

let timer: number | null = null

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
const handleClick = (idx: 0 | 1 | 2, callbacks: (() => void)[]) => {
  if (timer) {
    return
  }

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

const virtualListRef = ref /** <InstanceType<typeof VirtualList>> */()
const virtualListLength = ref<number>(0)

// provide
provide('virtual-list-length' /** key */, virtualListLength /** value */)
</script>

<template>
  <main>
    <ElRow :gutter="20">
      <ElCol :span="18">
        <ElCard class="h-[150px] !rounded-3xl">
          <template #header>
            <h1 class="text-[20px]">快捷方式</h1>
          </template>
          <!-- gap: 80px -->
          <div class="flex justify-center gap-[80px]">
            <RecursiveChild v-for="item of menuList" :key="item.url" :item="item"></RecursiveChild>
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
                :strokeWidth="3"
                class="cursor-pointer"
                :class="{ ['rotate-x']: animated && animatedIdx === 0 }"
                @click="handleClick(0, [updateChart, updateChart2])"
              />
            </div>
          </template>
          <ElRow>
            <ElCol :span="8">
              <div ref="chartRef" class="h-[400px] w-[100%]"></div>
            </ElCol>
            <ElCol :span="16">
              <div ref="chartRef2" class="h-[400px] w-[100%]"></div>
            </ElCol>
          </ElRow>
        </ElCard>

        <ElCard class="mt-[20px] !rounded-3xl">
          <template #header>
            <div class="flex items-center gap-[10px]">
              <h1 class="text-[20px]">营收排行榜, 数据量 {{ virtualListLength }}</h1>
              <Refresh
                theme="outline"
                size="24"
                fill="#333"
                :strokeWidth="3"
                class="cursor-pointer"
                :class="{ ['rotate-x']: animated && animatedIdx === 2 }"
                @click="handleClick(2, [() => virtualListRef?.updateLargeList()])"
              />
            </div>
          </template>
          <Suspense>
            <template #default>
              <VirtualList
                :item-height="50"
                :render-func="renderFunc"
                :height="400"
                :fetch-large-list="fetchRevenueList"
                ref="virtualListRef"
              ></VirtualList>
            </template>
            <template #fallback> </template>
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
                :strokeWidth="3"
                class="cursor-pointer"
                :class="{ ['rotate-x']: animated && animatedIdx === 1 }"
                @click="handleClick(1, [updateChart3])"
              />
            </div>
          </template>
          <div ref="chartRef3" class="h-[240px] w-[100%]"></div>
        </ElCard>

        <ElCard class="mt-[20px] h-[500px] !rounded-3xl">
          <ElTimeline class="overflow-auto">
            <ElTimelineItem
              v-for="timeline of timelineList"
              center
              :timestamp="formatter(timeline.timestamp)"
              :key="timeline.timestamp"
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
