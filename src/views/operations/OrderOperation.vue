<script setup lang="ts">
import { ElCard, ElInput, ElSelect, ElInputNumber, ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import { name2icon } from '@/utils/icons'
import { orderQueryApi, orderDeleteApi } from '@/apis/order'
import type { IOrderData } from '@/types/order'
import { usePagination } from '@/hooks/usePagination'
import { order_states, order_state2text_and_type } from '@/constants'

const formData = reactive<{
  startDate?: string
  endDate?: string
  // 订单号
  id?: number
  // 订单状态
  state?: 0 | 1 | 2 | 3
  // 机器人 ID
  robotId?: number
  // 机器人名字
  robotName?: string
}>({})

const date = ref<[startDate: string, endDate: string]>(['', ''])
const handleChange = (newDate: typeof date.value) => {
  formData.startDate = newDate /* date.value */[0]
  formData.endDate = newDate /* date.value */[1]
}

const orderList = ref<IOrderData[]>()
const loading /** v-loading */ = ref(false)
const loadOrderList = async () => {
  loading.value = true
  const { list, total } = (
    await orderQueryApi({
      ...formData,
      ...pageInfo,
    })
  ).data
  orderList.value = list
  pageInfo.total = total!
  loading.value = false
}

const { handleCurrentChange, handleSizeChange, pageInfo } = usePagination(
  loadOrderList,
  10 /** initialPageSize */,
)

// const idArr: number[] = []
const handleDelete = async (id: number) => {
  const { code, message } = await orderDeleteApi({
    idArr: [id],
  })
  if (code === 200) {
    ElMessage.success({
      message,
      grouping: true,
    })
    loadOrderList()
  }
}
</script>

<template>
  <main>
    <ElCard class="!rounded-3xl">
      <div class="grid-container">
        <ElInput
          class="grid-input !w-[300px]"
          placeholder="请输入订单号"
          v-model="formData.id"
        ></ElInput>

        <ElSelect
          class="grid-select !w-[300px]"
          placeholder="请选择订单状态"
          v-model="formData.state"
        >
          <ElOption v-for="(state, idx) of order_states" :label="state" :value="idx" :key="state">
            <ElTag size="large" :type="order_state2text_and_type.get(idx)?.type">
              {{ state }}
            </ElTag>
          </ElOption>
        </ElSelect>

        <ElInputNumber
          class="grid-input-number !w-[300px]"
          placeholder="请输入机器人 ID"
          controls-position="right"
          v-model="formData.robotId"
        />

        <ElInput
          class="grid-input2 !w-[300px]"
          placeholder="请输入机器人名字"
          v-model="formData.robotName"
        ></ElInput>

        <ElDatePicker
          v-model="date"
          class="grid-date-picker !w-[300px]"
          type="daterange"
          range-separator="/"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="handleChange"
          value-format="YYYY-MM-DD"
        ></ElDatePicker>

        <div class="grid-buttons">
          <ElButton type="success">查询</ElButton>
          <ElButton type="default">重置</ElButton>
        </div>
      </div>
    </ElCard>

    <ElCard class="mt-[20px] !rounded-3xl">
      <ElRow>
        <ElButton type="success" :icon="name2icon.get('ExcelOne')">导出订单数据到 Excel</ElButton>
        <ElButton type="danger" :icon="name2icon.get('DeleteFive')">批量删除</ElButton>
      </ElRow>

      <ElRow class="mt-[20px]">
        <ElTable :data="orderList" class="w-[100%]" stripe v-loading="loading" table-layout="auto">
          <ElTableColumn label="订单号" prop="id"> </ElTableColumn>
          <ElTableColumn label="订单状态" prop="state">
            <template #default="tableData">
              <ElTag size="large" :type="order_state2text_and_type.get(tableData.row.state)?.type">
                {{ order_state2text_and_type.get(tableData.row.state)?.text }}
              </ElTag>
            </template>
          </ElTableColumn>
          <ElTableColumn label="机器人 ID" prop="robotId"> </ElTableColumn>
          <ElTableColumn label="机器人名字" prop="robotName"> </ElTableColumn>
          <ElTableColumn label="操作">
            <template #default="tableData">
              <ElButton type="success" @click="() => console.log(tableData.row)"> 详情 </ElButton>
              <ElPopconfirm title="确定删除吗" @confirm="handleDelete(tableData.row.id)">
                <template #reference>
                  <ElButton type="danger"> 删除 </ElButton>
                </template>
              </ElPopconfirm>
            </template>
          </ElTableColumn>
        </ElTable>

        <ElPagination
          v-model:current-page="pageInfo.pageNum"
          v-model:page-size="pageInfo.pageSize"
          :page-sizes="[10, 20, 30, 40]"
          size="default"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          class="mt-[20px]"
          @size-change="handleSizeChange /** (pageSize: number) => void */"
          @current-change="handleCurrentChange /** (pageNum: number) => void */"
        />
      </ElRow>
    </ElCard>
  </main>
</template>

<style scoped lang="scss">
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  // 指定隐式网格的行高
  grid-auto-rows: auto;
  // 设置列间距
  column-gap: 20px;
  // 设置行间距
  row-gap: 10px;
  // 等价于 gap: 10px 20px;

  // 定义区域, 配合 grid-area 使用
  grid-template-areas:
    'input        select date-picker'
    'input-number input2 buttons';
  // 网格项目水平居中
  justify-items: center;
  .grid-input {
    // 指定网格项目放在哪一个区域
    grid-area: input;
  }

  // #region
  .grid-select {
    grid-area: select;
  }

  .grid-input-number {
    grid-area: input-number;
  }

  .grid-input2 {
    grid-area: input2;
  }

  .grid-date-picker {
    grid-area: date-picker;
    grid-column-start: span 3;
  }

  .grid-buttons {
    grid-area: buttons;
  }
  // #endregion
}
</style>
