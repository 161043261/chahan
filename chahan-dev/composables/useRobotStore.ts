import type { IRobot } from '~/types/robot'

const _useRobotState = () => {
  return useState<IRobot>(
    'robot', // key
    () => ({
      id: 0, // id > 0
      name: '',
      address: '',
      state: 1,
      failureNum: 0,
      admin: '',
      email: '',
    }),
  )
}

// function setRowData(newRowData: IRobotData) {}
