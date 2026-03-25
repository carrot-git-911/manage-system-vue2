<template>
  <div class="layout">
    <aside class="layout-sidebar">
      <div class="sidebar-logo">
        <span class="sidebar-logo__title">管理系统</span>
      </div>
      <el-menu
        :default-active="$route.path"
        :router="true"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409eff"
        unique-opened
      >
        <el-menu-item index="/dashboard">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="/system">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>系统管理</span>
          </template>
          <el-menu-item index="/system/user">用户管理</el-menu-item>
          <el-menu-item index="/system/role">角色管理</el-menu-item>
        </el-submenu>
      </el-menu>
    </aside>
    <div class="layout-main">
      <header class="layout-header">
        <div class="layout-header__left">
          <i class="el-icon-s-fold header-fold-icon"></i>
        </div>
        <div class="layout-header__right">
          <span class="header-username">Admin</span>
        </div>
      </header>
      <main class="layout-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout'
}
</script>

<style lang="scss" scoped>
$sidebar-width: 210px;
$header-height: 50px;
$sidebar-bg: #304156;

.layout {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.layout-sidebar {
  width: $sidebar-width;
  height: 100%;
  background-color: $sidebar-bg;
  flex-shrink: 0;
  overflow-y: auto;
  overflow-x: hidden;

  .el-menu {
    border-right: none;
    width: $sidebar-width;
  }
}

.sidebar-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: $header-height;
  background-color: #263445;

  &__title {
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    white-space: nowrap;
  }
}

.layout-main {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: $header-height;
  padding: 0 16px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  flex-shrink: 0;
}

.layout-header__left {
  display: flex;
  align-items: center;
}

.header-fold-icon {
  font-size: 20px;
  cursor: pointer;
  color: #606266;

  &:hover {
    color: #409eff;
  }
}

.layout-header__right {
  display: flex;
  align-items: center;
}

.header-username {
  font-size: 14px;
  color: #606266;
  cursor: pointer;
}

.layout-content {
  flex: 1;
  overflow: auto;
  padding: 16px;
  background-color: #f0f2f5;
}
</style>
