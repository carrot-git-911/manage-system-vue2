# MSW登录接口Mock实现方案

## 1. 项目概述

本文档详细介绍如何在Vue2后台管理系统中使用Mock Service Worker (MSW) 实现登录接口的模拟，提供完整的配置和实现方案。

## 2. MSW基础配置

### 2.1 项目结构

```
src/
├── mocks/
│   ├── handlers/
│   │   ├── auth.js          # 认证相关接口
│   │   └── index.js         # 导出所有handlers
│   ├── browser.js           # 浏览器环境MSW配置
│   └── data/
│       └── users.js         # 模拟用户数据
├── main.js
└── ...
```

### 2.2 初始化配置

#### 创建浏览器MSW实例 (`src/mocks/browser.js`)

```javascript
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// 创建MSW worker实例
export const worker = setupWorker(...handlers)

// 启动MSW的函数
export const startMocking = async () => {
  if (process.env.NODE_ENV === 'development' && process.env.VUE_APP_MOCK === 'true') {
    try {
      await worker.start({
        onUnhandledRequest: 'bypass', // 未处理的请求直接通过
        serviceWorker: {
          url: '/mockServiceWorker.js'
        }
      })
      console.log('🔶 MSW Mock服务已启动')
    } catch (error) {
      console.error('MSW启动失败:', error)
    }
  }
}
```

## 3. 登录接口Mock实现

### 3.1 模拟用户数据 (`src/mocks/data/users.js`)

```javascript
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
```

### 3.2 认证接口处理器 (`src/mocks/handlers/auth.js`)

```javascript
import { http, HttpResponse } from 'msw'
import { users, generateToken, verifyToken } from '../data/users'

// 模拟网络延迟
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

// 统一响应格式
const createResponse = (data = null, code = 200, msg = 'success') => {
  return HttpResponse.json({ code, msg, data })
}

export const authHandlers = [
  // 登录接口
  http.post('/api/auth/login', async ({ request }) => {
    await delay() // 模拟网络延迟
    
    const { username, password } = await request.json()
    
    // 参数验证
    if (!username || !password) {
      return createResponse(null, 400, '用户名和密码不能为空')
    }
    
    // 查找用户
    const user = users.find(u => u.username === username)
    if (!user) {
      return createResponse(null, 401, '用户不存在')
    }
    
    // 验证密码
    if (user.password !== password) {
      return createResponse(null, 401, '密码错误')
    }
    
    // 生成Token
    const token = generateToken(user)
    
    // 返回用户信息（不包含密码）
    const { password: _, ...userInfo } = user
    
    return createResponse({
      token,
      user: userInfo
    }, 200, '登录成功')
  }),
  
  // 获取用户信息接口
  http.get('/api/auth/userinfo', async ({ request }) => {
    await delay(200)
    
    const token = request.headers.get('token')
    if (!token) {
      return createResponse(null, 401, '未提供认证令牌')
    }
    
    const payload = verifyToken(token)
    if (!payload) {
      return createResponse(null, 401, '令牌无效或已过期')
    }
    
    const user = users.find(u => u.id === payload.id)
    if (!user) {
      return createResponse(null, 401, '用户不存在')
    }
    
    const { password: _, ...userInfo } = user
    return createResponse(userInfo)
  }),
  
  // 登出接口
  http.post('/api/auth/logout', async () => {
    await delay(200)
    return createResponse(null, 200, '登出成功')
  }),
  
  // 刷新Token接口
  http.post('/api/auth/refresh', async ({ request }) => {
    await delay(300)
    
    const token = request.headers.get('token')
    if (!token) {
      return createResponse(null, 401, '未提供认证令牌')
    }
    
    const payload = verifyToken(token)
    if (!payload) {
      return createResponse(null, 401, '令牌无效')
    }
    
    const user = users.find(u => u.id === payload.id)
    if (!user) {
      return createResponse(null, 401, '用户不存在')
    }
    
    // 生成新Token
    const newToken = generateToken(user)
    
    return createResponse({ token: newToken }, 200, 'Token刷新成功')
  })
]
```

### 3.3 导出所有处理器 (`src/mocks/handlers/index.js`)

```javascript
import { authHandlers } from './auth'

// 导出所有API处理器
export const handlers = [
  ...authHandlers,
  // 可以在这里添加其他模块的handlers
  // ...userHandlers,
  // ...productHandlers,
]
```

## 4. 项目集成

### 4.1 在main.js中初始化MSW

```javascript
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/styles/index.scss'

// 导入MSW启动函数
import { startMocking } from './mocks/browser'

Vue.config.productionTip = false
Vue.use(ElementUI)

// 启动MSW Mock服务
startMocking().then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
```

### 4.2 创建登录API服务 (`src/api/auth.js`)

```javascript
import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/api/auth/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getUserInfo() {
  return request({
    url: '/api/auth/userinfo',
    method: 'get'
  })
}

// 登出
export function logout() {
  return request({
    url: '/api/auth/logout',
    method: 'post'
  })
}

// 刷新Token
export function refreshToken() {
  return request({
    url: '/api/auth/refresh',
    method: 'post'
  })
}
```

