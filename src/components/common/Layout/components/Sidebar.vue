<template>
  <div class="siderbar">
    <div class="logo">
      <h2>管理系统</h2>
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
import SidebarItem from './SidebarItem'

export default {
  name: 'Sidebar',
  components: {
    SidebarItem,
  },
  data() {
    return {
      activeIndex: '/',
      isCollapse: false,
      // 示例菜单数据
      // routes: [
      //   {
      //     path: '/dashboard',
      //     name: 'Dashboard',
      //     meta: {
      //       title: '仪表盘',
      //       icon: 'el-icon-s-home'
      //     }
      //   },
      //   {
      //     path: '/user',
      //     name: 'User',
      //     meta: {
      //       title: '用户管理',
      //       icon: 'el-icon-user'
      //     },
      //     children: [
      //       {
      //         path: '/user/list',
      //         name: 'UserList',
      //         meta: {
      //           title: '用户列表',
      //           icon: 'el-icon-user-solid'
      //         }
      //       },
      //       {
      //         path: '/user/add',
      //         name: 'UserAdd',
      //         meta: {
      //           title: '添加用户',
      //           icon: 'el-icon-plus'
      //         }
      //       }
      //     ]
      //   },
      //   {
      //     path: '/system',
      //     name: 'System',
      //     meta: {
      //       title: '系统管理',
      //       icon: 'el-icon-setting'
      //     },
      //     children: [
      //       {
      //         path: '/system/menu',
      //         name: 'SystemMenu',
      //         meta: {
      //           title: '菜单管理',
      //           icon: 'el-icon-menu'
      //         }
      //       },
      //       {
      //         path: '/system/role',
      //         name: 'SystemRole',
      //         meta: {
      //           title: '角色管理',
      //           icon: 'el-icon-s-custom'
      //         }
      //       }
      //     ]
      //   }
      // ]
    }
  },
  computed: {
    routes() {
      // 从路由配置中获取菜单数据
      return this.$router.options.routes.filter(route => 
        !route.meta?.hidden && route.children
      )
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
.siderbar {
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
     background-color: #22272e;
     width: 100%;
  }
}
</style>