import type { IMenuItem } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 省略 children 属性的 IMenuItem 类型
type ITabItem = Omit<IMenuItem, 'children'>

export const useTabStore = defineStore('tab', () => {
  const tabList = ref<ITabItem[]>([
    {
      name: '数据看板',
      icon: 'DataScreen',
      url: '/dashboard',
    },
  ])

  const addTab = (name: string, icon: string, url: string) => {
    if (tabList.value.some((item) => url == item.url)) {
      return
    }
    tabList.value.push({ name, icon, url })
  }

  const currentTab = ref<{ name: string; url: string }>({
    name: '数据看板',
    url: '/dashboard',
  })
  const setCurrentTab = (name: string, url: string) => {
    currentTab.value = { name, url }
  }

  return {
    tabList,
    addTab,
    currentTab,
    setCurrentTab,
  }
})
