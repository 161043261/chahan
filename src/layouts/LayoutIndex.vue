<script setup lang="ts">
import { ElContainer, ElHeader, ElAside, ElMain } from 'element-plus'
import AsideMenu from '@/components/aside/AsideMenu.vue'
import HeaderIndex from '@/components/header/HeaderIndex.vue'
import LayoutTab from './LayoutTab.vue'
import { ref, useTemplateRef } from 'vue'
import bus from '@/utils/bus'

const watermarked = ref(false)

const tabContainerRef = useTemplateRef<InstanceType<typeof ElMain>>('tabContainerRef')
bus.subscribe('store-scrollTop', () => {
  sessionStorage.setItem('scroll-top', tabContainerRef.value?.$el.scrollTop.toString())
  tabContainerRef.value!.$el.scrollTop = 0
})
bus.subscribe('set-scrollTop', () => {
  tabContainerRef.value!.$el.scrollTop = Number.parseFloat(sessionStorage.getItem('scroll-top')!)
})
</script>

<template>
  <ElContainer>
    <ElAside class="!h-dvh !w-[200px] bg-white shadow-lg">
      <AsideMenu></AsideMenu>
    </ElAside>
    <ElContainer>
      <ElHeader class="z-10 !h-[10vh] !p-0">
        <HeaderIndex
          @switch-watermark="(isAlive: boolean) => (watermarked = isAlive)"
        ></HeaderIndex>
      </ElHeader>
      <ElMain class="!h-[90vh]" ref="tabContainerRef">
        <LayoutTab :watermarked="watermarked"></LayoutTab>
      </ElMain>
      <!-- <ElBacktop :right="100" :bottom="100" /> -->
    </ElContainer>
  </ElContainer>
</template>

<style scoped lang="scss">
/** 隐藏滚动条 */
.el-aside::-webkit-scrollbar {
  display: none;
}
</style>
