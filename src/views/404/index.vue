<template>
  <div class="error-not-found">
    <div class="not-found-container">
      <!-- 错误图片区域 -->
      <div class="error-img">
        <img
          src="@/assets/404_images/404.png"
          alt="404"
          class="error-img__parent"
        />
        <img
          src="@/assets/404_images/404_cloud.png"
          alt="404"
          class="error-img__child left"
        />
        <img
          src="@/assets/404_images/404_cloud.png"
          alt="404"
          class="error-img__child middle"
        />
        <img
          src="@/assets/404_images/404_cloud.png"
          alt="404"
          class="error-img__child right"
        />
      </div>
      <!-- 错误信息区域 -->
      <div class="error-content">
        <div class="error-code">404</div>
        <div class="error-title">{{ errorTitle }}</div>
        <div class="error-description">{{ errorDescription }}</div>

        <!-- 操作按钮区域 -->
        <div class="error-actions">
          <el-button
            type="primary"
            size="medium"
            @click="goHome"
            :loading="homeLoading"
          >
            <i class="el-icon-house"></i>
            {{ homeButtonText }}
          </el-button>
          <el-button size="medium" @click="goBack" :loading="backLoading">
            <i class="el-icon-back"></i>
            {{ backButtonText }}
          </el-button>
        </div>

        <!-- 建议链接区域 -->
        <div class="error-suggestions">
          <p class="suggestions-title">{{ suggestionsTitle }}</p>
          <ul class="suggestions-list">
            <li>
              <a href="/dashboard" class="suggestion-link">{{
                dashboardText
              }}</a>
            </li>
            <li>
              <a href="/users" class="suggestion-link">{{ usersText }}</a>
            </li>
            <li>
              <a href="/settings" class="suggestion-link">{{ settingsText }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 错误信息文本
      errorTitle: "抱歉，页面不存在",
      errorDescription: "您访问的页面可能已被删除、重命名或暂时不可用",

      // 按钮文本
      homeButtonText: "返回首页",
      backButtonText: "返回上页",

      // 建议文本
      suggestionsTitle: "您可以尝试访问以下页面：",
      dashboardText: "仪表盘",
      usersText: "用户管理",
      settingsText: "系统设置",

      // 加载状态
      homeLoading: false,
      backLoading: false,
    };
  },
  methods: {
    goHome() {}
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/styles/variables.scss";
.error-not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  .not-found-container {
    max-width: 1200px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // background: rgba(249, 253, 255, 0.8);
    border-radius: 20px;
    // box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    padding: 60px 40px;
    backdrop-filter: blur(10px);
    animation: fadeInUp 0.8s ease-out;
  }
}

// 错误图片区域
.error-img {
  position: relative;
  flex: 1;
  max-width: 500px;
  // margin-right: 60px;
  &__parent {
    width: 100%;
    height: auto;
    animation: float 3s ease-in-out infinite;
  }
  &__child {
    position: absolute;
    &.left {
      width: 80px;
      top: 1cm;
      left: 10%;
      animation: float 3s ease-in-out infinite 0.5s;
    }
    &.middle {
      width: 80px;
      top: 10%;
      right: 20%;
      animation: float 3s ease-in-out infinite 1s;
    }
    &.right {
      width: 80px;
      bottom: 20%;
      right: 10%;
      animation: float 3s ease-in-out infinite 1.5s;
    }
  }
}

// 错误内容区域
.error-content {
  flex: 1;
  min-width: 500px;
  .error-code {
    font-size: 120px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 20px;
    color: $primary-color;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    animation: pulse 2s ease-in-out infinite;
  }

  .error-title {
    font-size: 32px;
    font-weight: 600;
    color: #333;
    margin-bottom: 16px;

    @media (max-width: 768px) {
      font-size: 24px;
    }
  }

  .error-description {
    font-size: 16px;
    color: #666;
    line-height: 1.6;
    margin-bottom: 40px;

    @media (max-width: 768px) {
      font-size: 14px;
      margin-bottom: 30px;
    }
  }
}

// 操作按钮区域
.error-actions {
  margin-bottom: 40px;
  .el-button {
    margin-right: 16px;
    margin-bottom: 10px;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.3s ease;
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
    &.el-button--primary {
      background: linear-gradient(135deg, $primary-color 0%, #5a9fd4 100%);
      border: none;
      &:hover {
        background: linear-gradient(135deg, #3a8ee6 0%, #4a8fc4 100%);
      }
    }
    i {
      margin-right: 8px;
    }
  }
}

// 建议链接区域
.error-suggestions {
  .suggestions-title {
    font-size: 16px;
    color: #666;
    margin-bottom: 16px;
  }
  .suggestions-list {
    list-style-type: none;
    li {
      margin-bottom: 10px;
      .suggestion-link {
        color: $primary-color;
        text-decoration: none;
        font-size: 14px;
        padding: 8px 12px;
        border-radius: 6px;
        display: inline-block;
        transition: all 0.3s ease;

        &:hover {
          background-color: rgba($primary-color, 0.1);
          transform: translateX(4px);
        }

        /* 为建议链接添加箭头图标 */
        &::before {
          content: "→"; /* 使用箭头符号作为前缀 */
          margin-right: 8px; /* 设置箭头与文字的间距 */
          // transition: transform 0.3s ease; /* 添加transform过渡动画效果 */
        }
      }
    }
  }
}

// 动画定义
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}
</style>
