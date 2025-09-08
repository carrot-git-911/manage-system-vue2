<template>
  <div class="login-container">
    <div class="login-left">图片占位</div>
    <div class="login-right">
      <div class="login-right-content">
        <!-- 登录表单 -->
        <div class="login-form-wrapper">
          <div class="logo">
            <img src="@/assets/logo.png" alt="Shipla" />
          </div>
          <h2>登录Shipla ERP 后台管理系统</h2>
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            label-width="120px"
          >
            <el-form-item prop="username" label="用户名或邮箱">
              <el-input
                v-model="loginForm.username"
                placeholder="请输入用户名或邮箱"
              />
            </el-form-item>
            <el-form-item prop="password" label="密码">
              <el-input
                v-model="loginForm.password"
                placeholder="请输入密码"
                type="password"
              />
            </el-form-item>
            <el-form-item>
              <!-- <el-checkbox v-model="rememberPassword" style="margin-left: 10px"
                >记住密码</el-checkbox
              >
              <el-link type="primary" style="margin-left: 20px"
                >忘记密码</el-link
              > -->
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                style="width: 100%"
                @click="login"
                :loading="loginLoading"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
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
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  .login-left {
    width: 50%;
    height: 100%;
    background-color: #fff;
    border-radius: 10px 0 0 10px;
    .login-left-content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .login-right {
    width: 50%;
    height: 100%;
    background-color: #fff;
    border-radius: 0 10px 10px 0;
    .login-right-content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .login-form-wrapper {
        width: 400px;
        height: 400px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .logo {
          width: 40px;
          height: 40px;
          margin-bottom: 20px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
