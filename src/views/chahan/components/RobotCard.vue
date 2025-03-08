<script setup lang="ts">
import { state_id2text_type } from '@/constants'
import { toRefs } from 'vue'

const props = defineProps<{
  stateId: 1 | 2 | 3 | 4 | 5
  failureNum: number
}>()
const { stateId, failureNum } = toRefs(props)
</script>

<template>
  <div
    class="bg-green-light grid-layout h-[250px] w-[350px] items-center justify-center !rounded-3xl duration-1000 hover:scale-110"
  >
    <div class="flex flex-col items-center justify-between">
      <ElTag size="large" :type="state_id2text_type.get(stateId)?.type" class="!text-[20px]">
        {{ state_id2text_type.get(stateId)?.text }}
      </ElTag>
      <img src="@/assets/robot.svg" alt="eva" width="100px" />
      <p>零件故障数</p>
      <p>{{ failureNum }}</p>
    </div>

    <!-- 默认插槽 -->
    <div>
      <slot name="default"></slot>
      <p :style="{ color: failureNum > 50 ? '#fb2c36' : '#fff' }">
        {{ failureNum > 50 ? '有预警' : '无预警' }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.grid-layout {
  display: grid; // 网格布局
  // grid-template-columns: 1fr 2fr;
  grid-template-columns: calc(100% / 3) calc(2 * (100% / 3));
}
</style>
