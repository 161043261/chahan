<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { ElCard, ElCol, ElRow, ElInput, ElTree } from 'element-plus'
import type { ITreeNode } from '@/types/map'
import { addressListApi } from '@/apis/map'

onMounted(async () => {
  addrList.value = (await addressListApi()).data.list
})

const addrList = ref<ITreeNode[]>()
const addrStr = ref('')
const treeRef = ref<InstanceType<typeof ElTree>>()
watch(
  () => addrStr.value,
  (newStr: string /** , oldStr: string */) => {
    treeRef.value?.filter(newStr)
  },
)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nodeFilter = (value: string, data: { [key: string]: any }) => {
  if (!value) {
    return true
  }
  return data.label.includes(value)
}
</script>

<template>
  <main>
    <ElCard class="!rounded-3xl">
      <ElRow :gutter="20">
        <ElCol :span="6">
          <ElInput placeholder="请输入地址" v-model="addrStr"></ElInput>
          <ElTree ref="treeRef" :data="addrList" class="mt-[20px]" :filter-node-method="nodeFilter">
          </ElTree>
        </ElCol>

        <ElCol :span="18"></ElCol>
      </ElRow>
    </ElCard>
  </main>
</template>

<style scoped lang="scss"></style>
