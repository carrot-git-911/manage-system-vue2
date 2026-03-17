const TokenKey = 'accessToken'

const state = {
  token: localStorage.getItem(TokenKey) || ''
}

const getters = {
  token: state => state.token
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
  RESET_TOKEN(state) {
    state.token = ''
    localStorage.removeItem(TokenKey)
  }
}

const actions = {
  // 设置 Token
  setToken({ commit }, payload) {
    const accessToken =
      typeof payload === 'string'
        ? payload
        : payload?.accessToken || payload?.token
    if (accessToken) commit('SET_TOKEN', accessToken)
  },
  // 登出
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
