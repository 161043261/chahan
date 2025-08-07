import { Request as ExpressRequest, Response as ExpressResponse, NextFunction } from 'express'
import express from 'express'
import bodyParser from 'body-parser'
import { Api } from './constants'
import {
  chartDataFn,
  chartDataFn2,
  chartDataFn3,
  revenueListFn,
  loginFn,
  robotAddFn,
  robotDeleteFn,
  robotQueryFn,
  markerListFn,
  robotUpdateFn,
  orderQueryFn,
  orderDeleteFn,
} from './funcs'
import 'dotenv/config'
import { resolve } from 'node:path'
import { mockOrderList, mockRobotList } from './mock'
import { randNum } from './utils'
import { writeFileSync } from 'node:fs'

const app = express()

function cors(req: ExpressRequest, res: ExpressResponse, next: NextFunction) {
  console.log('[server] req.url:', req.url)
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'])
  res.header('Content-Type', 'application/json;charset=utf-8')
  // 预检 (pre-flight) 请求
  if (req.method.toLowerCase() === 'options') {
    res.sendStatus(204)
  } else {
    next()
  }
}

app.use(bodyParser.json({ limit: '100mb' }))
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))

app.use('', cors)
app.use(Api.Login, loginFn)
app.use(Api.ChartData, chartDataFn)
app.use(Api.ChartData2, chartDataFn2)
app.use(Api.ChartData3, chartDataFn3)
app.use(Api.RevenueList, revenueListFn)
app.use(Api.RobotQuery, robotQueryFn)
app.use(Api.RobotAdd, robotAddFn)
app.use(Api.RobotUpdate, robotUpdateFn)
app.use(Api.RobotDelete, robotDeleteFn)
app.use(Api.MarkerList, markerListFn)
app.use(Api.OrderQuery, orderQueryFn)
app.use(Api.OrderDelete, orderDeleteFn)

const port = process.env.PORT ?? 3000

function createJsonFiles() {
  console.log('[createJsonFiles] __dirname:', __dirname)
  const jsonPath = resolve(__dirname, './assets/robot-list.json')

  const robotList = mockRobotList(randNum(50, 100))
  // 定位到上海市静安区
  robotList[0].lat = 121.391229
  robotList[0].lng = 31.251326
  const jsonStr = JSON.stringify(robotList)
  writeFileSync(jsonPath, jsonStr, { encoding: 'utf8' })

  const jsonPath2 = resolve(__dirname, './assets/order-list.json')
  const orderList = mockOrderList(randNum(250, 500), robotList)
  const jsonStr2 = JSON.stringify(orderList)
  writeFileSync(jsonPath2, jsonStr2, { encoding: 'utf8' })
}

createJsonFiles()

app.listen(port, () => {
  console.log(`[server] http://localhost:${port}/`)
})
