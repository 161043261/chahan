<script setup lang="ts">
import { robotQueryApi } from '@/apis/chahan'
import { orderQueryApi } from '@/apis/order'
import type { IOrderData } from '@/types/order'
import type { IRobotData } from '@/types/robot'
import { getDate } from '@/utils'
import { ElDescriptions, ElDescriptionsItem, ElImage, ElTag } from 'element-plus'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { orderId, robotId } = route.query
const orderData = ref<IOrderData>({
  id: '0',
  state: 0,
  robotId: 0,
  robotName: '',
  date: getDate(),
})

const robotData = ref<IRobotData>({
  id: 0,
  state: 0,
  name: '',
  failureNum: 0,
  admin: '',
  email: '',
  address: '',
})

onMounted(async () => {
  try {
    const p1 = orderQueryApi({ id: orderId as string }).then((res) => res.data.list)
    const p2 = robotQueryApi({ id: Number.parseInt(robotId as string) }).then(
      (res) => res.data.list,
    )
    const [orderData_, robotData_] = await Promise.all([p1, p2])
    orderData.value = orderData_[0]
    robotData.value = robotData_[0]
  } catch (err) {
    console.error(err)
  }
})
</script>

<template>
  <main>
    <ElCard class="!rounded-3xl">
      <template #header>
        <!-- 具名插槽 -->
        <slot name="header"> </slot>
      </template>
      <ElDescriptions
        title="Width vertical list"
        direction="vertical"
        border
        style="margin-top: 20px"
      >
        <ElDescriptionsItem :rowspan="2" :width="140" label="机器人图像" align="center">
          <ElImage
            style="width: 100px; height: 100px"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
        </ElDescriptionsItem>
        <ElDescriptionsItem label="机器人名字">{{ robotData.name }}</ElDescriptionsItem>
        <ElDescriptionsItem label="机器人状态">
          <ElTag size="large">{{ robotData.state }}</ElTag>
        </ElDescriptionsItem>
        <ElDescriptionsItem label="零件故障数">{{ robotData.failureNum }}</ElDescriptionsItem>
        <ElDescriptionsItem label="管理员名字">{{ robotData.admin }} </ElDescriptionsItem>
        <ElDescriptionsItem label="管理员邮箱">
          {{ robotData.email }}
        </ElDescriptionsItem>
      </ElDescriptions>
    </ElCard>
  </main>
</template>

<style scoped lang="css"></style>
