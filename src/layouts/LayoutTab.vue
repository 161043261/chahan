<script setup lang="ts">
import { ElWatermark } from 'element-plus'

import { useUserStore } from '@/stores/user'
defineProps<{
  watermarked: boolean
}>()
const userStore = useUserStore()
</script>

<template>
  <!--! <RouterView>, <Transition> or <KeepAlive>. Use slot props instead -->
  <ElWatermark
    :content="watermarked ? userStore.username : ''"
    :font="{ fontSize: 28, fontFamily: 'Iosevka, YouYuan, Yuanti SC' }"
  >
    <RouterView v-slot="{ Component }">
      <!-- leave-active-class="animate__animated animate__fadeOutRight" -->
      <Transition enter-active-class="animate__animated animate__fadeInLeft">
        <!-- :include="[组件名数组]" -->
        <!-- 注意: @/views/operations/order_detail.tsx 是 tsx 文件, 不是 vue 文件
         需要在 defineComponent 时指定组件名 -->
        <KeepAlive :include="['ChahanRobot', 'OrderDetail']">
          <Component :is="Component"></Component>
        </KeepAlive>
      </Transition>
    </RouterView>
  </ElWatermark>
</template>

<style scoped lang="scss"></style>
