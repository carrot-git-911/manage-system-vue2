const TokenKey = 'accessToken' // 登录 token 的 key

const state = {
  token: localStorage.getItem(TokenKey) || '',
  userInfo: null,
  permissions: []
}

const getters = {
  token: state => state.token,
  userInfo: state => state.userInfo,
  permissions: state => state.permissions
}

const mutations = {
  // 设置 Token
  SET_TOKEN(state, token) {
    state.token = token
    if (token) {
      localStorage.setItem(TokenKey, token)
    } else {
      localStorage.removeItem(TokenKey)
    }
  },
  // 重置 Token
  RESET_TOKEN(state) {
    state.token = ''
    localStorage.removeItem(TokenKey)
  },
  // 设置用户信息
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo || null
  },
  // 设置权限列表
  SET_PERMISSIONS(state, permissions) {
    state.permissions = Array.isArray(permissions) ? permissions : []
  },
  // 清理登录态
  RESET_AUTH_STATE(state) {
    state.token = ''
    state.userInfo = null
    state.permissions = []
    localStorage.removeItem(TokenKey)
  }
}

const actions = {
  // 设置 Token
  setToken({ commit }, payload) {
    commit('SET_TOKEN', payload)
  },
  // 设置用户信息
  setUserInfo({ commit }, payload) {
    commit('SET_USER_INFO', payload)
  },
  // 设置权限列表
  setPermissions({ commit }, payload) {
    commit('SET_PERMISSIONS', payload)
  },
  // 登录后统一写入登录态
  setLoginState({ commit }, payload) {
    const token = payload?.token || ''
    const userInfo = payload?.userInfo || null
    const permissions = Array.isArray(payload?.permissions)
      ? payload.permissions
      : userInfo?.permissions
    commit('SET_TOKEN', token)
    commit('SET_USER_INFO', userInfo)
    commit('SET_PERMISSIONS', permissions)
  },
  // 登出-清除登录态
  logout({ commit }) {
    commit('RESET_AUTH_STATE')
  }
}

export default {
  namespaced: true, // 命名空间，避免与其他模块的 mutations 冲突
  state,
  getters,
  mutations,
  actions
}
