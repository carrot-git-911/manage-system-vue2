const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  isLoggedIn: (state) => state.user.isLoggedIn,
};
export default getters;
