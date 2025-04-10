//! useState<T>(init?: () => T | Ref<T>): Ref<T>
//! useState<T>(key: string, init?: () => T | Ref<T>): Ref<T>
import type { IMenuItem } from '~/types/user'

// 省略 children 属性的 IMenuItem 类型
type ITabItem = Omit<IMenuItem, 'children'>

const _useTabState = () => {
  return useState<ITabItem[]>('tab', () => {
    return [] as ITabItem[] // tabList
  })
}

const addTab = (name: string, icon: string, url: string) => {
  const tabList = _useTabState()
  if (tabList.value.some((tab) => tab.url === url)) {
    return
  }
  tabList.value.push({ name, icon, url })
}

const findTab = (url: string) => {
  const tabList = _useTabState()
  return tabList.value.findIndex((tab) => tab.url === url)
}

const removeTab = (idx: number) => {
  const tabList = _useTabState()
  tabList.value.splice(idx, 1)
}

export function useTabState() {
  const tabState = _useTabState()
  return {
    tabList: tabState,
    addTab,
    findTab,
    removeTab,
  }
}
