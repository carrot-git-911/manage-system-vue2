import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'

// 主请求实例，用于所有业务请求
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    const token = store.getters['user/token']
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { code, message, data } = response.data
    if (code === 200) {
      return data
    }
    // HTTP 仍是 2xx（Axios成功），但 response.data.code !== 200（业务错误却用了成功 HTTP）时，视为业务错误
    Message.error(message || '请求失败')
    return Promise.reject(new Error(message || '请求失败'))
  },
  error => {
    const { code, message } = error?.response?.data || {}
    if (code === 40103) {
      // 登录已过期，请重新登录
    }
    Message.error(message || '请求失败')
    return Promise.reject(error)
  }
)

export default service