### 4.3 在登录组件中使用

```javascript
// 在Login组件中
import { login } from '@/api/auth'

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true
      try {
        const response = await login(this.loginForm)
        
        // 存储token
        localStorage.setItem('token', response.data.token)
        
        // 存储用户信息到Vuex
        this.$store.commit('user/setUserInfo', response.data.user)
        
        this.$message.success('登录成功')
        this.$router.push('/dashboard')
      } catch (error) {
        this.$message.error(error.message || '登录失败')
      } finally {
        this.loading = false
      }
    }
  }
}
```

## 5. 高级功能

### 5.1 动态Mock数据管理

```javascript
// src/mocks/data/mockManager.js
class MockDataManager {
  constructor() {
    this.users = [...users] // 复制初始数据
  }
  
  // 添加用户
  addUser(user) {
    const newUser = {
      ...user,
      id: Math.max(...this.users.map(u => u.id)) + 1
    }
    this.users.push(newUser)
    return newUser
  }
  
  // 更新用户
  updateUser(id, updates) {
    const index = this.users.findIndex(u => u.id === id)
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updates }
      return this.users[index]
    }
    return null
  }
  
  // 删除用户
  deleteUser(id) {
    const index = this.users.findIndex(u => u.id === id)
    if (index !== -1) {
      return this.users.splice(index, 1)[0]
    }
    return null
  }
  
  // 重置数据
  reset() {
    this.users = [...users]
  }
}

export const mockDataManager = new MockDataManager()
```

### 5.2 错误场景模拟

```javascript
// 在auth.js中添加错误场景
const errorScenarios = {
  networkError: false,
  serverError: false,
  slowNetwork: false
}

// 可以通过控制台动态控制
window.mockConfig = errorScenarios

export const authHandlers = [
  http.post('/api/auth/login', async ({ request }) => {
    // 模拟网络错误
    if (errorScenarios.networkError) {
      return HttpResponse.error()
    }
    
    // 模拟服务器错误
    if (errorScenarios.serverError) {
      return createResponse(null, 500, '服务器内部错误')
    }
    
    // 模拟慢网络
    if (errorScenarios.slowNetwork) {
      await delay(3000)
    } else {
      await delay(500)
    }
    
    // ... 正常登录逻辑
  })
]
```

## 6. 开发和调试

### 6.1 MSW开发工具

```javascript
// 在浏览器控制台中可用的调试工具
if (process.env.NODE_ENV === 'development') {
  window.msw = {
    // 停止MSW
    stop: () => worker.stop(),
    
    // 重启MSW
    restart: () => worker.start(),
    
    // 查看当前handlers
    listHandlers: () => worker.listHandlers(),
    
    // 重置Mock数据
    resetData: () => mockDataManager.reset(),
    
    // 切换错误场景
    toggleError: (type) => {
      errorScenarios[type] = !errorScenarios[type]
      console.log(`${type} 错误场景:`, errorScenarios[type] ? '开启' : '关闭')
    }
  }
}
```

### 6.2 环境控制

在`.env.development`中控制MSW开关：

```env
# 开启Mock
VUE_APP_MOCK=true

# 关闭Mock，使用真实API
# VUE_APP_MOCK=false
```

### 6.3 调试技巧

1. **查看网络请求**：在浏览器开发者工具的Network面板中，MSW拦截的请求会显示为来自Service Worker

2. **控制台日志**：MSW会在控制台显示拦截的请求信息

3. **动态修改**：可以在运行时通过控制台修改Mock数据和行为

## 7. 最佳实践

### 7.1 数据一致性
- 保持Mock数据结构与真实API一致
- 使用TypeScript定义接口类型
- 定期同步API文档更新Mock

### 7.2 性能优化
- 合理设置网络延迟模拟
- 避免在Mock中执行复杂计算
- 使用懒加载减少初始化时间

### 7.3 团队协作
- 将Mock配置纳入版本控制
- 文档化所有Mock接口
- 建立Mock数据更新流程

## 8. 常见问题

### 8.1 MSW无法启动
- 检查`public/mockServiceWorker.js`文件是否存在
- 确认浏览器支持Service Worker
- 检查HTTPS/HTTP协议配置

### 8.2 请求未被拦截
- 确认请求URL与handler中的路径匹配
- 检查HTTP方法是否正确
- 验证MSW是否正常启动

### 8.3 Token验证问题
- 确保请求头中包含正确的token字段
- 检查token格式和过期时间
- 验证token解析逻辑

## 9. 总结

通过MSW实现的登录接口Mock方案具有以下优势：

- **非侵入性**：不需要修改现有业务代码
- **真实性**：在网络层面拦截，完全模拟真实API
- **灵活性**：支持动态配置和错误场景模拟
- **开发友好**：提供丰富的调试工具和控制选项

这套方案可以显著提升前端开发效率，特别适合在后端API尚未完成或需要离线开发的场景中使用。