<script setup lang="ts">
import { ElCard, ElInput, ElSelect, ElInputNumber } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import { name2icon } from '@/utils/icons'
import { orderQueryApi } from '@/apis/order'

const formData = reactive<{
  startDate: string
  endDate: string
  // 订单号
  id: string
  // 订单状态
  state: 0 | 1 | 2 | 3
  // 机器人 ID
  robotId: number
  // 机器人名字
  robotName: string
}>({
  id: '',
  state: 0,
  robotId: 0,
  robotName: '',
  startDate: '',
  endDate: '',
})

const date = ref<[startDate: string, endDate: string]>(['', ''])
const handleChange = (newDate: typeof date.value) => {
  formData.startDate = newDate /* date.value */[0]
  formData.endDate = newDate /* date.value */[1]
}

onMounted(() =>
  orderQueryApi({
    pageNum: 1,
    pageSize: 0,
  }),
)
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
          <ElOption label="全部" :value="0"></ElOption>
          <ElOption label="进行中" :value="1"></ElOption>
          <ElOption label="已完成" :value="2"></ElOption>
          <ElOption label="已取消" :value="3"></ElOption>
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
        <ElTable>
          <ElTableColumn label="订单号" prop="id"> </ElTableColumn>
          <ElTableColumn label="订单状态" prop="state"> </ElTableColumn>
          <ElTableColumn label="机器人 ID" prop="robotId"> </ElTableColumn>
          <ElTableColumn label="机器人名字" prop="robotName"> </ElTableColumn>
          <ElTableColumn label="操作">
            <template #default="tableData">
              <ElButton type="success" @click="() => console.log(tableData.row)"> 详情 </ElButton>
              <ElPopconfirm title="确定删除吗" @confirm="() => console.log(tableData.row.id)">
                <template #reference>
                  <ElButton type="danger"> 删除 </ElButton>
                </template>
              </ElPopconfirm>
            </template>
          </ElTableColumn>
        </ElTable>
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
