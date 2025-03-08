<script setup lang="ts">
import { ElCard, ElInput, ElSelect, ElInputNumber } from 'element-plus'
</script>

<template>
  <main>
    <ElCard class="!rounded-3xl">
      <div class="grid-container">
        <ElInput class="grid-input !w-[300px]" placeholder="请输入订单号"></ElInput>

        <ElSelect class="grid-select !w-[300px]" placeholder="请选择订单状态">
          <ElOption label="全部" :value="0"></ElOption>
          <ElOption label="进行中" :value="1"></ElOption>
          <ElOption label="已完成" :value="2"></ElOption>
          <ElOption label="已取消" :value="3"></ElOption>
        </ElSelect>

        <ElInputNumber
          class="grid-input-number !w-[300px]"
          placeholder="请输入机器人序号"
          controls-position="right"
        />

        <ElInput class="grid-input2 !w-[300px]" placeholder="请输入机器人名字"></ElInput>

        <ElDatePicker
          class="grid-date-picker !w-[300px]"
          type="daterange"
          range-separator="/"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        ></ElDatePicker>

        <div class="grid-buttons">
          <ElButton type="success">查询</ElButton>

          <ElButton type="default">重置</ElButton>
        </div>
      </div>
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
