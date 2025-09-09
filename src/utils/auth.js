const TOKEN_KEY = "token";
const UserInfoKey = "userInfo";

// ==================== Token 管理 ====================
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

// ==================== 用户信息管理 ====================
export function getUserInfo() {
  return JSON.parse(localStorage.getItem(UserInfoKey));
}

export function setUserInfo(userInfo) {
  localStorage.setItem(UserInfoKey, JSON.stringify(userInfo));
}

export function removeUserInfo() {
  localStorage.removeItem(UserInfoKey);
}