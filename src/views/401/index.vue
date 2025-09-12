<template>
  <div class="error-401">
    <div class="not-allow-container">
      <!-- 401 GIF 图片 -->
      <div class="not-allow-image">
        <!-- <img src="@/assets/401_images/401.gif" alt="401" /> -->
        <img src="@/assets/401_images/401_test.gif" alt="401" />
      </div>

      <!-- 错误信息 -->
      <div class="not-allow-content">
        <div class="not-allow-code">401</div>
        <div class="not-allow-title">未授权</div>
        <div class="not-allow-description">
          抱歉，您没有权限访问此页面。这可能是因为：
        </div>
        <ul class="not-allow-reasons">
          <li>您的登录会话已过期</li>
          <li>您没有足够的权限访问此资源</li>
          <li>需要重新进行身份验证</li>
        </ul>
        <!-- 操作按钮区域 -->
        <div class="not-allow-actions">
          <el-button
            type="primary"
            class="not-allow-actions__btn"
            @click="reLogin"
          >
            <i class="el-icon-user"></i>
            重新登录
          </el-button>
          <el-button type="info" class="not-allow-actions__btn" @click="goBack">
            <i class="el-icon-back"></i>
            返回首页
          </el-button>
        </div>
        <!-- 建议链接 -->
        <div class="not-allow-suggestions">
          <p>如果问题持续存在，请联系管理员。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "401",
  methods: {
    // 重新登录
    reLogin() {
      this.$router.push({ name: "login" });
    },
    // 返回首页
    goBack() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style lang="scss" scoped>
.error-401 {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .not-allow-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.not-allow-image {
  margin-right: 40px;
}

.not-allow-content {
  .not-allow-code {
    font-size: 100px;
    font-weight: bold;
    color: #ff4d4f;
  }
  .not-allow-title {
    font-size: 30px;
    font-weight: bold;
    color: #303133;
  }
  .not-allow-description {
    font-size: 16px;
    color: #606266;
  }
  .not-allow-reasons {
    font-size: 16px;
    color: #606266;
  }
  .not-allow-actions {
    margin-top: 20px;
    .not-allow-actions__btn {
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
      }
    }
  }
  .not-allow-suggestions {
    margin-top: 20px;
    border-top: 1px solid #e4e7ed;
    font-size: 16px;
    color: #606266;
  }
}
</style>
