<script setup lang="ts">
import { ref } from 'vue'
import { ElCol, ElRow, ElCard } from 'element-plus'
import { Refresh } from '@icon-park/vue-next'

const timeList = ref<number[]>([])

const getTime = () => {
  if (import.meta.env.DEV) {
    console.log('@/views/dashboard/DashboardIndex.vue: debounce')
  }
  const date = new Date()
  timeList.value = [date.getHours(), date.getMinutes(), date.getSeconds()]
}
getTime()

// 防抖 debounce
let timer: number | null = null
const refreshTime = () => {
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    getTime()
  }, 2000)
}

// 节流 throttle
const animated = ref<boolean>(false)
let timer2: number | null = null
const useAnimation = () => {
  if (timer2) {
    return
  }
  if (import.meta.env.DEV) {
    console.log('@/views/dashboard/DashboardIndex.vue: throttle')
  }
  animated.value = true
  timer2 = setTimeout(() => {
    animated.value = false
    timer2 = null
  }, 2000)
}

const handleClick = () => {
  refreshTime()
  useAnimation()
}
</script>

<template>
  <main>
    <ElRow>
      <ElCol :span="18">
        <ElCard class="!rounded-xl">
          <div class="flex items-center">
            <h1 class="text-[20px]">炒饭机器人运行状态</h1>
            <p class="text-slate-500 ml-[20px] mr-[10px]">
              更新时间 {{ `${timeList[0]}:${timeList[1]}:${timeList[2]}` }}
            </p>
            <Refresh
              theme="outline"
              size="20"
              fill="#333"
              :strokeWidth="3"
              class="hover:cursor-pointer"
              @click="handleClick"
              :class="{ refresh: animated }"
            />
          </div>
        </ElCard>
      </ElCol>
      <ElCol :span="6"></ElCol>
    </ElRow>
  </main>
</template>

<style scoped lang="scss">
@keyframes refreshAnimation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.refresh {
  animation: refreshAnimation 2s linear;
}
</style>
