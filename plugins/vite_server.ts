import { type Plugin } from 'vite'
import { Api } from './constants'
import {
  chartDataFn,
  chartDataFn2,
  chartDataFn3,
  chartDataFn4,
  countryListFn,
  loginFn,
  robotAddFn,
  robotDeleteFn,
  robotQueryFn,
  mapListFn,
  robotUpdateFn,
  orderQueryFn,
  orderDeleteFn,
} from './funcs'

export default function viteServer(): Plugin {
  return {
    name: 'vite-server',
    configureServer(server) {
      server.middlewares.use(Api.Login, loginFn)
      server.middlewares.use(Api.ChartData, chartDataFn)
      server.middlewares.use(Api.ChartData2, chartDataFn2)
      server.middlewares.use(Api.ChartData3, chartDataFn3)
      server.middlewares.use(Api.ChartData4, chartDataFn4)
      server.middlewares.use(Api.CountryList, countryListFn)
      server.middlewares.use(Api.RobotQuery, robotQueryFn)
      server.middlewares.use(Api.RobotAdd, robotAddFn)
      server.middlewares.use(Api.RobotUpdate, robotUpdateFn)
      server.middlewares.use(Api.RobotDelete, robotDeleteFn)
      server.middlewares.use(Api.MapList, mapListFn)
      server.middlewares.use(Api.OrderQuery, orderQueryFn)
      server.middlewares.use(Api.OrderDelete, orderDeleteFn)
    },
  }
}
