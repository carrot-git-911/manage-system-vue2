import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'

const SUCCESS_CODE = 200

// 主请求实例，用于所有业务请求
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 仅用于刷新 Token 的独立实例，不挂载 401 重试等拦截器，避免刷新时再次进入拦截器造成死循环。
const refreshService = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 刷新 Token 请求拦截器
refreshService.interceptors.request.use(
  config => {
    const refreshToken = store.getters['user/refreshToken']
    if (refreshToken) {
      config.data = {
        ...(config.data || {}),
        refreshToken
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 刷新 Token 响应拦截器（返回 res.data 供 doRefresh 解析 payload）
refreshService.interceptors.response.use(
  res => {
    const { code, message } = res.data ?? {}
    if (code === SUCCESS_CODE) return res.data
    return Promise.reject(new Error(message || '刷新失败'))
  },
  err => Promise.reject(err)
)

// 刷新锁与队列
let isRefreshing = false
let refreshSubscribers = []

// 订阅刷新 Token 回调
function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb)
}

// 通知刷新 Token 完成
function onRefreshed(newToken) {
  refreshSubscribers.forEach(cb => cb(newToken))
  refreshSubscribers = []
}

function isTokenExpired(error) {
  const res = error.response
  if (!res) return false
  return res.status === 401 || (res.data && res.data.code === 401)
}

// 调用刷新接口，返回 { accessToken, refreshToken? } 或仅 accessToken 字符串
function doRefresh() {
  const refreshToken = store.getters['user/refreshToken']
  if (!refreshToken) return Promise.reject(new Error('无 refreshToken'))
  return refreshService.post('/auth/refresh').then(res => {
    const data = res?.data ?? res
    const payload = data?.data ?? data
    const accessToken = payload?.accessToken ?? payload?.token
    if (!accessToken) return Promise.reject(new Error('未返回 accessToken'))
    return payload
  })
}

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

// 主实例：响应拦截器（含 401 无感刷新、队列重放）
service.interceptors.response.use(
  response => {
    const { code, message, data } = response.data
    if (code === SUCCESS_CODE) {
      return data
    }
    Message.error(message || '请求失败')
    return Promise.reject(new Error(message || '请求失败'))
  },
  error => {
    const config = error.config

    // 标记了 _noRefresh 的请求（如登出）不触发刷新，直接提示并 reject
    if (config._noRefresh) {
      if (error.response && isTokenExpired(error)) {
        Message.error('登录已过期，请重新登录')
        store.dispatch('user/logout')
      } else {
        Message.error(error.response?.data?.message || error.message)
      }
      return Promise.reject(error)
    }

    // 非 401 或已重试过：统一错误提示并 reject
    if (!isTokenExpired(error) || config._retry) {
      if (error.response) {
        if (isTokenExpired(error)) {
          Message.error('登录已过期，请重新登录')
          store.dispatch('user/logout')
        } else {
          Message.error(error.response?.data?.message || error.message)
        }
      } else {
        Message.error(error.message || '网络异常')
      }
      return Promise.reject(error)
    }

    // 正在刷新：当前请求加入队列，刷新完成后用新 token 重放
    if (isRefreshing) {
      return new Promise(resolve => {
        subscribeTokenRefresh(newToken => {
          config.headers['Authorization'] = `Bearer ${newToken}`
          resolve(service(config))
        })
      })
    }

    // 首次 401：加锁并调刷新接口，成功后更新 Store、通知队列、重放当前请求
    config._retry = true
    isRefreshing = true

    return doRefresh()
      .then(payload => {
        const newToken =
          typeof payload === 'string' ? payload : payload?.accessToken
        store.dispatch('user/setToken', payload)
        onRefreshed(newToken)
        config.headers['Authorization'] = `Bearer ${newToken}`
        return service(config)
      })
      .catch(err => {
        Message.error('登录已过期，请重新登录')
        store.dispatch('user/logout')
        return Promise.reject(err)
      })
      .finally(() => {
        isRefreshing = false
      })
  }
)

export default service
