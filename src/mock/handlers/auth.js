import { http, HttpResponse, delay } from 'msw'
import { findMockUser } from '../data/auth'

const ok = (data, message = 'ok', status = 200) =>
  HttpResponse.json(
    {
      code: 200,
      message,
      data
    },
    { status }
  )

const fail = (code, message, data = null, status = 400) =>
  HttpResponse.json(
    {
      code,
      message,
      data
    },
    { status }
  )

/** 密码正确后仍不允许登录的场景（与 mock/data 中 loginRestriction 对应） */
const LOGIN_RESTRICTION_RESPONSE = {
  session_expired: [40103, '登录已过期，请重新登录', 401],
  remote_login: [40104, '账号已在其他设备登录，请重新验证', 401],
  account_disabled: [40301, '账号已被禁用', 403],
  account_locked: [40302, '登录失败次数过多，账号已锁定', 403],
  login_rate_limited: [42901, '登录尝试过于频繁，请稍后再试', 429]
}

export const authHandlers = [
  // 登录
  http.post('/api/auth/login', async ({ request }) => {
    await delay(300)
    const body = await request.json()
    const username = body?.username?.trim?.()
    const password = body?.password

    if (!username) {
      return fail(40001, '请输入账号')
    }

    if (!password) {
      return fail(40002, '请输入密码')
    }

    const user = findMockUser(username)
    if (!user) {
      return fail(40101, '账号不存在', null, 401)
    }

    if (user.password !== password) {
      return fail(40102, '密码错误', null, 401)
    }

    if (user.loginRestriction) {
      const cfg = LOGIN_RESTRICTION_RESPONSE[user.loginRestriction]
      if (cfg) {
        return fail(cfg[0], cfg[1], null, cfg[2])
      }
    }

    return ok(
      {
        token: user.token,
        userInfo: user.userInfo
      },
      '登录成功'
    )
  }),
  // 登出
  http.post('/api/auth/logout', async () => {
    await delay(200)
    return ok(null, '退出成功')
  })
]
