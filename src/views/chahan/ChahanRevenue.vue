<script setup lang="ts">
import { useChart } from '@/hooks/useChart'
import { ElCard } from 'element-plus'
import { ref } from 'vue'
import getChartOption4 from './components/chart_option4'

const chartRef = ref<HTMLDivElement | null>(null)
// const chartRef = useTemplateRef('chartRef')
useChart(chartRef, getChartOption4)
</script>

<template>
  <main>
    <ElCard class="!rounded-3xl">
      <div ref="chartRef" class="h-[300px] w-[100%]"></div>
    </ElCard>
  </main>
</template>

<style scoped lang="css"></style>
