import type { IRobotData } from '@/types/robot'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRobotStore = defineStore('robot', () => {
  const defaultRowData: IRobotData = {
    id: 0, // id > 0
    name: '',
    address: '',
    state: 0,
    failureNum: 0,
    admin: '',
    email: '',
  }

  // state
  const rowData = ref<IRobotData>(defaultRowData)

  // actions
  const setRowData = (newRowData: IRobotData) => {
    rowData.value = newRowData
  }

  const resetRowData = () => {
    rowData.value = defaultRowData
  }

  return {
    rowData,
    setRowData,
    resetRowData,
  }
})
