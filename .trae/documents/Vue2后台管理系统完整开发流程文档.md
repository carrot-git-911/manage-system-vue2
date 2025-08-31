# Vue2 + JavaScript 后台管理系统完整开发流程文档

## 目录
1. [项目初始化和环境搭建](#1-项目初始化和环境搭建)
2. [依赖安装与配置](#2-依赖安装与配置)
3. [项目结构规划](#3-项目结构规划)
4. [基础配置文件设置](#4-基础配置文件设置)
5. [路由配置](#5-路由配置)
6. [状态管理配置](#6-状态管理配置)
7. [API接口封装](#7-api接口封装)
8. [公共组件开发](#8-公共组件开发)
9. [页面开发](#9-页面开发)
10. [权限管理](#10-权限管理)
11. [样式和主题配置](#11-样式和主题配置)
12. [打包部署](#12-打包部署)

---

## 1. 项目初始化和环境搭建

### 1.1 环境要求
- Node.js >= 12.0.0
- npm >= 6.0.0 或 yarn >= 1.0.0

### 1.2 创建Vue2项目

```bash
# 安装Vue CLI（如果未安装）
npm install -g @vue/cli

# 创建项目
vue create manage-system-vue2

# 选择配置
# - Manually select features
# - 选择：Babel, Router, Vuex, CSS Pre-processors, Linter
# - Vue版本选择 2.x
# - 路由模式选择 history
# - CSS预处理器选择 Sass/SCSS
# - ESLint配置选择 Standard

# 进入项目目录
cd manage-system-vue2

# 启动开发服务器
npm run serve
```

### 1.3 验证项目创建
访问 `http://localhost:8080`，确保项目正常运行。

---

## 2. 依赖安装与配置

### 2.1 安装Element UI

```bash
# 安装Element UI
npm install element-ui

# 安装babel插件（按需引入）
npm install babel-plugin-component -D
```

### 2.2 配置Element UI

**在 `babel.config.js` 中配置按需引入：**

```javascript
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
}
```

**在 `src/plugins/element.js` 中引入组件：**

```javascript
import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Row,
  Col,
  Table,
  TableColumn,
  Pagination,
  Dialog,
  MessageBox,
  Message,
  Loading
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Loading.directive)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
Vue.prototype.$loading = Loading.service
```

**在 `src/main.js` 中引入：**

```javascript
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

### 2.3 安装其他必要依赖

```bash
# 安装axios用于HTTP请求
npm install axios

# 安装js-cookie用于cookie操作
npm install js-cookie

# 安装nprogress用于页面加载进度条
npm install nprogress

# 安装normalize.css用于样式重置
npm install normalize.css
```

---

## 3. 项目结构规划

### 3.1 创建项目目录结构

```
src/
├── api/                    # API接口
│   ├── index.js           # API统一导出
│   ├── user.js            # 用户相关API
│   └── request.js         # axios封装
├── assets/                # 静态资源
│   ├── images/            # 图片
│   └── styles/            # 样式文件
│       ├── index.scss     # 全局样式
│       ├── variables.scss # 样式变量
│       └── mixins.scss    # 样式混入
├── components/            # 组件
│   ├── common/            # 公共组件
│   │   ├── Layout/        # 布局组件
│   │   ├── Breadcrumb/    # 面包屑组件
│   │   └── Sidebar/       # 侧边栏组件
│   └── business/          # 业务组件
├── router/                # 路由
│   ├── index.js           # 路由配置
│   └── modules/           # 路由模块
├── store/                 # 状态管理
│   ├── index.js           # store入口
│   ├── getters.js         # getters
│   └── modules/           # store模块
│       ├── user.js        # 用户模块
│       └── app.js         # 应用模块
├── utils/                 # 工具函数
│   ├── auth.js            # 权限相关
│   ├── request.js         # 请求封装
│   └── validate.js        # 表单验证
├── views/                 # 页面
│   ├── login/             # 登录页
│   ├── dashboard/         # 仪表盘
│   └── user/              # 用户管理
├── App.vue                # 根组件
└── main.js                # 入口文件
```

### 3.2 创建基础文件

**创建 `src/assets/styles/index.scss`：**

```scss
@import 'normalize.css';
@import './variables.scss';
@import './mixins.scss';

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  height: 100vh;
}

.clearfix::after {
  content: '';
  display: table;
  clear: both;
}
```

**创建 `src/assets/styles/variables.scss`：**

```scss
// 颜色变量
$primary-color: #409EFF;
$success-color: #67C23A;
$warning-color: #E6A23C;
$danger-color: #F56C6C;
$info-color: #909399;

// 布局变量
$sidebar-width: 210px;
$header-height: 60px;

// 字体大小
$font-size-base: 14px;
$font-size-small: 12px;
$font-size-large: 16px;
```

---

## 4. 基础配置文件设置

### 4.1 环境配置

**创建 `.env.development`：**

```
# 开发环境
VUE_APP_BASE_API = '/dev-api'
VUE_APP_TITLE = '后台管理系统'
```

**创建 `.env.production`：**

```
# 生产环境
VUE_APP_BASE_API = '/prod-api'
VUE_APP_TITLE = '后台管理系统'
```

### 4.2 Vue配置

**创建 `vue.config.js`：**

```javascript
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/dev-api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/dev-api': ''
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}
```

---

## 5. 路由配置

### 5.1 基础路由配置

**修改 `src/router/index.js`：**

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/components/common/Layout'

Vue.use(VueRouter)

// 公共路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
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
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  }
]

// 动态路由
export const asyncRoutes = [
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: 'User',
    meta: { title: '用户管理', icon: 'user' },
    children: [
      {
        path: 'list',
        name: 'UserList',
        component: () => import('@/views/user/list'),
        meta: { title: '用户列表', icon: 'list' }
      },
      {
        path: 'add',
        name: 'UserAdd',
        component: () => import('@/views/user/add'),
        meta: { title: '添加用户', icon: 'add' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// 重置路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
```

### 5.2 路由守卫

**在 `src/utils/auth.js` 中创建权限工具：**

```javascript
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
```

**在 `src/router/index.js` 中添加路由守卫：**

```javascript
import store from '@/store'
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/404']

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          const { roles } = await store.dispatch('user/getInfo')
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch (error) {
          await store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
```

---

## 6. 状态管理配置

### 6.1 Store主文件

**修改 `src/store/index.js`：**

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission
  },
  getters
})

export default store
```

### 6.2 Getters配置

**创建 `src/store/getters.js`：**

```javascript
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes
}
export default getters
```

### 6.3 用户模块

**创建 `src/store/modules/user.js`：**

```javascript
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('验证失败，请重新登录。')
        }

        const { roles, name, avatar } = data

        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户登出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken()
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 移除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
```

---

## 7. API接口封装

### 7.1 Axios封装

**创建 `src/utils/request.js`：**

```javascript
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
      config.headers['X-Token'] = getToken()
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

    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm('您已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
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

### 7.2 API接口定义

**创建 `src/api/user.js`：**

```javascript
import request from '@/utils/request'

// 用户登录
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

// 用户登出
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

// 获取用户列表
export function getUserList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params
  })
}

// 添加用户
export function addUser(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

// 更新用户
export function updateUser(id, data) {
  return request({
    url: `/user/update/${id}`,
    method: 'put',
    data
  })
}

// 删除用户
export function deleteUser(id) {
  return request({
    url: `/user/delete/${id}`,
    method: 'delete'
  })
}
```

---

## 8. 公共组件开发

### 8.1 布局组件

**创建 `src/components/common/Layout/index.vue`：**

```vue
<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <sidebar />
    </div>
    <div class="main-container">
      <div class="header-container">
        <navbar />
      </div>
      <div class="content-container">
        <app-main />
      </div>
    </div>
  </div>
</template>

<script>
import { Sidebar, Navbar, AppMain } from './components'

export default {
  name: 'Layout',
  components: {
    Sidebar,
    Navbar,
    AppMain
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.app-wrapper {
  display: flex;
  height: 100vh;
  width: 100%;

  .sidebar-container {
    width: $sidebar-width;
    height: 100%;
    background-color: #304156;
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  }

  .main-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;

    .header-container {
      height: $header-height;
      background-color: #fff;
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    }

    .content-container {
      flex: 1;
      padding: 20px;
      background-color: #f0f2f5;
      overflow-y: auto;
    }
  }
}
</style>
```

### 8.2 侧边栏组件

**创建 `src/components/common/Layout/components/Sidebar/index.vue`：**

```vue
<template>
  <div class="sidebar">
    <div class="logo">
      <h2>{{ $store.getters.title || '管理系统' }}</h2>
    </div>
    <el-menu
      :default-active="activeMenu"
      :collapse="isCollapse"
      :unique-opened="false"
      :collapse-transition="false"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routes'
    ]),
    routes() {
      return this.permission_routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    isCollapse() {
      return !this.$store.getters.sidebar.opened
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100%;
  
  .logo {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #2b2f3a;
    
    h2 {
      color: #fff;
      margin: 0;
      font-size: 18px;
    }
  }
  
  .el-menu {
    border: none;
    height: calc(100% - 60px);
    width: 100% !important;
  }
}
</style>
```

### 8.3 导航栏组件

**创建 `src/components/common/Layout/components/Navbar/index.vue`：**

```vue
<template>
  <div class="navbar">
    <div class="left">
      <hamburger
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />
      <breadcrumb class="breadcrumb-container" />
    </div>
    <div class="right">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar">
          <span class="username">{{ name }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/profile">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/common/Breadcrumb'
import Hamburger from '@/components/common/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  
  .left {
    display: flex;
    align-items: center;
    
    .hamburger-container {
      margin-right: 20px;
    }
  }
  
  .right {
    .avatar-container {
      .avatar-wrapper {
        display: flex;
        align-items: center;
        cursor: pointer;
        
        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          margin-right: 8px;
        }
        
        .username {
          margin-right: 8px;
        }
      }
    }
  }
}
</style>
```

---

## 9. 页面开发

### 9.1 登录页面

**创建 `src/views/login/index.vue`：**

```vue
<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">后台管理系统</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <i class="el-icon-user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <i class="el-icon-lock" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <i :class="passwordType === 'password' ? 'el-icon-view' : 'el-icon-hide'" />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  width: 100%;
  background-color: #2d3a4b;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #eee;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }
}
</style>
```

### 9.2 仪表盘页面

**创建 `src/views/dashboard/index.vue`：**

```vue
<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎使用后台管理系统</div>
    
    <el-row :gutter="20" class="stats-row">
      <el-col :span="6">
        <el-card class="stats-card">
          <div class="stats-content">
            <div class="stats-icon user-icon">
              <i class="el-icon-user" />
            </div>
            <div class="stats-info">
              <div class="stats-number">1,234</div>
              <div class="stats-label">用户总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="6">
        <el-card class="stats-card">
          <div class="stats-content">
            <div class="stats-icon order-icon">
              <i class="el-icon-s-order" />
            </div>
            <div class="stats-info">
              <div class="stats-number">567</div>
              <div class="stats-label">订单总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="6">
        <el-card class="stats-card">
          <div class="stats-content">
            <div class="stats-icon sales-icon">
              <i class="el-icon-money" />
            </div>
            <div class="stats-info">
              <div class="stats-number">¥89,012</div>
              <div class="stats-label">销售额</div>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="6">
        <el-card class="stats-card">
          <div class="stats-content">
            <div class="stats-icon visit-icon">
              <i class="el-icon-view" />
            </div>
            <div class="stats-info">
              <div class="stats-number">3,456</div>
              <div class="stats-label">访问量</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 32px;
  
  .dashboard-text {
    font-size: 30px;
    line-height: 46px;
    margin-bottom: 30px;
  }
  
  .stats-row {
    margin-bottom: 20px;
  }
  
  .stats-card {
    .stats-content {
      display: flex;
      align-items: center;
      
      .stats-icon {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 20px;
        
        i {
          font-size: 24px;
          color: #fff;
        }
        
        &.user-icon {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        &.order-icon {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        
        &.sales-icon {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }
        
        &.visit-icon {
          background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
        }
      }
      
      .stats-info {
        .stats-number {
          font-size: 24px;
          font-weight: bold;
          color: #303133;
          margin-bottom: 5px;
        }
        
        .stats-label {
          font-size: 14px;
          color: #909399;
        }
      }
    }
  }
}
</style>
```

### 9.3 用户管理页面

**创建 `src/views/user/list.vue`：**

```vue
<template>
  <div class="user-list-container">
    <el-card>
      <!-- 搜索区域 -->
      <div class="search-area">
        <el-form :inline="true" :model="searchForm" class="search-form">
          <el-form-item label="用户名">
            <el-input v-model="searchForm.username" placeholder="请输入用户名" clearable />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="searchForm.email" placeholder="请输入邮箱" clearable />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="handleReset">重置</el-button>
            <el-button type="success" @click="handleAdd">添加用户</el-button>
          </el-form-item>
        </el-form>
      </div>
      
      <!-- 表格区域 -->
      <el-table
        v-loading="loading"
        :data="userList"
        border
        style="width: 100%"
      >
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">
              {{ scope.row.status === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- 分页区域 -->
      <div class="pagination-area">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pagination.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        />
      </div>
    </el-card>
    
    <!-- 用户表单对话框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="500px"
      @close="handleDialogClose"
    >
      <el-form
        ref="userForm"
        :model="userForm"
        :rules="userRules"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="userForm.phone" />
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!isEdit">
          <el-input v-model="userForm.password" type="password" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="userForm.status" placeholder="请选择状态">
            <el-option label="启用" :value="1" />
            <el-option label="禁用" :value="0" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, addUser, updateUser, deleteUser } from '@/api/user'

export default {
  name: 'UserList',
  data() {
    return {
      loading: false,
      userList: [],
      searchForm: {
        username: '',
        email: ''
      },
      pagination: {
        page: 1,
        size: 10,
        total: 0
      },
      dialogVisible: false,
      isEdit: false,
      userForm: {
        id: null,
        username: '',
        email: '',
        phone: '',
        password: '',
        status: 1
      },
      userRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    dialogTitle() {
      return this.isEdit ? '编辑用户' : '添加用户'
    }
  },
  created() {
    this.fetchUserList()
  },
  methods: {
    // 获取用户列表
    async fetchUserList() {
      this.loading = true
      try {
        const params = {
          page: this.pagination.page,
          size: this.pagination.size,
          ...this.searchForm
        }
        const response = await getUserList(params)
        this.userList = response.data.list
        this.pagination.total = response.data.total
      } catch (error) {
        this.$message.error('获取用户列表失败')
      } finally {
        this.loading = false
      }
    },
    
    // 搜索
    handleSearch() {
      this.pagination.page = 1
      this.fetchUserList()
    },
    
    // 重置
    handleReset() {
      this.searchForm = {
        username: '',
        email: ''
      }
      this.pagination.page = 1
      this.fetchUserList()
    },
    
    // 添加用户
    handleAdd() {
      this.isEdit = false
      this.dialogVisible = true
      this.resetForm()
    },
    
    // 编辑用户
    handleEdit(row) {
      this.isEdit = true
      this.dialogVisible = true
      this.userForm = { ...row }
    },
    
    // 删除用户
    handleDelete(row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await deleteUser(row.id)
          this.$message.success('删除成功')
          this.fetchUserList()
        } catch (error) {
          this.$message.error('删除失败')
        }
      })
    },
    
    // 提交表单
    handleSubmit() {
      this.$refs.userForm.validate(async (valid) => {
        if (valid) {
          try {
            if (this.isEdit) {
              await updateUser(this.userForm.id, this.userForm)
              this.$message.success('更新成功')
            } else {
              await addUser(this.userForm)
              this.$message.success('添加成功')
            }
            this.dialogVisible = false
            this.fetchUserList()
          } catch (error) {
            this.$message.error(this.isEdit ? '更新失败' : '添加失败')
          }
        }
      })
    },
    
    // 关闭对话框
    handleDialogClose() {
      this.$refs.userForm.resetFields()
    },
    
    // 重置表单
    resetForm() {
      this.userForm = {
        id: null,
        username: '',
        email: '',
        phone: '',
        password: '',
        status: 1
      }
    },
    
    // 分页大小改变
    handleSizeChange(val) {
      this.pagination.size = val
      this.pagination.page = 1
      this.fetchUserList()
    },
    
    // 当前页改变
    handleCurrentChange(val) {
      this.pagination.page = val
      this.fetchUserList()
    }
  }
}
</script>

<style lang="scss" scoped>
.user-list-container {
  .search-area {
    margin-bottom: 20px;
    
    .search-form {
      .el-form-item {
        margin-bottom: 0;
      }
    }
  }
  
  .pagination-area {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
```

---

## 10. 权限管理

### 10.1 权限模块

**创建 `src/store/modules/permission.js`：**

```javascript
import { asyncRoutes, constantRoutes } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
```

### 10.2 权限指令

**创建 `src/directive/permission/index.js`：**

```javascript
import store from '@/store'

function checkPermission(el, binding) {
  const { value } = binding
  const roles = store.getters && store.getters.roles

  if (value && value instanceof Array) {
    if (value.length > 0) {
      const permissionRoles = value

      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  } else {
    throw new Error(`需要角色权限! 如 v-permission="['admin','editor']")`)
  }
}

export default {
  inserted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}
```

**在 `src/main.js` 中注册指令：**

```javascript
import permission from '@/directive/permission'

Vue.directive('permission', permission)
```

---

## 11. 样式和主题配置

### 11.1 全局样式

**在 `src/main.js` 中引入全局样式：**

```javascript
import '@/assets/styles/index.scss'
```

### 11.2 Element UI主题定制

**创建 `src/assets/styles/element-variables.scss`：**

```scss
/* 改变主题色变量 */
$--color-primary: #409EFF;
$--color-success: #67C23A;
$--color-warning: #E6A23C;
$--color-danger: #F56C6C;
$--color-info: #909399;

/* 改变 icon 字体路径变量，必需 */
$--font-path: '~element-ui/lib/theme-chalk/fonts';

@import "~element-ui/packages/theme-chalk/src/index";
```

---

## 12. 打包部署

### 12.1 生产环境配置

**修改 `vue.config.js` 添加生产环境优化：**

```javascript
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  // ... 其他配置
  
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 生产环境配置
      config.plugins.push(
        new CompressionPlugin({
          algorithm: 'gzip',
          test: /\.(js|css|html|svg)$/,
          threshold: 8192,
          minRatio: 0.8
        })
      )
    }
  },
  
  chainWebpack: config => {
    // 生产环境去除console
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer('terser').tap((args) => {
        args[0].terserOptions.compress.drop_console = true
        return args
      })
    }
  }
}
```

### 12.2 打包命令

```bash
# 安装压缩插件
npm install compression-webpack-plugin -D

# 构建生产版本
npm run build

# 本地预览构建结果
npm install -g serve
serve -s dist
### 12.3 Nginx部署配置

**创建 `nginx.conf`：**

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;
    
    # 处理前端路由
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API代理
    location /api/ {
        proxy_pass http://backend-server:3000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    
    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Gzip压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
}
```

### 12.4 Docker部署

**创建 `Dockerfile`：**

```dockerfile
# 构建阶段
FROM node:16-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# 生产阶段
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**创建 `docker-compose.yml`：**

```yaml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - app-network
      
  backend:
    image: your-backend-image
    ports:
      - "3000:3000"
    networks:
      - app-network
      
networks:
  app-network:
    driver: bridge
```

---

## 13. 项目启动和验证

### 13.1 开发环境启动

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run serve

# 3. 访问应用
# 浏览器打开 http://localhost:8080
```

### 13.2 功能验证清单

- [ ] 登录功能正常
- [ ] 路由跳转正常
- [ ] 侧边栏菜单展示正常
- [ ] 用户列表页面正常显示
- [ ] 添加/编辑/删除用户功能正常
- [ ] 分页功能正常
- [ ] 搜索功能正常
- [ ] 权限控制正常
- [ ] 响应式布局正常

### 13.3 常见问题解决

**1. 路由404问题**
```javascript
// 确保vue.config.js中配置了historyApiFallback
devServer: {
  historyApiFallback: true
}
```

**2. Element UI样式问题**
```javascript
// 确保正确引入了Element UI的CSS
import 'element-ui/lib/theme-chalk/index.css'
```

**3. API请求跨域问题**
```javascript
// 在vue.config.js中配置代理
proxy: {
  '/api': {
    target: 'http://localhost:3000',
    changeOrigin: true
  }
}
```

---

## 14. 项目优化建议

### 14.1 性能优化

1. **路由懒加载**：使用动态import实现页面懒加载
2. **组件懒加载**：大型组件使用异步组件
3. **图片优化**：使用WebP格式，添加loading="lazy"
4. **代码分割**：合理配置webpack的splitChunks
5. **CDN加速**：将静态资源部署到CDN

### 14.2 开发体验优化

1. **ESLint配置**：统一代码风格
2. **Prettier配置**：自动格式化代码
3. **Git Hooks**：提交前自动检查代码质量
4. **组件文档**：使用Storybook管理组件
5. **单元测试**：使用Jest进行单元测试

### 14.3 安全优化

1. **XSS防护**：对用户输入进行转义
2. **CSRF防护**：添加CSRF token
3. **权限验证**：前后端双重权限验证
4. **HTTPS部署**：生产环境使用HTTPS
5. **敏感信息保护**：不在前端存储敏感信息

---

## 15. 总结

本文档详细介绍了Vue2 + JavaScript后台管理系统的完整开发流程，包括：

1. **项目初始化**：从零开始创建Vue2项目
2. **依赖配置**：Element UI等核心依赖的安装和配置
3. **架构设计**：合理的项目结构和模块划分
4. **功能实现**：登录、用户管理等核心功能的完整实现
5. **权限管理**：基于角色的权限控制系统
6. **部署上线**：生产环境的打包和部署配置

按照本文档的步骤，开发者可以快速搭建一个功能完整、结构清晰的后台管理系统。在实际开发中，可以根据具体需求对功能进行扩展和定制。

**重要提示**：
- 确保Node.js版本兼容性
- 及时更新依赖包版本
- 遵循Vue2的最佳实践
- 注意代码规范和注释
- 做好错误处理和用户体验优化

希望这份文档能够帮助您顺利完成Vue2后台管理系统的开发！