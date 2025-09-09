# Vue2后台管理系统菜单折叠功能实现方案

## 1. 功能设计概述

### 1.1 功能目标
- 实现侧边栏菜单的折叠/展开功能
- 提供流畅的动画过渡效果
- 保持用户操作状态的持久化
- 适配不同屏幕尺寸的响应式设计

### 1.2 交互设计
- **折叠按钮位置**：位于顶部导航栏左侧，紧邻Logo区域
- **折叠状态**：
  - 展开状态：显示完整菜单文字和图标
  - 折叠状态：仅显示菜单图标，隐藏文字
- **动画效果**：300ms的平滑过渡动画
- **状态持久化**：使用localStorage保存用户的折叠偏好

## 2. 技术架构设计

### 2.1 状态管理方案
使用Vuex管理全局的侧边栏折叠状态，确保各组件间的状态同步。

### 2.2 组件层级结构
```
Layout (主布局)
├── Navbar (顶部导航 - 包含折叠按钮)
├── Sidebar (侧边栏 - 响应折叠状态)
└── Main (主内容区 - 适配宽度变化)
```

### 2.3 响应式设计
- 桌面端：支持手动折叠/展开
- 移动端：自动折叠，通过遮罩层显示菜单

## 3. 实现方案

### 3.1 Vuex状态管理模块

**新增文件：`src/store/modules/app.js`**

```javascript
/**
 * 应用全局状态管理模块
 * 负责管理侧边栏折叠状态、设备类型等全局状态
 */

const state = {
  // 侧边栏折叠状态
  sidebar: {
    opened: localStorage.getItem('sidebarStatus') ? !!+localStorage.getItem('sidebarStatus') : true,
    withoutAnimation: false
  },
  // 设备类型
  device: 'desktop',
  // 侧边栏宽度配置
  sidebarWidth: {
    opened: '210px',
    closed: '64px'
  }
}

const mutations = {
  /**
   * 切换侧边栏状态
   * @param {Object} state - 状态对象
   */
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    
    // 持久化存储用户偏好
    if (state.sidebar.opened) {
      localStorage.setItem('sidebarStatus', 1)
    } else {
      localStorage.setItem('sidebarStatus', 0)
    }
  },
  
  /**
   * 关闭侧边栏
   * @param {Object} state - 状态对象
   */
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    localStorage.setItem('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  
  /**
   * 设置设备类型
   * @param {Object} state - 状态对象
   * @param {string} device - 设备类型 (desktop/mobile)
   */
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  }
}

const actions = {
  /**
   * 切换侧边栏
   * @param {Object} context - Vuex上下文
   */
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  
  /**
   * 关闭侧边栏
   * @param {Object} context - Vuex上下文
   * @param {boolean} withoutAnimation - 是否禁用动画
   */
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  
  /**
   * 切换设备类型
   * @param {Object} context - Vuex上下文
   * @param {string} device - 设备类型
   */
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

const getters = {
  // 侧边栏状态
  sidebar: state => state.sidebar,
  // 设备类型
  device: state => state.device,
  // 侧边栏宽度
  sidebarWidth: state => state.sidebarWidth
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
```

### 3.2 更新Store主文件

**修改文件：`src/store/index.js`**

```javascript
import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import user from "./modules/user";
import app from "./modules/app"; // 新增

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    app, // 新增
  },
  getters,
});

export default store;
```

### 3.3 更新全局Getters

**修改文件：`src/store/getters.js`**

```javascript
const getters = {
  // 用户相关
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  isLoggedIn: (state) => state.user.isLoggedIn,
  
  // 应用相关 - 新增
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  sidebarWidth: (state) => state.app.sidebarWidth,
};
export default getters;
```

### 3.4 更新顶部导航组件

**修改文件：`src/components/common/Layout/components/Navbar.vue`**

