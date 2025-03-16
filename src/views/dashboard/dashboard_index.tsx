import { defineComponent, provide, reactive, ref, onBeforeUnmount } from 'vue'
import { ElCol, ElRow, ElCard, ElTimeline, ElTimelineItem } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import RecursiveChild from './RecursiveChild.vue'
import { useChart } from '@/composables/useChart.ts'
import getChartOption from './chart_option.ts'
import getChartOption2 from './chart_option2.ts'
import getChartOption3 from './chart_option3.ts'
import { countryListApi } from '@/apis/dashboard.ts'
import type { ICountryList, ITimeLineItem } from '@/types/dashboard.ts'
import VirtualList from '@/utils/VirtualList.vue'
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
    type CountryListData = ICountryList['data']
    type CountryItem = CountryListData[number]

    //! 异步组件
    const getCountryListData = async () => (await countryListApi()).data

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

    return (
      <div>
        <ElRow gutter={20}>
          <ElCol span={18}>
            <ElCard class="h-[150px] !rounded-3xl">
              {{
                header: () => <h1 class="text-[20px]">快捷方式</h1>,
              }}
              <div class="flex justify-center gap-[60px]">
                {menuList.value.map((item) => (
                  <RecursiveChild key={item.url} item={item}></RecursiveChild>
                ))}
              </div>
            </ElCard>

            <ElCard class="mt-[20px] h-[500px] !rounded-3xl">
              {{
                header: () => {
                  return (
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
                  )
                },
              }}
              <ElRow>
                
              </ElRow>
            </ElCard>
          </ElCol>
        </ElRow>
      </div>
    )
  },
})
