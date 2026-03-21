/**
 * Mock 登录用户静态数据（仅 MSW 开发环境使用）
 *
 * roles：角色标识占位，后续与 RBAC / 路由 meta.roles 对齐
 * permissions：权限码占位，后续与按钮 v-permission、接口鉴权对齐
 * （建议使用 resource:action 风格，如 system:user:list）
 */

export const mockUsers = [
  {
    username: 'admin',
    password: '123456',
    token: 'mock-admin-token',
    userInfo: {
      userId: 'mock-u-1',
      username: 'admin',
      nickname: '系统管理员',
      avatar: '',
      roles: ['super_admin'],
      // 超级管理员占位：前端权限守卫可约定 * 表示全部
      permissions: ['*']
    }
  },
  {
    username: 'editor',
    password: '123456',
    token: 'mock-editor-token',
    userInfo: {
      userId: 'mock-u-2',
      username: 'editor',
      nickname: '内容编辑',
      avatar: '',
      roles: ['editor'],
      permissions: [
        'dashboard:view',
        'content:article:list',
        'content:article:detail',
        'content:article:create',
        'content:article:edit'
      ]
    }
  },
  {
    username: 'viewer',
    password: '123456',
    token: 'mock-viewer-token',
    userInfo: {
      userId: 'mock-u-3',
      username: 'viewer',
      nickname: '只读访客',
      avatar: '',
      roles: ['viewer'],
      permissions: [
        'dashboard:view',
        'content:article:list',
        'content:article:detail'
      ]
    }
  },
  // 以下账号用于联调/演示异常登录场景（密码均为 123456）
  {
    username: 'demo_session_expired',
    password: '123456',
    token: 'mock-never-issued',
    loginRestriction: 'session_expired',
    userInfo: {
      userId: 'mock-u-expired',
      username: 'demo_session_expired',
      nickname: '会话过期演示',
      avatar: '',
      roles: ['viewer'],
      permissions: ['dashboard:view']
    }
  },
  {
    username: 'demo_remote_login',
    password: '123456',
    token: 'mock-never-issued',
    loginRestriction: 'remote_login',
    userInfo: {
      userId: 'mock-u-remote',
      username: 'demo_remote_login',
      nickname: '异地登录演示',
      avatar: '',
      roles: ['viewer'],
      permissions: ['dashboard:view']
    }
  },
  {
    username: 'demo_account_disabled',
    password: '123456',
    token: 'mock-never-issued',
    loginRestriction: 'account_disabled',
    userInfo: {
      userId: 'mock-u-disabled',
      username: 'demo_account_disabled',
      nickname: '账号禁用演示',
      avatar: '',
      roles: ['viewer'],
      permissions: ['dashboard:view']
    }
  },
  {
    username: 'demo_login_locked',
    password: '123456',
    token: 'mock-never-issued',
    loginRestriction: 'account_locked',
    userInfo: {
      userId: 'mock-u-locked',
      username: 'demo_login_locked',
      nickname: '登录锁定演示',
      avatar: '',
      roles: ['viewer'],
      permissions: ['dashboard:view']
    }
  },
  {
    username: 'demo_rate_limited',
    password: '123456',
    token: 'mock-never-issued',
    loginRestriction: 'login_rate_limited',
    userInfo: {
      userId: 'mock-u-ratelimit',
      username: 'demo_rate_limited',
      nickname: '登录限流演示',
      avatar: '',
      roles: ['viewer'],
      permissions: ['dashboard:view']
    }
  }
]

/**
 * 按登录账号查找 mock 用户（大小写敏感）
 * @param {string} username
 * @returns {typeof mockUsers[number] | undefined}
 */
export function findMockUser(username) {
  if (!username) return undefined
  const key = String(username).trim()
  return mockUsers.find(u => u.username === key)
}
