<template>
  <div class="main-content">
    <!-- 面包屑导航 -->
    <div class="breadcrumb-container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
        <!-- 动态面包屑项 -->
      </el-breadcrumb>
    </div>
    
    <!-- 页面标题 -->
    <div class="page-header">
      <h2 class="page-title">{{ pageTitle }}</h2>
    </div>
    
    <!-- 主要内容区域 -->
    <div class="content-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data() {
    return {
      pageTitle: '首页',
    }
  },
}
</script>
