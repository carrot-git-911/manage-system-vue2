import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'

const SUCCESS_CODE = 200

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
    if (process.env.NODE_ENV === 'development') {
      console.log(
        '[Request]',
        config.method?.toUpperCase(),
        config.url,
        config.params || config.data
      )
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
    console.log(response)
    if (process.env.NODE_ENV === 'development') {
      console.log('[Response]', response.data)
    }
    const { code, message, data } = response.data
    if (code === SUCCESS_CODE) {
      return data
    }
    Message.error(message || '请求失败')
    return Promise.reject(new Error(message || '请求失败'))
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default service