```vue
<template>
  <div class="navbar">
    <!-- 左侧Logo和标题区域 -->
    <div class="navbar-left">
      <!-- 折叠按钮 - 新增 -->
      <div class="hamburger-container" @click="toggleSideBar">
        <el-tooltip :content="sidebar.opened ? '收起菜单' : '展开菜单'" placement="bottom">
          <i :class="hamburgerClass"></i>
        </el-tooltip>
      </div>
      
      <div class="logo">
        <img src="@/assets/logo.png" alt="Logo" class="logo-img" />
      </div>
      <div class="title">
        <h3>管理系统</h3>
      </div>
    </div>

    <!-- 右侧用户信息区域 -->
    <div class="navbar-right">
      <div class="user-info">
        <span class="username">{{ userInfo.username || '管理员' }}</span>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-user-solid"></i>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="profile">
              <i class="el-icon-user"></i>
              个人中心
            </el-dropdown-item>
            <el-dropdown-item command="settings">
              <i class="el-icon-setting"></i>
              系统设置
            </el-dropdown-item>
            <el-dropdown-item divided command="logout">
              <i class="el-icon-switch-button"></i>
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Navbar',
  computed: {
    ...mapGetters(['userInfo', 'sidebar']),
    
    /**
     * 汉堡菜单图标样式
     * @returns {Object} 图标样式类
     */
    hamburgerClass() {
      return {
        'hamburger': true,
        'el-icon-s-fold': this.sidebar.opened,
        'el-icon-s-unfold': !this.sidebar.opened,
        'is-active': !this.sidebar.opened
      }
    }
  },
  methods: {
    ...mapActions('app', ['toggleSideBar']),
    ...mapActions('user', ['logout']),
    
    /**
     * 处理下拉菜单命令
     * @param {string} command - 命令类型
     */
    async handleCommand(command) {
      switch (command) {
        case 'profile':
          this.$router.push('/profile')
          break
        case 'settings':
          this.$router.push('/settings')
          break
        case 'logout':
          try {
            await this.logout()
            this.$router.push('/login')
            this.$message.success('退出登录成功')
          } catch (error) {
            this.$message.error('退出登录失败')
          }
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  position: relative;
  z-index: 9;

  .navbar-left {
    display: flex;
    align-items: center;
    
    // 折叠按钮样式 - 新增
    .hamburger-container {
      margin-right: 16px;
      cursor: pointer;
      transition: all 0.3s;
      
      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
      
      .hamburger {
        display: inline-block;
        font-size: 20px;
        color: #5a5e66;
        padding: 8px;
        border-radius: 4px;
        transition: all 0.3s;
        
        &.is-active {
          color: #409eff;
        }
        
        &:hover {
          color: #409eff;
        }
      }
    }

    .logo {
      margin-right: 12px;
      
      .logo-img {
        height: 32px;
        width: 32px;
      }
    }

    .title {
      h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: #303133;
      }
    }
  }

  .navbar-right {
    .user-info {
      display: flex;
      align-items: center;
      padding: 8px 12px;
      cursor: pointer;
      border-radius: 4px;
      transition: background-color 0.3s;
      
      &:hover {
        background-color: #f5f5f5;
      }

      .username {
        margin-right: 8px;
        font-size: 14px;
        color: #666;
      }

      .el-dropdown-link {
        color: #606266;
        font-size: 16px;
        
        &:hover {
          color: #409eff;
        }
      }
    }
  }
}
</style>
```

### 3.5 更新侧边栏组件

**修改文件：`src/components/common/Layout/components/Sidebar.vue`**

```vue
<template>
  <div class="sidebar">
    <div class="logo">
      <h2 v-show="!isCollapse">管理系统</h2>
      <h2 v-show="isCollapse" class="logo-mini">MS</h2>
    </div>
    <el-menu
      class="sidebar-menu"
      :default-active="activeIndex"
      :collapse="isCollapse"
      :unique-opened="false"
      :collapse-transition="false"
      mode="vertical"
      background-color="#22272e"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
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
  name: 'Sidebar',
  components: {
    SidebarItem,
  },
  data() {
    return {
      activeIndex: '/'
    }
  },
  computed: {
    ...mapGetters(['sidebar']),
    
    /**
     * 侧边栏是否折叠
     * @returns {boolean} 折叠状态
     */
    isCollapse() {
      return !this.sidebar.opened
    },
    
    /**
     * 获取路由菜单数据
     * @returns {Array} 菜单路由列表
     */
    routes() {
      // 从路由配置中获取菜单数据
      return this.$router.options.routes.filter(route => 
        !route.meta?.hidden && route.children
      )
    }
  },
  watch: {
    /**
     * 监听路由变化，更新激活菜单
     * @param {Object} route - 当前路由对象
     */
    $route: {
      handler: function(route) {
        this.activeIndex = route.path
      },
      immediate: true
    }
  },
  methods: {
    /**
     * 处理菜单选择事件
     * @param {string} index - 选中的菜单索引
     */
    handleSelect(index) {
      this.activeIndex = index
      console.log('选中菜单:', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100%;
  transition: width 0.28s;
  
  .logo {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #2b2f3a;
    transition: all 0.28s;
    
    h2 {
      color: #fff;
      margin: 0;
      font-size: 18px;
      transition: all 0.28s;
      
      &.logo-mini {
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
  
  .el-menu {
    border: none;
    height: calc(100% - 60px);
    background-color: #22272e;
    width: 100%;
    
    // 折叠状态下的菜单样式
    &.el-menu--collapse {
      .el-menu-item,
      .el-submenu__title {
        text-align: center;
        
        span {
          display: none;
        }
        
        i {
          margin: 0;
        }
      }
      
      .el-submenu {
        .el-submenu__icon-arrow {
          display: none;
        }
      }
    }
  }
}
</style>
```

### 3.6 更新主布局组件

**修改文件：`src/components/common/Layout/index.vue`**

