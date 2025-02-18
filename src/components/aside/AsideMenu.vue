<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import RecursiveChild from './RecursiveChild.vue'
import { ElMenu, ElScrollbar } from 'element-plus'
import { Rice } from '@icon-park/vue-next'
import { useRoute, useRouter } from 'vue-router'

const userStore = useUserStore()
const { menuList } = storeToRefs(userStore)
const route = useRoute()
const router = useRouter()
const handleClick = () => router.push({ name: 'Home' })
</script>

<template>
  <div
    class="flex h-[70px] cursor-pointer items-center justify-center gap-[10px] px-[10px]"
    @click="handleClick"
  >
    <Rice theme="two-tone" size="48" :fill="['#333', '#b8e986']" :strokeWidth="3" />
    <h1 class="text-[20px]">炒饭机器人</h1>
  </div>

  <ElScrollbar>
    <ElMenu class="menu !border-none" :router="true" :default-active="route.path">
      <RecursiveChild v-for="item of menuList" :key="item.url" :item="item"></RecursiveChild>
    </ElMenu>
  </ElScrollbar>
</template>

<style scoped lang="scss">
.menu {
  :deep(.is-active) {
    background-color: var(--chahan-green) !important;
    color: #fff;
    font-size: 16px;
    transition: all;
  }
}

:deep(.el-menu-item) {
  border-radius: 20px;
  &:hover {
    background-color: var(--chahan-green-light) !important;
  }
}

:deep(.el-sub-menu__title) {
  &:hover {
    background-color: var(--chahan-green-light) !important;
  }
}
</style>
