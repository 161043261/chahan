import adminMenu from '../assets/admin-menu.json'
import userMenu from '../assets/user-menu.json'
const version = 'v1'

export const enum Api {
  Login = `/api/${version}/login`,
  ChartData = `/api/${version}/chartData`,
  ChartData2 = `/api/${version}/chartData2`,
  ChartData3 = `/api/${version}/chartData3`,
  RevenueList = `/api/${version}/revenueList`,
  RobotQuery = `/api/${version}/robotQuery`,
  RobotAdd = `/api/${version}/robotAdd`,
  RobotDelete = `/api/${version}/robotDelete`,
  RobotUpdate = `/api/${version}/robotUpdate`,
  MarkerList = `/api/${version}/markerList`,
  OrderQuery = `/api/${version}/orderQuery`,
  OrderDelete = `/api/${version}/orderDelete`,
}

export { adminMenu, userMenu }
