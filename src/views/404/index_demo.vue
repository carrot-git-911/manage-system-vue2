<template>
  <div class="error-not-found">
    <div class="content-container">
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

        <!-- 建议链接 -->
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
  name: "NotFound",
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
    /**
     * 返回首页
     */
    async goHome() {
      this.homeLoading = true;
      try {
        await this.$router.push({ path: "/dashboard" });
      } catch (error) {
        console.error("导航到首页失败:", error);
        // 如果路由失败，尝试直接跳转
        window.location.href = "/dashboard";
      } finally {
        this.homeLoading = false;
      }
    },

    /**
     * 返回上一页
     */
    goBack() {
      this.backLoading = true;
      try {
        // 检查是否有历史记录
        if (window.history.length > 1) {
          this.$router.go(-1);
        } else {
          // 如果没有历史记录，跳转到首页
          this.goHome();
        }
      } catch (error) {
        console.error("返回上一页失败:", error);
        this.goHome();
      } finally {
        setTimeout(() => {
          this.backLoading = false;
        }, 500);
      }
    },
  },

  mounted() {
    // 页面加载完成后的处理
    document.title = "404 - 页面不存在";
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.error-not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  box-sizing: border-box;

  .content-container {
    max-width: 1200px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    padding: 60px 40px;
    backdrop-filter: blur(10px);
    animation: fadeInUp 0.8s ease-out;

    @media (max-width: 768px) {
      flex-direction: column;
      text-align: center;
      padding: 40px 20px;
    }
  }
}

// 错误图片区域
.error-img {
  position: relative;
  flex: 1;
  max-width: 500px;
  margin-right: 60px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 40px;
    max-width: 300px;
  }

  &__parent {
    width: 100%;
    height: auto;
    animation: float 3s ease-in-out infinite;
  }

  &__child {
    position: absolute;
    width: 80px;
    height: auto;
    opacity: 0.8;

    &.left {
      top: 20%;
      left: -10%;
      animation: float 3s ease-in-out infinite 0.5s;
    }

    &.middle {
      top: 10%;
      right: -5%;
      animation: float 3s ease-in-out infinite 1s;
    }

    &.right {
      bottom: 20%;
      right: -15%;
      animation: float 3s ease-in-out infinite 1.5s;
    }

    @media (max-width: 768px) {
      width: 60px;
    }
  }
}

// 错误内容区域
.error-content {
  flex: 1;
  max-width: 500px;

  .error-code {
    font-size: 120px;
    font-weight: bold;
    color: $primary-color;
    line-height: 1;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    animation: pulse 2s ease-in-out infinite;

    @media (max-width: 768px) {
      font-size: 80px;
    }
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
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
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

    @media (max-width: 768px) {
      width: 100%;
      margin-right: 0;
      margin-bottom: 12px;
    }
  }
}

// 建议链接区域
.error-suggestions {
  .suggestions-title {
    font-size: 16px;
    color: #333;
    margin-bottom: 16px;
    font-weight: 500;
  }

  .suggestions-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 8px;

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

        &:before {
          content: "→";
          margin-right: 8px;
          transition: transform 0.3s ease;
        }

        &:hover:before {
          transform: translateX(2px);
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
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
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

// 响应式设计
@media (max-width: 480px) {
  .error-not-found {
    padding: 10px;

    .content-container {
      padding: 30px 15px;
      border-radius: 15px;
    }
  }

  .error-content {
    .error-code {
      font-size: 60px;
    }

    .error-title {
      font-size: 20px;
    }

    .error-description {
      font-size: 13px;
    }
  }
}
</style>
