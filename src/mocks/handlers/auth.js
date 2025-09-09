import { http, HttpResponse } from "msw";
import { users, generateToken, verifyToken } from "../data/user";

// 模拟网络延迟
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// 统一响应格式
const createResponse = (data = {}, code = 200, msg = "success") => {
  return HttpResponse.json({ code, msg, data });
};

export const authHandlers = [
  // 登录接口
  http.post("/api/auth/login", async ({ request }) => {
    await delay(); // 模拟网络延迟
    const { username, password } = await request.json();
    console.log(username, password);
    // 参数验证
    if (!username || !password) {
      return createResponse({}, 400, "用户名或密码不能为空");
    }
    // 查找用户
    const user = users.find((u) => u.username === username);
    if (!user) {
      return createResponse({}, 401, "用户不存在");
    }
    // 密码验证
    if (user.password !== password) {
      return createResponse({}, 401, "密码错误");
    }
    // 生成Token
    const token = generateToken(user);

    // 返回用户信息
    const { password: _, ...userInfo } = user;
    return createResponse(
      {
        token,
        user: userInfo,
      },
      200,
      "登录成功",
    );
  }),

  // 获取用户信息接口
  http.get("/api/auth/userinfo", async ({ request }) => {
    await delay(200);
    console.log(request);
    const token = request.headers.get("token");
    if (!token) {
      return createResponse({}, 401, "未提供认证令牌");
    }
    const payload = verifyToken(token);
    if (!payload) {
      return createResponse({}, 401, "无效或过期的令牌");
    }
    const user = users.find((u) => u.id === payload.id);
    if (!user) {
      return createResponse({}, 401, "用户不存在");
    }
    const { password: _, ...userInfo } = user;
    return createResponse(
      {
        user: userInfo,
      },
      200,
      "获取用户信息成功",
    );
  }),
  // 登出接口
  http.post("/api/auth/logout", async () => {
    await delay(200);
    return createResponse({}, 200, "登出成功");
  }),
  // 刷新Token接口
  http.post("/api/auth/refresh", async ({ request }) => {
    await delay(200);

    const token = request.headers.get("token");
    if (!token) {
      return createResponse({}, 401, "未提供认证令牌");
    }
    const payload = verifyToken(token);
    if (!payload) {
      return createResponse({}, 401, "无效或过期的令牌");
    }
    // 查找用户
    const user = users.find((u) => u.id === payload.id);
    if (!user) {
      return createResponse({}, 401, "用户不存在");
    }
    // 生成新Token
    const newToken = generateToken(user);
    return createResponse(
      {
        token: newToken,
      },
      200,
      "刷新Token成功",
    );
  }),
];
