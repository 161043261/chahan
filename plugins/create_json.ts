import type { Plugin } from 'vite'
import path from 'node:path'
import fs from 'node:fs'
import { mockOrderList, mockRobotList } from './mock'
import { randNum } from './utils'
import { pcTextArr, pcaTextArr } from 'element-china-area-data'

export default function createJsonFiles(): Plugin {
  return {
    name: 'create-json-files',
    configResolved() {
      const jsonPath = path.resolve(process.cwd(), './plugins/assets/robot_list.json')

      const robotList = mockRobotList(randNum(50, 100))
      // 定位到上海市静安区
      robotList[0].lat = 121.391229
      robotList[0].lng = 31.251326
      const jsonStr = JSON.stringify(robotList)
      fs.writeFileSync(jsonPath, jsonStr, { encoding: 'utf8' })

      const jsonPath2 = path.resolve(process.cwd(), './plugins/assets/order_list.json')
      const orderList = mockOrderList(randNum(250, 500), robotList)
      const jsonStr2 = JSON.stringify(orderList)
      fs.writeFileSync(jsonPath2, jsonStr2, { encoding: 'utf8' })

      const jsonPath3 = path.resolve(process.cwd(), './plugins/assets/pca_list.json')
      if (!fs.existsSync(jsonPath3)) {
        const jsonStr3 = JSON.stringify(pcaTextArr)
        fs.writeFileSync(jsonPath3, jsonStr3, { encoding: 'utf8' })
      }

      const jsonPath4 = path.resolve(process.cwd(), './src/assets/pc_list.json')
      if (!fs.existsSync(jsonPath4)) {
        const jsonStr4 = JSON.stringify(pcTextArr)
        fs.writeFileSync(jsonPath4, jsonStr4, { encoding: 'utf8' })
      }
    },
  }
}
