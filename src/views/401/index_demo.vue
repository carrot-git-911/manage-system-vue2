<template>
  <div class="error-401">
    <div class="error-container">
      <!-- 401 GIF 图片 -->
      <div class="error-image">
        <img src="@/assets/401_images/401.gif" alt="401 未授权" />
      </div>
      
      <!-- 错误信息 -->
      <div class="error-content">
        <h1 class="error-code">401</h1>
        <h2 class="error-title">未授权访问</h2>
        <p class="error-description">
          抱歉，您没有权限访问此页面。这可能是因为：
        </p>
        <ul class="error-reasons">
          <li>您的登录会话已过期</li>
          <li>您没有足够的权限访问此资源</li>
          <li>需要重新进行身份验证</li>
        </ul>
        
        <!-- 操作按钮 -->
        <div class="error-actions">
          <button class="btn btn-primary" @click="goToLogin">
            <i class="el-icon-user"></i>
            重新登录
          </button>
          <button class="btn btn-secondary" @click="goToHome">
            <i class="el-icon-house"></i>
            返回首页
          </button>
        </div>
        
        <!-- 帮助信息 -->
        <div class="help-info">
          <p class="help-text">
            <i class="el-icon-info"></i>
            如果您认为这是一个错误，请联系系统管理员或稍后重试。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error401",
  methods: {
    // 跳转到登录页面
    goToLogin() {
      this.$router.push('/login');
    },
    // 返回首页
    goToHome() {
      this.$router.push('/dashboard');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.error-401 {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.error-container {
  max-width: 800px;
  width: 100%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    max-width: 500px;
  }
}

.error-image {
  flex: 1;
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f9fa;
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  @media (max-width: 768px) {
    padding: 30px 20px 20px;
  }
}

.error-content {
  flex: 1;
  padding: 40px;
  
  @media (max-width: 768px) {
    padding: 20px 30px 40px;
    text-align: center;
  }
}

.error-code {
  font-size: 4rem;
  font-weight: bold;
  color: $danger-color;
  margin: 0 0 10px;
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
}

.error-title {
  font-size: 2rem;
  color: #333;
  margin: 0 0 20px;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
}

.error-description {
  color: #666;
  font-size: $font-size-base;
  margin: 0 0 15px;
  line-height: 1.6;
}

.error-reasons {
  color: #666;
  font-size: $font-size-small;
  margin: 0 0 30px;
  padding-left: 20px;
  
  li {
    margin-bottom: 8px;
    line-height: 1.5;
  }
  
  @media (max-width: 768px) {
    text-align: left;
    padding-left: 20px;
  }
}

.error-actions {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: $font-size-base;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  i {
    font-size: 16px;
  }
}

.btn-primary {
  background-color: $primary-color;
  color: white;
  
  &:hover {
    background-color: darken($primary-color, 10%);
  }
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  
  &:hover {
    background-color: darken(#6c757d, 10%);
  }
}

.help-info {
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.help-text {
  color: $info-color;
  font-size: $font-size-small;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 1.5;
  
  i {
    font-size: 16px;
    flex-shrink: 0;
  }
  
  @media (max-width: 768px) {
    justify-content: center;
    text-align: center;
  }
}

// 响应式设计 - 小屏幕优化
@media (max-width: 480px) {
  .error-401 {
    padding: 10px;
  }
  
  .error-container {
    border-radius: 8px;
  }
  
  .error-content {
    padding: 20px;
  }
  
  .error-code {
    font-size: 2.5rem;
  }
  
  .error-title {
    font-size: 1.25rem;
  }
  
  .btn {
    padding: 10px 20px;
    font-size: $font-size-small;
  }
}
</style>
