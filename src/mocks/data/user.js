// 模拟用户数据库
export const users = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    name: '系统管理员',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://via.placeholder.com/64x64',
    permissions: ['user:read', 'user:write', 'user:delete']
  },
  {
    id: 2,
    username: 'user',
    password: '123456',
    name: '普通用户',
    email: 'user@example.com',
    role: 'user',
    avatar: 'https://via.placeholder.com/64x64',
    permissions: ['user:read']
  }
]

// 生成JWT Token的模拟函数
export const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
    exp: Date.now() + 24 * 60 * 60 * 1000 // 24小时过期
  }
  // 简单的base64编码模拟JWT
  return btoa(JSON.stringify(payload))
}

// 验证Token的模拟函数
export const verifyToken = (token) => {
  try {
    const payload = JSON.parse(atob(token))
    if (payload.exp < Date.now()) {
      return null // Token已过期
    }
    return payload
  } catch {
    return null // Token无效
  }
}