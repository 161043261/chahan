import { type Plugin } from 'vite'
import path from 'node:path'
import fs from 'node:fs'
import { mockRobotList } from './mock'
import { randNum } from './utils'

export default function createRobotList(): Plugin {
  return {
    name: 'create-robot-list',
    configResolved() {
      const jsonPath = path.resolve(process.cwd(), './plugins/assets/robot_list.json')
      // if (fs.existsSync(jsonPath)) {
      //   return
      // }
      const robotList = mockRobotList(randNum(50, 100))
      robotList[0].lat = 121.391229
      robotList[0].lng = 31.251326
      const jsonStr = JSON.stringify(robotList)
      fs.writeFileSync(jsonPath, jsonStr, {
        encoding: 'utf8',
      })
    },
  }
}
