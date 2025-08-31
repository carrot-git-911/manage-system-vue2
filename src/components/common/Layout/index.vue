<template>
  <div class="app-wrapper">
    <!-- 侧边栏 -->
    <div class="sidebar-container">
      <Sidebar />
    </div>
    <div class="main-container">
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
import Sidebar from '@/components/common/Layout/components/Sidebar';
import Navbar from '@/components/common/Layout/components/Navbar';
import Main from '@/components/common/Layout/components/Main';

export default {
  name: 'Layout',
  components: {
    Sidebar,
    Navbar,
    Main,
  },
}
</script>

<style lang="scss" scoped>
// @import '@/assets/styles/variables.scss';

.app-wrapper {
  display: flex;
  width: 100%;
  height: 100vh;
  .sidebar-container {
    width: 200px;
    height: 100%;
    background-color: #f5f5f5;
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  }
  .main-container {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    .fixed-header {
      height: 60px;
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
