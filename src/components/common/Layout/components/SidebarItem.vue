<template>
  <div class="sidebar-item">
    <!-- 如果有子菜单，渲染子菜单 -->
    <el-submenu
      v-if="hasChildren"
      :index="resolvePath(item.path)"
      :popper-append-to-body="false"
    >
      <!-- 子菜单标题模板 -->
      <template slot="title">
        <!-- 菜单图标 -->
        <i v-if="item.meta && item.meta.icon" :class="item.meta.icon"></i>
        <!-- 菜单标题 -->
        <span slot="title">{{ item.meta && item.meta.title }}</span>
      </template>

      <!-- 递归渲染子菜单项 -->
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>

    <!-- 如果没有子菜单，渲染普通菜单项 -->
    <el-menu-item v-else :index="resolvePath(item.path)" @click="handleClick">
      <!-- 菜单图标 -->
      <i v-if="item.meta && item.meta.icon" :class="item.meta.icon"></i>
      <!-- 菜单标题 -->
      <span slot="title">{{ item.meta && item.meta.title }}</span>
    </el-menu-item>
  </div>
</template>

<script>
/**
 * 侧边栏菜单项组件
 * 功能说明：
 * 1. 支持单级菜单和多级菜单的渲染
 * 2. 支持菜单图标显示
 * 3. 支持路由跳转
 * 4. 支持菜单激活状态
 * 5. 支持菜单项的递归渲染
 */

export default {
  name: "SidebarItem",

  // 组件属性定义
  props: {
    // 菜单项数据对象
    item: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    // 基础路径，用于构建完整的路由路径
    basePath: {
      type: String,
      default: "",
    },
  },

  computed: {
    /**
     * 判断当前菜单项是否有子菜单
     * @returns {boolean} 是否有子菜单
     */
    hasChildren() {
      // 检查是否有children属性且children数组不为空
      return this.item.children && this.item.children.length > 0;
    },

    /**
     * 获取显示的子菜单列表
     * 过滤掉隐藏的菜单项
     * @returns {Array} 可显示的子菜单列表
     */
    showingChildren() {
      if (!this.hasChildren) {
        return [];
      }

      // 过滤掉hidden为true的菜单项
      return this.item.children.filter((child) => {
        return !(child.meta && child.meta.hidden);
      });
    },
  },

  methods: {
    /**
     * 解析完整的路由路径
     * @param {string} routePath - 路由路径
     * @returns {string} 完整的路由路径
     */
    resolvePath(routePath) {
      // 如果是外部链接，直接返回
      if (this.isExternalLink(routePath)) {
        return routePath;
      }

      // 如果是绝对路径（以/开头），直接返回
      if (routePath && routePath.startsWith("/")) {
        return routePath;
      }

      // 如果没有基础路径，直接返回当前路径
      if (!this.basePath) {
        return routePath || "/";
      }

      // 拼接基础路径和当前路径
      const basePath = this.basePath.endsWith("/")
        ? this.basePath.slice(0, -1)
        : this.basePath;
      const currentPath =
        routePath && routePath.startsWith("/")
          ? routePath
          : `/${routePath || ""}`;

      return basePath + currentPath;
    },

    /**
     * 判断是否为外部链接
     * @param {string} path - 路径
     * @returns {boolean} 是否为外部链接
     */
    isExternalLink(path) {
      return /^(https?:|mailto:|tel:)/.test(path);
    },

    /**
     * 处理菜单项点击事件
     * 执行路由跳转或外部链接打开
     */
    handleClick() {
      const routePath = this.resolvePath(this.item.path);

      // 如果是外部链接，在新窗口打开
      if (this.isExternalLink(routePath)) {
        window.open(routePath, "_blank");
        return;
      }

      // 如果当前路由与目标路由相同，不进行跳转
      if (this.$route.path === routePath) {
        return;
      }

      // 执行路由跳转
      this.$router.push(routePath).catch((err) => {
        // 处理路由跳转错误（如重复导航）
        if (err.name !== "NavigationDuplicated") {
          console.error("路由跳转失败:", err);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/**
 * 侧边栏菜单项样式
 */
.sidebar-item {
  // 嵌套菜单项的缩进
  .nest-menu {
    .el-menu-item {
      padding-left: 50px !important;

      // 嵌套菜单项的背景色
      &:hover {
        background-color: rgba(255, 255, 255, 0.1) !important;
      }
    }
  }

  // 菜单图标样式
  .el-menu-item,
  .el-submenu__title {
    i {
      margin-right: 8px;
      font-size: 16px;

      // 确保图标垂直居中
      vertical-align: middle;
    }
  }

  // 子菜单标题样式
  .el-submenu__title {
    &:hover {
      background-color: rgba(255, 255, 255, 0.1) !important;
    }
  }

  // 激活状态的菜单项样式
  .el-menu-item.is-active {
    background-color: rgba(255, 208, 75, 0.2) !important;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background-color: #ffd04b;
    }
  }
}
</style>
