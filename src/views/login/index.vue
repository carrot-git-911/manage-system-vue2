<template>
  <div class="login">
    <div class="login-card">
      <h2 class="login-title">系统登录</h2>
      <el-form
        ref="loginForm"
        :model="form"
        :rules="rules"
        label-width="70px"
        @keyup.enter.native="handleLogin"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model.trim="form.username" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model.trim="form.password"
            type="password"
            show-password
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="submitLoading"
            style="width: 100%"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api'
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      submitLoading: false,
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleLogin() {
      if (this.submitLoading) return
      this.$refs.loginForm.validate(async valid => {
        if (!valid) return
        this.submitLoading = true
        try {
          const data = await login(this.form)
          console.log(data)
          this.$store.dispatch('user/setToken', data)
          this.submitLoading = false
          this.$message.success('登录成功')
          this.$router.push('/')
        } catch {
          this.submitLoading = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  background-color: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  width: 360px;
  padding: 32px 28px 24px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.login-title {
  margin: 0 0 24px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
}
</style>
