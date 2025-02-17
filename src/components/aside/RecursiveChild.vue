<script setup lang="ts">
import { ElSubMenu, ElMenuItem, ElIcon } from 'element-plus'
import { type IMenuItem } from '@/types/user'
import { Icons } from '@/utils/icons'
import { useTabStore } from '@/stores/tab'
defineOptions({
  name: 'RecursiveChild',
})

defineProps<{
  item: IMenuItem
}>()

const tabStore = useTabStore()

// actions 可以直接解构, 不需要 storeToRefs
// state, getters 不可以直接解构, 需要 storeToRefs
const { addTab } = tabStore

const handleClick = (item: IMenuItem) => {
  const { name, icon, url } = item
  if (import.meta.env.DEV) {
    console.log(
      '@/components/aside/RecursiveChild: handleClick:\n',
      `name: ${name}\n`,
      `icon: ${icon}\n`,
      `url: ${url}\n`,
    )
  }
  addTab(name, icon, url)
}

// if (import.meta.env.DEV) {
//   tabStore.$subscribe((mutation, newState) => {
//     // debugger
//     console.log(mutation, newState);
//   } /** callback */,)
// }
</script>

<template>
  <ElSubMenu v-if="item.children" :index="item.url">
    <template #title>
      <ElIcon>
        <component :is="Icons.get(item.icon)"></component>
      </ElIcon>
      <span>{{ item.name }}</span>
    </template>
    <RecursiveChild v-for="child of item.children" :key="child.url" :item="child"></RecursiveChild>
  </ElSubMenu>

  <ElMenuItem
    v-else
    :index="item.url"
    v-show="item.url !== '/operation/detail'"
    @click="handleClick(item)"
  >
    <ElIcon>
      <component :is="Icons.get(item.icon)"></component>
    </ElIcon>
    <span>{{ item.name }}</span>
  </ElMenuItem>
</template>

<style scoped lang="scss"></style>
