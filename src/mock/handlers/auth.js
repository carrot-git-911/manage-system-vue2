import { http, HttpResponse, delay } from 'msw'

const ok = (data, message = 'ok') =>
  HttpResponse.json({
    code: 200,
    message,
    data
  })

const fail = (code, message, data = null) =>
  HttpResponse.json({
    code,
    message,
    data
  })

export const authHandlers = [
  // 登录
  http.post('/api/auth/login', async ({ request }) => {
    await delay(300)
    const body = await request.json()
    const username = body?.username?.trim?.()
    const password = body?.password

    if (!username || !password) {
      return fail(400, '用户名或密码不能为空')
    }

    if (username !== 'admin' || password !== '123456') {
      return fail(401, '用户名或密码错误')
    }

    return ok(
      {
        token: 'mock-admin-token',
        userInfo: {
          username: 'admin',
          nickname: '管理员'
        }
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
