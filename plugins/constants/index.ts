import adminMenu from '../assets/admin_menu.json'
import userMenu from '../assets/user_menu.json'

export const enum Api {
  Login = '/api/login',
  ChartData = '/api/chartData',
  ChartData2 = '/api/chartData2',
  ChartData3 = '/api/chartData3',
  ChartData4 = '/api/chartData4',
  CountryList = '/api/countryList',
  RobotQuery = '/api/robotQuery',
  RobotAdd = '/api/robotAdd',
  RobotDelete = '/api/robotDelete',
  RobotUpdate = '/api/robotUpdate',
  MarkerList = '/api/markerList',
  OrderQuery = '/api/orderQuery',
  OrderDelete = '/api/orderDelete',
  AddressList = '/api/addressList',
}

export { adminMenu, userMenu }
