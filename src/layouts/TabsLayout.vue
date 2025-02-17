<script setup lang="ts">
import { useTabStore } from '@/stores/tab'
import { storeToRefs } from 'pinia'
import { ElTabs, ElTabPane, ElIcon, type TabsPaneContext, type TabPaneName } from 'element-plus'
import { Icons } from '@/utils/icons'
// import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'
const tabStore = useTabStore()
const { tabList } = storeToRefs(tabStore)

// actions 可以直接解构, 不需要 storeToRefs
// state, getters 不可以直接解构, 需要 storeToRefs
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

const handleRemove = (tabName /** url */ : TabPaneName) => {
  if (import.meta.env.DEV) {
    console.log(
      '@/layouts/TabsLayout.vue: handleRemove: tabName:',
      tabName,
      'typeof tabName:',
      typeof tabName,
    )
  }
}

const route = useRoute()
const activeName = ref<string>(route.path)
watch(
  () => route.path,
  () => {
    activeName.value = route.path
  },
)
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
  >
    <ElTabPane v-for="{ name, icon, url } of tabList" :key="url" :label="name" :name="url">
      <template #label>
        <div class="flex items-center gap-[5px]">
          <ElIcon>
            <component :is="Icons[icon]"></component>
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
  <RouterView></RouterView>
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
</style>
