# Vue2后台管理系统开发规范与最佳实践

## 1. 项目结构规范

### 1.1 推荐的项目目录结构

```
manage-system-vue2/
├── public/                     # 静态资源
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── api/                    # API接口管理
│   │   ├── index.js           # API统一导出
│   │   ├── user.js            # 用户相关API
│   │   ├── data.js            # 数据相关API
│   │   └── auth.js            # 认证相关API
│   ├── assets/                 # 静态资源
│   │   ├── images/
│   │   ├── styles/
│   │   │   ├── index.scss     # 全局样式
│   │   │   ├── variables.scss # 样式变量
│   │   │   └── mixins.scss    # 样式混入
│   │   └── fonts/
│   ├── components/             # 公共组件
│   │   ├── common/            # 通用组件
│   │   │   ├── Layout/        # 布局组件
│   │   │   ├── Table/         # 表格组件
│   │   │   └── Form/          # 表单组件
│   │   └── business/          # 业务组件
│   ├── views/                  # 页面组件
│   │   ├── dashboard/         # 仪表盘
│   │   ├── user/              # 用户管理
│   │   ├── data/              # 数据管理
│   │   ├── settings/          # 系统设置
│   │   └── auth/              # 认证页面
│   ├── router/                 # 路由配置
│   │   ├── index.js
│   │   └── modules/           # 路由模块
│   ├── store/                  # Vuex状态管理
│   │   ├── index.js
│   │   ├── modules/           # 状态模块
│   │   │   ├── user.js
│   │   │   ├── app.js
│   │   │   └── permission.js
│   │   └── getters.js
│   ├── utils/                  # 工具函数
│   │   ├── request.js         # HTTP请求封装
│   │   ├── auth.js            # 认证工具
│   │   ├── validate.js        # 表单验证
│   │   └── index.js           # 通用工具
│   ├── mixins/                 # 混入
│   ├── directives/             # 自定义指令
│   ├── filters/                # 过滤器
│   ├── App.vue
│   └── main.js
├── tests/                      # 测试文件
├── .env.development           # 开发环境配置
├── .env.production            # 生产环境配置
├── vue.config.js              # Vue CLI配置
├── package.json
└── README.md
```

## 2. 编码规范

### 2.1 Vue组件规范

**组件命名规范：**

* 组件文件名使用PascalCase：`UserList.vue`

* 组件注册名使用kebab-case：`<user-list></user-list>`

* 组件内部name属性使用PascalCase：`name: 'UserList'`

**组件结构规范：**

```vue
<template>
  <div class="user-list">
    <!-- 模板内容 -->
  </div>
</template>

<script>
export default {
  name: 'UserList',
  components: {
    // 子组件
  },
  props: {
    // 属性定义
  },
  data() {
    return {
      // 数据定义
    }
  },
  computed: {
    // 计算属性
  },
  watch: {
    // 监听器
  },
  created() {
    // 生命周期钩子
  },
  methods: {
    // 方法定义
  }
}
</script>

<style lang="scss" scoped>
.user-list {
  // 样式定义
}
</style>
```

### 2.2 JavaScript编码规范

**变量命名：**

* 使用camelCase：`userName`, `userList`

* 常量使用UPPER\_SNAKE\_CASE：`API_BASE_URL`

* 私有变量使用下划线前缀：`_privateMethod`

**函数命名：**

* 动词开头：`getUserList()`, `handleSubmit()`, `validateForm()`

* 布尔值返回函数使用is/has前缀：`isValid()`, `hasPermission()`

**API调用规范：**

```javascript
// api/user.js
import request from '@/utils/request'

export function getUserList(params) {
  return request({
    url: '/api/users',
    method: 'get',
    params
  })
}

export function createUser(data) {
  return request({
    url: '/api/users',
    method: 'post',
    data
  })
}
```

### 2.3 CSS/SCSS规范

**样式组织：**

```scss
// variables.scss - 变量定义
$primary-color: #409EFF;
$success-color: #67C23A;
$warning-color: #E6A23C;
$danger-color: #F56C6C;

$font-size-base: 14px;
$font-size-large: 16px;
$font-size-small: 12px;

// mixins.scss - 混入定义
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

**BEM命名规范：**

```scss
.user-list {
  &__header {
    padding: 20px;
    border-bottom: 1px solid #eee;
  }
  
  &__content {
    padding: 20px;
  }
  
  &__item {
    margin-bottom: 10px;
    
    &--active {
      background-color: #f0f9ff;
    }
  }
}
```

## 3. 状态管理最佳实践

### 3.1 Vuex模块化

```javascript
// store/modules/user.js
const state = {
  token: '',
  userInfo: {},
  permissions: []
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
  },
  SET_PERMISSIONS(state, permissions) {
    state.permissions = permissions
  }
}

