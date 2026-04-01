const state = {
  accessibleRoutes: []
}

const getters = {
  accessibleRoutes: state => state.accessibleRoutes
}

const mutations = {
  SET_ROUTES(state, routes) {
    state.accessibleRoutes = Array.isArray(routes) ? routes : []
  }
}

const actions = {
  setRoutes({ commit }, routes) {
    commit('SET_ROUTES', routes)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
