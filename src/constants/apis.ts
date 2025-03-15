const version = 'v1'

export enum Api {
  RobotQuery = `/api/${version}/robotQuery`,
  RobotAdd = `/api/${version}/robotAdd`,
  RobotDelete = `/api/${version}/robotDelete`,
  RobotUpdate = `/api/${version}/robotUpdate`,
  ChartData4 = `/api/${version}/chartData4`,
  ChartData = `/api/${version}/chartData`,
  ChartData2 = `/api/${version}/chartData2`,
  ChartData3 = `/api/${version}/chartData3`,
  CountryList = `/api/${version}/countryList`,
  MarkerList = `/api/${version}/markerList`,
  Login = `/api/${version}/login`,
  OrderQuery = `/api/${version}/orderQuery`,
  OrderDelete = `/api/${version}/orderDelete`,
  AddressList = `/api/${version}/addressList`,
}
