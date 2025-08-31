<template>
  <div class="navbar">
    <!-- 左侧Logo和标题区域 -->
    <div class="navbar-left">
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
        <span class="username">用户名</span>
        <div class="avatar">
          <i class="el-icon-user-solid"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      // 暂时使用静态数据作为占位符
    }
  },
  methods: {
    // 预留方法，后续可以添加用户操作功能
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #e6e6e6;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.navbar-left {
  display: flex;
  align-items: center;
}

.logo {
  margin-right: 12px;
}

.logo-img {
  height: 32px;
  width: 32px;
}

.title h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1890ff;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.user-info:hover {
  background-color: #f5f5f5;
}

.username {
  margin-right: 8px;
  font-size: 14px;
  color: #666;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #999;
}
</style>