import './dashboard_index.scss'

import { defineComponent, provide, reactive, ref, onBeforeUnmount, Suspense } from 'vue'
import { ElCol, ElRow, ElCard, ElTimeline, ElTimelineItem, ElButton } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
// import RecursiveChild from './RecursiveChild.vue'
import RecursiveChild from './recursive_child'
import { useChart } from '@/composables/useChart.ts'
import getChartOption from './chart_option.ts'
import getChartOption2 from './chart_option2.ts'
import getChartOption3 from './chart_option3.ts'
import { revenueListApi } from '@/apis/dashboard.ts'
import type { IRevenueList, ITimeLineItem } from '@/types/dashboard.ts'
// import VirtualList from '@/components/VirtualList.vue'
import VirtualList from '@/components/virtual_list.tsx'
import bus from '@/utils/bus'
import { Refresh } from '@icon-park/vue-next'
import { commaSep } from '@/utils/comma_sep.ts'
import { useToast } from '@/components/toast/toast.ts'

export default defineComponent({
  setup() {
    const toast = useToast()

    const userStore = useUserStore()
    const { menuList } = storeToRefs(userStore)

    const chartRef = ref<HTMLDivElement | null>(null)
    const chartRef2 = ref<HTMLDivElement | null>(null)
    const chartRef3 = ref<HTMLDivElement | null>(null)

    const updateChart = useChart(chartRef, getChartOption)
    const updateChart2 = useChart(chartRef2, getChartOption2)
    const updateChart3 = useChart(chartRef3, getChartOption3)

    //! 类型体操
    type RevenueListData = IRevenueList['data']
    type RevenueItem = RevenueListData[number]

    const renderFunc = (props: { item: RevenueItem; idx: number }) => {
      return (
        <div
          class={['flex']}
          style={{
            backgroundColor: `${props.idx % 2 === 0 ? '#e8f9ff' : '#fff'}`,
          }}
        >
          <div class="w-[20%] text-center">{`${commaSep(props.item.revenue)}`}</div>
          <div class="w-[80%] truncate">{`${props.item.address}`}</div>
        </div>
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
    const virtualListSize = ref<number>(0)

    // provide
    provide('virtualListSize' /** key */, virtualListSize /** value */)

    ////////////////////////////////////
    const __debug_height = ref(400)
    const __debug_itemHeight = ref(50)
    ////////////////////////////////////

    return () => (
      <div>
        <ElRow gutter={20}>
          <ElCol span={18}>
            <ElCard class="h-[150px] !rounded-3xl">
              {{
                header: () => <h1 class="text-[20px]">快捷方式</h1>,
                default: () => (
                  <div class="flex justify-center gap-[60px]">
                    {menuList.value.map((item) => (
                      <RecursiveChild key={item.url} item={item}></RecursiveChild>
                    ))}
                  </div>
                ),
              }}
            </ElCard>

            <ElCard class="mt-[20px] h-[500px] !rounded-3xl">
              {{
                header: () => (
                  <div class="flex items-center gap-[10px]">
                    <h1 class="text-[20px]">炒饭机器人统计</h1>
                    <div onClick={() => handleClick(0, [updateChart, updateChart2])}>
                      <Refresh
                        theme="outline"
                        size={24}
                        fill="#333"
                        strokeWidth={3}
                        class={[
                          'cursor-pointer',
                          animated.value && animatedIdx.value === 0 ? 'rotate-x' : '',
                        ]}
                      ></Refresh>
                    </div>
                  </div>
                ),

                default: () => (
                  <ElRow>
                    <ElCol span={8}>
                      <div ref={chartRef} class="h-[400px] w-[100%]"></div>
                    </ElCol>
                    <ElCol span={16}>
                      <div ref={chartRef2} class="h-[400px] w-[100%]"></div>
                    </ElCol>
                  </ElRow>
                ),
              }}
            </ElCard>

            <ElCard class="mt-[20px] !rounded-3xl">
              {{
                header: () => (
                  <div class="flex items-center gap-[10px]">
                    <h1 class="text-[20px]">营收排行榜, 数据量 {virtualListSize.value}</h1>
                    <div
                      onClick={() =>
                        handleClick(2, [() => virtualListRef.value?.updateLargeList()])
                      }
                    >
                      <Refresh
                        theme="outline"
                        size={24}
                        fill="#333"
                        strokeWidth={3}
                        class={[
                          'cursor-pointer',
                          animated.value && animatedIdx.value === 2 ? 'rotate-x' : '',
                        ]}
                      ></Refresh>
                    </div>

                    {/* ************************************************** */}
                    {import.meta.env.DEV ? (
                      <>
                        <ElButton class="mx-[10px]" onClick={() => (__debug_height.value += 100)}>
                          height+=100
                        </ElButton>
                        <ElButton onClick={() => (__debug_itemHeight.value += 10)}>
                          itemHeight+=10
                        </ElButton>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                ),

                default: () => (
                  <Suspense>
                    {{
                      default: () => (
                        <VirtualList
                          itemHeight={__debug_itemHeight.value}
                          renderFunc={renderFunc}
                          height={__debug_height.value}
                          fetchLargeList={fetchRevenueList}
                          ref={virtualListRef}
                        ></VirtualList>
                      ),
                      fallback: () => '',
                    }}
                  </Suspense>
                ),
              }}
            </ElCard>
          </ElCol>

          <ElCol span={6}>
            <ElCard class="h-[370px] !rounded-3xl">
              {{
                header: () => (
                  <div class="flex items-center gap-[10px]">
                    <h1 class="text-[20px]">机器人五边形数据</h1>
                    <div onClick={() => handleClick(1, [updateChart3])}>
                      <Refresh
                        theme="outline"
                        size={24}
                        fill="#333"
                        strokeWidth={3}
                        class={[
                          'cursor-pointer',
                          animated.value && animatedIdx.value === 1 ? 'rotate-x' : '',
                        ]}
                      ></Refresh>
                    </div>
                  </div>
                ),

                default: () => <div ref={chartRef3} class="h-[240px] w-[100%]"></div>,
              }}
            </ElCard>
            <ElCard class="mt-[20px] h-[500px] !rounded-3xl">
              <ElTimeline class="overflow-auto">
                {timelineList.map((item) => (
                  <ElTimelineItem key={item.timestamp} timestamp={formatter(item.timestamp)} center>
                    <ElCard class="!rounded-xl">{item.message}</ElCard>
                  </ElTimelineItem>
                ))}
              </ElTimeline>
            </ElCard>{' '}
          </ElCol>
        </ElRow>
      </div>
    )
  },
})
