<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script generic="T extends { id: number }" setup lang="ts">
import { computed, inject, reactive, ref, toRefs, type Ref, type VNode } from 'vue'

const props = defineProps<{
  height: number
  itemHeight: number
  fetchLargeList: () => Promise<T[]>
  renderFunc: (props: { item: T; idx: number }) => VNode
}>()

// 组件暴露接口
defineExpose<{
  updateLargeList: () => Promise<void>
}>({
  updateLargeList: async () => {
    largeList.value = await props.fetchLargeList()
    virtualListSize.value = largeList.value.length
  },
})

const virtualListSize = inject<Ref<number>>('virtualListSize', ref(0) /** defaultVal */)
// watchEffect(() => console.log(virtualListSize.value))

// 大列表
const largeList = ref(await props.fetchLargeList())
virtualListSize.value = largeList.value.length

// 可视区高度, 子项高度
const { height, itemHeight } = toRefs(props)

// 可视区子项数量
const visibleCnt = computed(() => {
  return Math.ceil(height.value / itemHeight.value)
})

// 可视区信息
const visibleInfo = reactive({
  startIdx: 0, // 起始索引
  endIdx: visibleCnt.value, // 结束索引
})

// 可视区数据
const visiblePartialList = computed(() => {
  return largeList.value.slice(
    visibleInfo.startIdx,
    Math.min(visibleInfo.endIdx, largeList.value.length),
  )
})

// 可视区起始偏移量
const startOffset = ref(0)

// 虚拟列表高度
const transform = computed(() => `translateY(${startOffset.value}px)`)
const fullHeight = computed(() => largeList.value.length * itemHeight.value)

const handleScroll = (ev: Event) => {
  const scrollTop = (ev.target as HTMLDivElement).scrollTop
  visibleInfo.startIdx = Math.floor(scrollTop / itemHeight.value)
  visibleInfo.endIdx = visibleInfo.startIdx + visibleCnt.value
  startOffset.value = scrollTop
}
</script>

<template>
  <!-- 可视区 container -->
  <div
    class="virtual-list relative overflow-auto bg-slate-50"
    @scroll="handleScroll"
    :style="{
      height: height + 'px',
    }"
  >
    <!-- 虚拟区, 用于触发 overflow-auto -->
    <div
      :style="{
        height: fullHeight + 'px',
      }"
    ></div>
    <!-- 内容区 -->
    <ul
      class="absolute top-0 left-0 w-full bg-white"
      :style="{
        transform,
      }"
    >
      <!-- ! truncate
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap; -->
      <li
        v-for="(item, idx) of visiblePartialList"
        :key="item.id"
        class="box-border rounded-lg"
        :style="{
          height: itemHeight + 'px',
          lineHeight: itemHeight + 'px',
        }"
      >
        <props.renderFunc :item="item as T" :idx="idx"></props.renderFunc>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.virtual-list::-webkit-scrollbar {
  display: none;
}
</style>