const actions = {
  async login({ commit }, loginForm) {
    try {
      const response = await login(loginForm)
      const { token } = response.data
      commit('SET_TOKEN', token)
      return response
    } catch (error) {
      throw error
    }
  },
  
  async getUserInfo({ commit }) {
    try {
      const response = await getUserInfo()
      const { userInfo, permissions } = response.data
      commit('SET_USER_INFO', userInfo)
      commit('SET_PERMISSIONS', permissions)
      return response
    } catch (error) {
      throw error
    }
  }
}

const getters = {
  isLoggedIn: state => !!state.token,
  hasPermission: state => permission => {
    return state.permissions.includes(permission)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
```

## 4. 路由管理最佳实践

### 4.1 路由配置

```javascript
// router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/components/common/Layout'

Vue.use(VueRouter)

// 静态路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/auth/Login'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/Index'),
        meta: { title: '仪表盘', icon: 'dashboard' }
      }
    ]
  }
]

// 动态路由
export const asyncRoutes = [
  {
    path: '/users',
    component: Layout,
    meta: { title: '用户管理', icon: 'user', roles: ['admin', 'manager'] },
    children: [
      {
        path: 'list',
        name: 'UserList',
        component: () => import('@/views/user/List'),
        meta: { title: '用户列表', roles: ['admin', 'manager'] }
      },
      {
        path: 'create',
        name: 'UserCreate',
        component: () => import('@/views/user/Create'),
        meta: { title: '创建用户', roles: ['admin'] }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRoutes
})

export default router
```

### 4.2 路由守卫

```javascript
// router/permission.js
import router from './index'
import store from '@/store'
import { getToken } from '@/utils/auth'

const whiteList = ['/login', '/404'] // 白名单

router.beforeEach(async (to, from, next) => {
  const hasToken = getToken()
  
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          const { roles } = await store.dispatch('user/getUserInfo')
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch (error) {
          await store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})
```

## 5. HTTP请求封装

```javascript
// utils/request.js
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    
    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      
      if (res.code === 401) {
        MessageBox.confirm('登录状态已过期，请重新登录', '确认登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
```

## 6. 性能优化建议

### 6.1 代码分割

```javascript
// 路由懒加载
const UserList = () => import('@/views/user/List')

// 组件懒加载
const LazyComponent = () => import('@/components/LazyComponent')
```

### 6.2 图片优化

```javascript
// 图片懒加载指令
Vue.directive('lazy', {
  bind(el, binding) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.src = binding.value
          observer.unobserve(el)
        }
      })
    })
    observer.observe(el)
  }
})
```

### 6.3 长列表优化

```vue
<template>
  <div class="virtual-list">
    <virtual-list
      :size="itemSize"
      :remain="remain"
      :bench="bench"
    >
      <item
        v-for="item in items"
        :key="item.id"
        :item="item"
      />
    </virtual-list>
  </div>
</template>
```

## 7. 测试规范

### 7.1 单元测试

```javascript
// tests/unit/components/UserList.spec.js
import { shallowMount } from '@vue/test-utils'
import UserList from '@/components/UserList.vue'

describe('UserList.vue', () => {
  it('renders user list correctly', () => {
    const users = [{ id: 1, name: 'John' }]
    const wrapper = shallowMount(UserList, {
      propsData: { users }
    })
    expect(wrapper.find('.user-item').exists()).toBe(true)
  })
})
```

### 7.2 E2E测试

```javascript
// tests/e2e/specs/login.js
describe('Login', () => {
  it('should login successfully', () => {
    cy.visit('/login')
    cy.get('[data-cy=username]').type('admin')
    cy.get('[data-cy=password]').type('password')
    cy.get('[data-cy=submit]').click()
    cy.url().should('include', '/dashboard')
  })
})
```

## 8. 部署配置

### 8.1 环境配置

```javascript
// .env.development
VUE_APP_BASE_API = 'http://localhost:3000'
VUE_APP_TITLE = '后台管理系统 - 开发环境'

// .env.production
VUE_APP_BASE_API = 'https://api.example.com'
VUE_APP_TITLE = '后台管理系统'
```

### 8.2 构建优化

```javascript
// vue.config.js
module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial'
          },
          elementUI: {
            name: 'chunk-elementUI',
            priority: 20,
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/
          }
        }
      }
    }
  }
}
```