```vue
<template>
  <div class="app-wrapper" :class="classObj">
    <!-- 移动端遮罩层 -->
    <div 
      v-if="device === 'mobile' && sidebar.opened" 
      class="drawer-bg" 
      @click="handleClickOutside"
    />
    
    <!-- 侧边栏 -->
    <div class="sidebar-container" :style="sidebarStyle">
      <Sidebar />
    </div>
    
    <div class="main-container" :style="mainContainerStyle">
      <!-- 固定头部 -->
      <div class="fixed-header">
        <Navbar />
      </div>
      <!-- 内容区域 -->
      <div class="content-container">
        <Main />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Main from './components/Main'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    Main
  },
  computed: {
    ...mapGetters(['sidebar', 'device', 'sidebarWidth']),
    
    /**
     * 布局容器样式类
     * @returns {Object} 样式类对象
     */
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    
    /**
     * 侧边栏样式
     * @returns {Object} 样式对象
     */
    sidebarStyle() {
      return {
        width: this.sidebar.opened ? this.sidebarWidth.opened : this.sidebarWidth.closed
      }
    },
    
    /**
     * 主容器样式
     * @returns {Object} 样式对象
     */
    mainContainerStyle() {
      const sidebarWidth = this.sidebar.opened ? this.sidebarWidth.opened : this.sidebarWidth.closed
      return {
        marginLeft: this.device === 'mobile' ? '0' : sidebarWidth
      }
    }
  },
  mounted() {
    // 检测设备类型
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    ...mapActions('app', ['toggleDevice', 'closeSideBar']),
    
    /**
     * 处理窗口大小变化
     */
    handleResize() {
      const rect = document.body.getBoundingClientRect()
      const isMobile = rect.width - 1 < 992
      
      this.toggleDevice(isMobile ? 'mobile' : 'desktop')
      
      if (isMobile) {
        this.closeSideBar({ withoutAnimation: true })
      }
    },
    
    /**
     * 处理移动端点击遮罩层
     */
    handleClickOutside() {
      this.closeSideBar({ withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.sidebar-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  height: 100%;
  font-size: 0;
  background-color: #22272e;
  transition: width 0.28s;
  
  // 移动端样式
  .mobile & {
    transition: transform 0.28s;
    width: 210px !important;
  }
}

.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  position: relative;
  
  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - 210px);
    transition: width 0.28s;
  }
  
  .content-container {
    margin-top: 60px;
    padding: 20px;
    background-color: #f0f2f5;
    min-height: calc(100vh - 60px);
  }
}

// 折叠状态样式
.hideSidebar {
  .sidebar-container {
    width: 64px !important;
  }
  
  .main-container {
    margin-left: 64px;
    
    .fixed-header {
      width: calc(100% - 64px);
    }
  }
}

// 移动端样式
.mobile {
  .sidebar-container {
    transform: translate3d(-210px, 0, 0);
  }
  
  .main-container {
    margin-left: 0;
    
    .fixed-header {
      width: 100%;
    }
  }
  
  &.openSidebar {
    .sidebar-container {
      transform: translate3d(0, 0, 0);
    }
  }
}

// 禁用动画
.withoutAnimation {
  .sidebar-container,
  .main-container {
    transition: none;
  }
}
</style>
```

## 4. 实现步骤

### 4.1 第一步：创建状态管理模块
1. 创建 `src/store/modules/app.js` 文件
2. 更新 `src/store/index.js` 引入新模块
3. 更新 `src/store/getters.js` 添加新的getters

### 4.2 第二步：更新组件
1. 修改 `Navbar.vue` 添加折叠按钮
2. 修改 `Sidebar.vue` 响应折叠状态
3. 修改 `Layout/index.vue` 添加响应式布局

### 4.3 第三步：测试功能
1. 测试桌面端折叠/展开功能
2. 测试移动端响应式行为
3. 测试状态持久化
4. 测试动画效果

## 5. 注意事项

### 5.1 性能优化
- 使用CSS3 transform属性实现动画，避免重排重绘
- 合理使用transition，避免过度动画
- 移动端使用transform3d开启硬件加速

### 5.2 兼容性考虑
- 支持现代浏览器的CSS3特性
- 移动端触摸事件处理
- 响应式断点设置（992px）

### 5.3 用户体验
- 提供清晰的视觉反馈
- 保持操作的一致性
- 状态持久化提升用户体验

### 5.4 代码规范
- 遵循Vue2组件开发规范
- 使用mapGetters和mapActions简化代码
- 添加详细的JSDoc注释
- 使用SCSS嵌套语法保持样式结构清晰

## 6. 扩展功能建议

### 6.1 高级功能
- 支持键盘快捷键切换（如Ctrl+B）
- 添加侧边栏宽度自定义功能
- 支持多主题切换
- 添加侧边栏位置切换（左侧/右侧）

### 6.2 性能监控
- 添加折叠状态变化的埋点统计
- 监控动画性能指标
- 用户行为分析

通过以上实现方案，可以为Vue2后台管理系统添加完整的菜单折叠功能，提升用户体验和界面的灵活性。