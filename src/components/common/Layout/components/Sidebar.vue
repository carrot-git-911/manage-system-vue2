<template>
  <div class="siderbar">
    <div class="logo">
      <img src="@/assets/logo.png" alt="Logo" class="logo-img" />
      <h2 v-show="!isCollapse">管理系统</h2>
    </div>
    <el-menu
      :default-active="activeIndex"
      :collapse="isCollapse"
      :unique-opened="false"
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
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";

export default {
  name: "Sidebar",
  components: {
    SidebarItem,
  },
  data() {
    return {
      activeIndex: "/",
      // isCollapse: false,
    };
  },
  computed: {
    ...mapGetters(["sidebar"]),
    isCollapse() {
      return !this.sidebar.opened;
    },
    routes() {
      // 从路由配置中获取菜单数据
      return this.$router.options.routes.filter(
        (route) => !route.meta?.hidden && route.children,
      );
    },
  },
  methods: {
    /**
     * 处理菜单选择事件
     * @param {string} index - 选中的菜单索引
     */
    handleSelect(index) {
      this.activeIndex = index;
      console.log("选中菜单:", index);
    },
  },
};
</script>

<style lang="scss" scoped>
.siderbar {
  height: 100%;
  transition: width 0.28s;
  .logo {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #2b2f3a;
    .logo-img {
      height: 20px;
      width: 20px;
      margin-right: 10px;
    }
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
    ::v-deep .el-menu--collapse {
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
