/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Res } from '~/types/resp'
import styles from './scrollbar.module.scss'

interface IProps<T> {
  height: number // 可视区高度
  itemHeight: number // 子项高度
  largeListUrl: string
  renderFunc: (props: { item: T; idx: number }) => VNode
}

export default defineComponent(
  async <T extends { id: number }>(props: IProps<T>, ctx: any) => {
    ctx.expose({
      updateLargeList: async () => {
        largeList.value = (await $fetch<Res<T[]>>(props.largeListUrl)).data ?? []
        virtualListSize.value = largeList.value.length
      },
    })

    const virtualListSize = inject<Ref<number>>('virtualListSize', ref(0) /** defaultVal */)
    const res = await $fetch<Res<T[]>>(props.largeListUrl)
    const largeList = ref(res?.data ?? [])
    virtualListSize.value = largeList.value.length

    // 可视区子项数量
    const visibleCnt = computed(() => {
      return Math.ceil(props.height / props.itemHeight)
    })
    // 可视区信息
    const visibleInfo = reactive({
      startIdx: 0, // 起始索引
      endIdx: visibleCnt.value, // 结束索引
    })
    // 可视区数据
    const visibleData = computed(() => {
      return largeList.value.slice(
        visibleInfo.startIdx,
        Math.min(visibleInfo.endIdx, largeList.value.length),
      )
    })
    // 可视区起始偏移量
    const startOffset = ref(0)
    // 虚拟列表高度
    const transform = computed(() => `translateY(${startOffset.value}px)`)
    const fullHeight = computed(() => largeList.value.length * props.itemHeight)

    const handleScroll = (ev: Event) => {
      const scrollTop = (ev.target as HTMLDivElement).scrollTop
      visibleInfo.startIdx = Math.floor(scrollTop / props.itemHeight)
      visibleInfo.endIdx = visibleInfo.startIdx + visibleCnt.value
      startOffset.value = visibleInfo.startIdx * props.itemHeight
    }
    return () => (
      <div
        class={[styles.virtualList, 'relative', 'overflow-auto', 'bg-slate-50']}
        onScroll={handleScroll}
        style={{
          height: props.height + 'px',
        }}
      >
        {/* 虚拟区, 用于触发 overflow-auto */}
        <div
          style={{
            height: fullHeight.value + 'px',
          }}
        ></div>
        {/* 内容区 */}
        <ul class="absolute left-0 top-0 w-full bg-white" style={{ transform: transform.value }}>
          {visibleData.value.map((item, idx) => (
            <li
              key={item.id}
              class="box-border rounded-lg"
              style={{ height: props.itemHeight + 'px', lineHeight: props.itemHeight + 'px' }}
            >
              <props.renderFunc item={item as T} idx={idx}></props.renderFunc>
            </li>
          ))}
        </ul>
      </div>
    )
  },
  {
    name: 'VirtualList',
    props: ['height', 'itemHeight', 'largeListUrl', 'renderFunc'],
  },
)
