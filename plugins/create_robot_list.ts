import { type Plugin } from 'vite'
import path from 'node:path'
import fs from 'node:fs'
import { mockRobotList } from './mock'

export default function createRobotList(): Plugin {
  return {
    name: 'create-robot-list',
    configResolved() {
      const jsonPath = path.resolve(process.cwd(), './plugins/assets/robot_list.json')
      // if (fs.existsSync(jsonPath)) {
      //   return
      // }
      const robotList = mockRobotList(100)
      const jsonStr = JSON.stringify(robotList)
      fs.writeFileSync(jsonPath, jsonStr, {
        encoding: 'utf8',
      })
    },
  }
}
