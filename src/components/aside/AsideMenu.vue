<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import RecursiveChild from './RecursiveChild.vue'
import { ElMenu, ElScrollbar } from 'element-plus'
import { Rice } from '@icon-park/vue-next'
import { useRoute } from 'vue-router'

const userStore = useUserStore()
const { menuList } = storeToRefs(userStore)
const route = useRoute()
</script>

<template>
  <div class="h-[70px] flex justify-center items-center px-[10px] gap-[10px]">
    <Rice theme="two-tone" size="48" :fill="['#333', '#b8e986']" :strokeWidth="3" />
    <h1 class="text-[20px]">炒饭机器人</h1>
  </div>

  <ElScrollbar>
    <ElMenu class="!border-none" :router="true" :default-active="route.path">
      <RecursiveChild v-for="item of menuList" :key="item.url" :item="item"></RecursiveChild>
    </ElMenu>
  </ElScrollbar>
</template>

<style scoped lang="scss">
:deep(.el-menu-item:hover) {
  background-color: var(--chahan-green-light) !important;
}

:deep(.el-sub-menu__title:hover) {
  background-color: var(--chahan-green-light) !important;
}

:deep(.is-active) {
  background-color: var(--chahan-green) !important;
  color: #fff;
  font-size: 16px;
}
</style>
