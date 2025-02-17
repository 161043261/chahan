import axios, { type AxiosInstance } from 'axios'
import { ElNotification } from 'element-plus'
import { h } from 'vue'

// axios 实例
const httpClient: AxiosInstance = axios.create({
  // todo: 将硬编码替换为环境变量
  baseURL: 'http://localhost:5173', // 路由前缀
  timeout: 5000, // 请求超时时间
})

// axios 请求拦截器
httpClient.interceptors.request.use(
  (config) => {
    // 等价于 return config
    return Promise.resolve(config)
  },
  (reqErr) => {
    if (import.meta.env.DEV) {
      console.log('@/utils/axios.ts: reqErr:', reqErr)
    }
    ElNotification({
      title: 'HTTP 请求错误',
      // todo: 将 class: 'text-red-500' 替换为 style: 'color: #fb2c36'
      message: h('p', { class: 'text-red-500' }, reqErr.message),
      type: 'error',
    })
    // 等价于 throw reqErr
    return Promise.reject(reqErr)
  },
)

// axios 响应拦截器
httpClient.interceptors.response.use(
  (res) => {
    if (import.meta.env.DEV) {
      console.log('@/utils/axios.ts: res:', res)
    }
    const { code, message: msg } = res.data
    if (code != 200) {
      ElNotification({
        title: '登录失败',
        // todo: 将 class: 'text-red-500' 替换为 style: 'color: #fb2c36'
        message: h('p', { class: 'text-red-500' }, msg),
        type: 'error',
      })
      throw msg
    }
    return res.data
  },
  (resErr) => {
    if (import.meta.env.DEV) {
      console.log('@/utils/axios.ts: resErr:', resErr)
    }
    ElNotification({
      title: 'HTTP 响应错误',
      // todo: 将 class: 'text-red-500' 替换为 style: 'color: #fb2c36'
      message: h('p', { class: 'text-red-500' }, resErr.message),
      type: 'error',
    })
    throw resErr.message
  },
)

export default httpClient
