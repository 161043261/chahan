import adminMenu from '../assets/admin-menu.json'
import userMenu from '../assets/user-menu.json'

export const enum Api {
  Login = '/api/login',
  ChartData = '/api/chartData',
  ChartData2 = '/api/chartData2',
  ChartData3 = '/api/chartData3',
  RevenueList = '/api/revenueList',
  RobotQuery = '/api/robotQuery',
  RobotAdd = '/api/robotAdd',
  RobotDelete = '/api/robotDelete',
  RobotUpdate = '/api/robotUpdate',
  MarkerList = '/api/markerList',
  OrderQuery = '/api/orderQuery',
  OrderDelete = '/api/orderDelete',
}

export { adminMenu, userMenu }
