<template>
  <div class="navbar">
    <!-- 左侧Logo和标题区域 -->
    <div class="navbar-left">
      <!-- 折叠按钮 -->
      <div class="hamburger-container" @click="toggleSideBar">
        <el-tooltip :content="sidebar.opened ? '关闭侧边栏' : '打开侧边栏'">
          <i :class="hamburgerClass"></i>
        </el-tooltip>
      </div>
      <!-- logo -->
      <div class="logo">
        <img src="@/assets/logo.png" alt="Logo" class="logo-img" />
      </div>
      <!-- 系统标题 -->
      <div class="title">
        <h3>管理系统</h3>
      </div>
    </div>

    <!-- 右侧用户信息区域 -->
    <div class="navbar-right">
      <div class="user-info">
        <span class="username">用户名</span>
        <div class="avatar">
          <i class="el-icon-user-solid"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Navbar",
  data() {
    return {
      // 暂时使用静态数据作为占位符
    };
  },
  computed: {
    ...mapGetters(["sidebar"]),
    hamburgerClass() {
      return {
        hamburger: true,
        "el-icon-s-fold": this.sidebar.opened,
        "el-icon-s-unfold": !this.sidebar.opened,
        "is-active": !this.sidebar.opened,
      };
    },
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #e6e6e6;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  position: relative;
  z-index: 9;
  .navbar-left {
    display: flex;
    align-items: center;
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

        // &:hover {
        //   color: #409eff;
        // }
      }
    }
    .logo {
      margin-right: 12px;
      display: flex;
      align-items: center;
      .logo-img {
        height: 20px;
        width: 20px;
      }
    }

    .title h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #1890ff;
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

// .user-info {
//   display: flex;
//   align-items: center;
//   cursor: pointer;
//   padding: 8px 12px;
//   border-radius: 4px;
//   transition: background-color 0.3s;
// }

// .user-info:hover {
//   background-color: #f5f5f5;
// }

// .username {
//   margin-right: 8px;
//   font-size: 14px;
//   color: #666;
// }

// .avatar {
//   width: 32px;
//   height: 32px;
//   border-radius: 50%;
//   background-color: #f0f0f0;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 16px;
//   color: #999;
// }
</style>
