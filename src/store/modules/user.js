import { login, getUserInfo, logout } from "@/api/auth";

const state = {
  token: localStorage.getItem("token") || null,
  userInfo: {},
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo;
  },
  CLEAR_USER_INFO: (state) => {
    state.token = null;
    state.userInfo = {};
  },
};

const actions = {
  async login({ commit }, loginForm) {
    try {
      const res = await login(loginForm);
      if (res.code === 200) {
        // 存储 token 到 localStorage
        const token = res.data?.token;
        if (token) {
          localStorage.setItem("token", token);
          commit("SET_TOKEN", token);
        }
        return { success: true, data: res.data };
      } else {
        return { success: false, message: res.msg || "登录失败" };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message || "网络错误，请稍后重试",
      };
    }
  },
  async getUserInfo({ commit, state }) {
    if (!state.token) {
      return { success: false, message: "未登录" };
    }
    try {
      const res = await getUserInfo();
      if (res.code === 200) {
        commit("SET_USER_INFO", res.data);
        return { success: true, data: res.data };
      } else {
        return { success: false, message: res.msg || "获取用户信息失败" };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message || "网络错误，请稍后重试",
      };
    }
  },
  // 登出
  async logout({ commit }) {
    try {
      await logout();
    } catch (error) {
      console.error("登出请求失败:", error);
    } finally {
      // 清除 localStorage 中的 token
      localStorage.removeItem("token");
      commit("CLEAR_USER_INFO");
    }
  },
};

const getters = {
  userInfo: (state) => state.userInfo,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
