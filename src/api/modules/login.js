import request from '@/utils/request'
import store from '@/store'

/**
 * 登录（成功后双 Token 写入 Store，由 request 自动带 token，过期时无感刷新）
 */
export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  }).then(data => {
    const { accessToken, refreshToken } = data || {}
    if (accessToken) {
      store.dispatch('user/setTokens', { accessToken, refreshToken })
    }
    return data
  })
}

/**
 * 登出（_noRefresh: true 不触发 401 刷新，避免刷新死循环）
 */
export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post',
    _noRefresh: true
  }).finally(() => {
    store.dispatch('user/logout')
  })
}
