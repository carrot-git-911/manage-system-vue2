<template>
  <div class="app-wrapper" :class="classObj">
    <!-- 侧边栏 -->
    <!-- <div class="sidebar-container" :style="sidebarStyle">
      <Sidebar />
    </div> -->
    <Sidebar class="sidebar-container" />
    <div class="main-container" :style="mainContainerStyle">
      <!-- 固定头部 -->
      <div class="fixed-header">
        <Navbar />
      </div>
      <!-- 内容区域 -->
      <AppMain />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Sidebar from "@/components/common/Layout/components/Sidebar";
import Navbar from "@/components/common/Layout/components/Navbar";
import AppMain from "@/components/common/Layout/components/AppMain.vue";

export default {
  name: "Layout",
  components: {
    Sidebar,
    Navbar,
    AppMain,
  },
  computed: {
    ...mapGetters(["sidebar", "device", "sidebarWidth"]),
    /**
     * 布局容器样式类
     * @returns {Object} 样式类对象
     */
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile",
      };
    },
    /**
     * 侧边栏样式
     * @returns {Object} 样式对象
     */
    sidebarStyle() {
      return {
        width: this.sidebar.opened
          ? this.sidebarWidth.opened
          : this.sidebarWidth.closed,
      };
    },
    /**
     * 主容器样式
     * @returns {Object} 样式对象
     */
    mainContainerStyle() {
      const sidebarWidth = this.sidebar.opened
        ? this.sidebarWidth.opened
        : this.sidebarWidth.closed;
      return {
        marginLeft: this.device === "mobile" ? "0" : sidebarWidth,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
// @import '@/assets/styles/variables.scss';

.app-wrapper {
  display: flex;
  width: 100%;
  height: 100vh;
  // .sidebar-container {
  //   width: 200px;
  //   height: 100%;
  //   background-color: #f5f5f5;
  //   box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  // }
  // .main-container {
  //   flex: 1;
  //   height: 100%;
  //   display: flex;
  //   flex-direction: column;
  //   .fixed-header {
  //     height: 60px;
  //     background-color: #fff;
  //     box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  //   }
  //   .content-container {
  //     flex: 1;
  //     padding: 20px;
  //     background-color: #f0f2f5;
  //     overflow-y: auto;
  //   }
  // }
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
    flex: 1;
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
      // background-color: #f0f2f5;
      min-height: calc(100vh - 60px);
    }
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
</style>
