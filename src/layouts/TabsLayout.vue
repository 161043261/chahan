<script setup lang="ts">
import { useTabStore } from '@/stores/tab'
import { storeToRefs } from 'pinia'
import {
  ElTabs,
  ElTabPane,
  ElIcon,
  type TabsPaneContext,
  type TabPaneName,
  ElWatermark,
} from 'element-plus'

import { name2icon } from '@/utils/icons'
// import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
const tabStore = useTabStore()
// actions 可以直接解构, 不需要 storeToRefs
// state, getters 不可以直接解构, 需要 storeToRefs
const { tabList } = storeToRefs(tabStore)
const router = useRouter()

const handleClick = (tab: TabsPaneContext) => {
  const { label: name, name: url } = tab.props
  // Number.parseInt('') === NaN
  const idx: number = Number.parseInt(tab.index ?? '')
  if (import.meta.env.DEV) {
    console.log(
      '@/layouts/TabsLayout.vue: handleClick:\n',
      `tabIndex: ${idx}\n`,
      `tabLabel(name): ${name}, ${tabList.value[idx].name}\n`,
      `tabName(url): ${url}, ${tabList.value[idx].url}\n`,
      `typeof url: ${typeof url}\n`,
    )
  }
  router.push(url as string)
}

const handleRemove = (url: TabPaneName) => {
  if (import.meta.env.DEV) {
    console.log(
      '@/layouts/TabsLayout.vue: handleRemove: tabName:',
      url,
      'typeof tabName:',
      typeof url,
    )
  }

  const idx = tabStore.findTab(url as string)
  tabStore.removeTab(idx)
  if (tabList.value.length === 0) {
    router.push({ name: 'Home' })
    return
  }
  if (tabList.value.length === idx) {
    router.push(tabList.value[idx - 1].url)
    return
  }
  router.push(tabList.value[idx].url)
}

const route = useRoute()
const activeName = ref<string>(route.path)
watch(
  () => route.path,
  () => {
    activeName.value = route.path
  },
)

const userStore = useUserStore()

const isShow = ref<boolean>(false)
const handleWindowClick = () => (isShow.value = false)
watch(
  () => isShow.value,
  () => {
    if (isShow.value) {
      addEventListener('click', handleWindowClick)
    } else {
      removeEventListener('click', handleWindowClick)
    }
  },
)

const ctxMenuX = ref<string>('0')
const ctxMenuY = ref<string>('0')
const handleCtxMenu = (ev: MouseEvent) => {
  ctxMenuX.value = `${ev.pageX}px`
  ctxMenuY.value = `${ev.pageY}px`
  isShow.value = true
}

const removeAll = () => {
  tabList.value = []
  router.push({ name: 'Home' })
}
</script>

<template>
  <!-- v-model="route.path" -->
  <ElTabs
    v-model="activeName"
    class="tabs"
    @tab-click="handleClick"
    type="card"
    closable
    @tab-remove="handleRemove"
    @contextmenu.prevent="handleCtxMenu"
  >
    <ElTabPane
      v-for="{ name, icon, url } of tabList"
      :key="url"
      :label="name"
      :name="url"
      class="rounded-lg"
    >
      <template #label>
        <div class="flex items-center gap-[5px]">
          <ElIcon>
            <component :is="name2icon.get(icon)"></component>
          </ElIcon>
          <span>{{ name }}</span>
        </div>
      </template>

      <!--! 这里有 v-for, <RouterView> 不能写在这里
      否则打开多个页面时, 有多个 <RouterView>, 同一个页面会被挂载多次
      如果是开发环境, 即 import.meta.env.DEV === true 时,
      '@/views/dashboard/DashboardIndex.vue: Mounted' 会被打印多次
      -->
      <!-- <RouterView></RouterView> -->
    </ElTabPane>
  </ElTabs>

  <!--! <RouterView> can no longer be used directly inside <Transition> or <KeepAlive>. Use slot props instead -->
  <ElWatermark :content="userStore.nickname" :font="{ fontSize: 28 }">
    <RouterView v-slot="{ Component }">
      <!-- leave-active-class="animate__animated animate__fadeOutUp" -->
      <Transition enter-active-class="animate__animated animate__fadeInDown"
        ><Component :is="Component"></Component
      ></Transition>
    </RouterView>
  </ElWatermark>

  <Transition
    enter-active-class="animated__animated animate__flipInX"
    leave-active-class="animated__animated animate__flipOutX"
  >
    <ul
      class="ctx-menu fixed z-10 inline-block rounded-lg bg-slate-100 text-sm text-slate-500 shadow-lg"
      v-show="isShow"
    >
      <li @click="removeAll">关闭全部标签页</li>
      <li @click="tabStore.removeTab(0)">关闭第一个标签页</li>
      <li @click="tabStore.removeTab(tabList.length - 1)">关闭最后一个标签页</li>
    </ul>
  </Transition>
</template>

<style scoped lang="scss">
.tabs {
  :deep(.is-active) {
    background-color: var(--chahan-green) !important;
    color: #fff !important;
  }
}

:deep(.el-tabs__item) {
  &:hover {
    color: #000 !important;
  }
}

.ctx-menu {
  left: v-bind(ctxMenuX);
  top: v-bind(ctxMenuY);
  li {
    border-radius: 8px;
    cursor: pointer;
    padding: 5px 8px;
    &:hover {
      background-color: #cad5e2;
    }
  }
}

:deep(.el-tabs__nav),
:deep(.el-tabs__item) {
  border-radius: 20px !important;
}

:deep(.is-icon-close) {
  transform: scale(1.5) !important;
  margin-left: 10px;
  &:hover {
    background-color: lightpink;
  }
}
</style>
