const getters = {
  // 用户相关
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  isLoggedIn: (state) => state.user.isLoggedIn,
  // 应用相关
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  sidebarWidth: (state) => state.app.sidebarWidth,
};
export default getters;
