const state = {
  // 侧边栏折叠状态
  // isCollapse: false,
  sidebar: {
    opened: localStorage.getItem("sidebarStatus")
      ? !!+localStorage.getItem("sidebarStatus")
      : true,
    withoutAnimation: false,
  },
  // 设备类型
  device: "desktop",
  // 侧边栏宽度配置
  sidebarWidth: {
    opened: "210px",
    closed: "64px",
  },
};

const mutations = {
  /**
   * 切换侧边栏状态
   * @param {Object} state - 状态对象
   */
  TOGGLE_SIDEBAR: (state) => {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
    // 持久化存储用户偏好
    if (state.sidebar.opened) {
      localStorage.setItem("sidebarStatus", 1);
    } else {
      localStorage.setItem("sidebarStatus", 0);
    }
  },
  /**
   * 关闭侧边栏
   * @param {Object} state - 状态对象
   */
  CLOSE_SIDEBAR: (state) => {
    localStorage.setItem("sidebarStatus", 0);
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = true;
  },
  /**
   * 设置设备类型
   * @param {Object} state - 状态对象
   * @param {string} device - 设备类型 (desktop/mobile)
   */
  TOGGLE_DEVICE: (state, device) => {
    state.device = device;
  },
};

const actions = {
  /**
   * 切换侧边栏
   * @param {Object} context - Vuex上下文
   */
  toggleSideBar({ commit }) {
    commit("TOGGLE_SIDEBAR");
  },
  /**
   * 关闭侧边栏
   * @param {Object} context - Vuex上下文
   * @param {boolean} withoutAnimation - 是否禁用动画
   */
  closeSideBar({ commit }, { withoutAnimation }) {
    commit("CLOSE_SIDEBAR", withoutAnimation);
  },
  /**
   * 切换设备类型
   * @param {Object} context - Vuex上下文
   * @param {string} device - 设备类型
   */
  toggleDevice({ commit }, device) {
    commit("TOGGLE_DEVICE", device);
  },
};

const getters = {
  // 侧边栏状态
  sidebar: (state) => state.sidebar,
  // 设备类型
  device: (state) => state.device,
  // 侧边栏宽度
  sidebarWidth: (state) => state.sidebarWidth,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
