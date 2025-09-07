<template>
  <div class="login-container">
    <div class="login-background">
      <!-- 背景装饰元素 -->
    </div>
    <div class="login-card">
      <div class="login-header">
        <!-- LOGO和标题 -->
        <div class="login-logo">
          <div class="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <div class="login-title">
          管理系统登录
        </div>
        <div class="login-subtitle">
          欢迎回来，请输入您的凭据
        </div>
      </div>
      <!-- 登录表单 -->
      <div class="login-form">
        <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
          </el-form-item>
          <!-- 登录按钮 -->
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/auth'
import { rules } from 'eslint-config-prettier'
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名或邮箱', trigger: 'blur' },
          { min: 3, message: '用户名至少3个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码至少6个字符', trigger: 'blur' }
        ]
      },
      showPassword: false,
      rememberPassword: false,
      loginLoading: false
    }
  },
  methods: {
    async login() {
      try {
        const res = await login(this.form)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  // background-color: red;
  .login-card {
    width: 600px;
    height: 500px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    .login-header {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100px;
      .login-logo {
        width: 50px;
        height: 50px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .login-title {
        font-size: 24px;
        font-weight: bold;
        margin-left: 10px;
      }
    }
    .login-form {
      padding: 20px;
    }
  }
}
</style>
