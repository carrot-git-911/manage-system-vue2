<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-image-container">
        <div class="login-image"></div>
      </div>
      <div class="login-form-container">
        <div class="login-logo">
          <h2>登录</h2>
          <p>登录后即可查看和管理系统</p>
        </div>
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名或邮箱"
            >
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              placeholder="请输入密码"
              :type="showPassword ? 'text' : 'password'"
            >
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
              <i
                slot="suffix"
                :class="showPassword ? 'el-icon-open' : 'el-icon-turn-off'"
                class="password-toggle-icon"
                @click="togglePasswordVisibility"
                :title="showPassword ? '隐藏密码' : '显示密码'"
              ></i>
            </el-input>
          </el-form-item>
          <!--  -->
          <div class="login-form-actions">
            <el-checkbox v-model="rememberMe">记住我</el-checkbox>
            <el-link type="primary" @click="handleRegister">忘记密码?</el-link>
          </div>
          <!-- 登录按钮 -->
          <el-form-item>
            <el-button
              type="primary"
              :loading="loginLoading"
              size="mini"
              class="login-button"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
          <div class="register-link">
            <span>还没有账号?</span>
            <router-link to="/register" class="create-account">
              立即注册
            </router-link>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456",
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名或邮箱", trigger: "blur" },
          { min: 3, message: "用户名至少3个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码至少6个字符", trigger: "blur" },
        ],
      },
      showPassword: false,
      rememberPassword: false,
      loginLoading: false,
      rememberMe: false,
    };
  },
  methods: {
    async login() {
      // 表单验证
      const valid = await this.$refs.loginForm.validate().catch(() => false);
      if (!valid) {
        return;
      }
      this.loginLoading = true;
      try {
        // 使用 Vuex user 模块进行登录
        const res = await this.$store.dispatch("user/login", this.loginForm);

        console.log(res);

        this.$message({
          message: "登录成功",
          type: "success",
        });

        // 可选：获取用户信息
        await this.$store.dispatch("user/getUserInfo");

        // 登录成功，跳转到首页
        // this.$router.push({ path: "/dashboard" });
      } catch (error) {
        this.$message({
          message: error.message || "登录失败",
          type: "error",
        });
      } finally {
        this.loginLoading = false;
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    handleRegister() {
      // this.$router.push({ path: "/register" });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  .login-box {
    width: 80%;
    max-width: 1000px;
    height: 700px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    .login-image-container {
      width: 50%;
      height: 100%;
      background: url(https://vuejs-core.cn/vue3-admin-better/static/background..jpg)
        center center no-repeat;
      background-size: cover;
    }
    .login-form-container {
      width: 50%;
      padding: 50px;
      display: flex;
      flex-direction: column;
      .login-logo {
        margin-bottom: 40px;
        text-align: center;
      }
      .login-form-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .login-button {
        width: 100%;
        height: 45px;
        border-radius: 22px;
        font-size: 16px;
        font-weight: 500;
        letter-spacing: 1px;
        background: linear-gradient(90deg, #409eff 0%, #007aff 100%);
        border: none;
        margin-top: 15px;
      }
      .register-link {
        margin-top: 20px;
        text-align: center;
        font-size: 14px;
        .create-account {
          color: #409eff;
        }
      }
    }
  }
}

.password-toggle-icon {
  cursor: pointer;
  color: #c0c4cc;
  transition: color 0.3s;

  &:hover {
    color: #409eff;
  }
}
</style>
