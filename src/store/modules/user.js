const TokenKey = 'accessToken' // 登录 token 的 key

const state = {
  token: localStorage.getItem(TokenKey) || ''
}

const getters = {
  token: state => state.token
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
  }
}

const actions = {
  // 设置 Token
  setToken({ commit }, payload) {
    commit('SET_TOKEN', payload)
  },
  // 登出-清除 Token
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
