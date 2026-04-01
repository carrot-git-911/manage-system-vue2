<template>
  <aside class="app-sidebar">
    <el-menu
      :key="menuKey"
      class="app-sidebar__menu"
      :router="true"
      :default-active="activePath"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409eff"
    >
      <SidebarMenuItem v-for="item in menuTree" :key="item.path" :item="item" />
    </el-menu>
  </aside>
</template>

<script>
import { buildMenuTreeFromRouter } from '@/utils/menuFromRoutes'
import SidebarMenuItem from './SidebarMenuItem.vue'

export default {
  name: 'AppSidebar',
  components: { SidebarMenuItem },
  computed: {
    /** 依赖 store，动态 addRoute 后 setRoutes 会触发本计算属性刷新 */
    menuTree() {
      this.$store.getters['route/accessibleRoutes']
      return buildMenuTreeFromRouter(this.$router)
    },
    activePath() {
      return this.$route.path
    },
    menuKey() {
      const routes = this.$store.getters['route/accessibleRoutes'] || []
      return String(routes.length)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-sidebar {
  width: 220px;
  flex-shrink: 0;
  background-color: #304156;
}

.app-sidebar__menu {
  border-right: none;
  min-height: 100vh;
}
</style>
