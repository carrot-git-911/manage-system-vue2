import Mock from 'mockjs'

// 可选：模拟网络延迟
Mock.setup({
  timeout: '300-800'
})

// 模拟登录接口
Mock.mock(/\/auth\/login$/, 'post', config => {
  let body = {}
  try {
    body = JSON.parse(config.body || '{}')
  } catch (e) {
    body = {}
  }

  const { username, password } = body

  // 简单的账号密码校验逻辑，可按需修改
  if (username === 'admin' && password === '123456') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        token: 'mock-token-xxxx',
        userInfo: {
          id: 1,
          username: 'admin',
          nickname: '管理员',
          roles: ['admin']
        }
      }
    }
  }

  return {
    code: 40001,
    message: '用户名或密码错误',
    data: null
  }
})

// 模拟登出接口
Mock.mock(/\/auth\/logout$/, 'post', () => {
  return {
    code: 200,
    message: '退出成功',
    data: null
  }
})
