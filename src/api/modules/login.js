import request from '@/utils/request'
// import store from '@/store'

/**
 * 登录
 * @param {Object} data 登录数据
 */
export const login = data => {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

/**
 * 登出
 */
export const logout = () => {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}
