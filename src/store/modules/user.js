const TokenKey = 'accessToken'
const RefreshTokenKey = 'refreshToken'

const state = {
  token: localStorage.getItem(TokenKey) || '',
  refreshToken: localStorage.getItem(RefreshTokenKey) || ''
}

const getters = {
  token: state => state.token,
  refreshToken: state => state.refreshToken
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    if (token) {
      localStorage.setItem(TokenKey, token)
    } else {
      localStorage.removeItem(TokenKey)
    }
  },
  SET_REFRESH_TOKEN(state, refreshToken) {
    state.refreshToken = refreshToken
    if (refreshToken) {
      localStorage.setItem(RefreshTokenKey, refreshToken)
    } else {
      localStorage.removeItem(RefreshTokenKey)
    }
  },
  RESET_TOKEN(state) {
    state.token = ''
    state.refreshToken = ''
    localStorage.removeItem(TokenKey)
    localStorage.removeItem(RefreshTokenKey)
  }
}

const actions = {
  // 登录成功后写入双 Token（由登录页或 API 层调用）
  setTokens({ commit }, { accessToken, refreshToken }) {
    commit('SET_TOKEN', accessToken)
    commit('SET_REFRESH_TOKEN', refreshToken)
  },
  setToken({ commit }, payload) {
    const accessToken =
      typeof payload === 'string' ? payload : payload?.accessToken
    const refreshToken = payload?.refreshToken
    if (accessToken) commit('SET_TOKEN', accessToken)
    if (refreshToken) commit('SET_REFRESH_TOKEN', refreshToken)
  },
  logout({ commit }) {
    commit('RESET_TOKEN')
  }
}

export default {
  namespaced: true, // 命名空间，避免与其他模块的 mutations 冲突
  state,
  getters,
  mutations,
  actions
}
