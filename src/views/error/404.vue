<template>
  <div class="error-404">
    <div class="error-404__bg" aria-hidden="true">
      <span class="error-404__orb error-404__orb--1"></span>
      <span class="error-404__orb error-404__orb--2"></span>
      <span class="error-404__orb error-404__orb--3"></span>
    </div>

    <div class="error-404__card">
      <p class="error-404__code" aria-label="404">404</p>
      <h1 class="error-404__title">页面走丢了</h1>
      <p class="error-404__desc">
        您访问的地址不存在，或已被移动。请检查链接是否正确，或返回首页继续浏览。
      </p>
      <div class="error-404__actions">
        <el-button type="primary" @click="goHome">返回首页</el-button>
        <el-button @click="goBack">返回上一页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    goHome() {
      this.$router.replace('/')
    },
    goBack() {
      if (window.history.length > 1) {
        this.$router.go(-1)
      } else {
        this.goHome()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.error-404 {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f2f5;
}

.error-404__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.error-404__orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(64px);
  opacity: 0.45;
  animation: float 18s ease-in-out infinite;
}

.error-404__orb--1 {
  width: 320px;
  height: 320px;
  top: -80px;
  right: -40px;
  background: linear-gradient(135deg, #409eff 0%, #79bbff 100%);
  animation-delay: 0s;
}

.error-404__orb--2 {
  width: 260px;
  height: 260px;
  bottom: 10%;
  left: -60px;
  background: linear-gradient(135deg, #a0cfff 0%, #ecf5ff 100%);
  animation-delay: -6s;
}

.error-404__orb--3 {
  width: 180px;
  height: 180px;
  top: 40%;
  right: 15%;
  background: linear-gradient(135deg, #b3d8ff 0%, #d9ecff 100%);
  animation-delay: -12s;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(12px, -16px) scale(1.03);
  }
  66% {
    transform: translate(-10px, 10px) scale(0.98);
  }
}

.error-404__card {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 440px;
  margin: 24px;
  padding: 48px 40px 40px;
  text-align: center;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
}

.error-404__code {
  margin: 0;
  font-size: 88px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -4px;
  background: linear-gradient(120deg, #409eff 0%, #66b1ff 45%, #a0cfff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  user-select: none;
}

.error-404__title {
  margin: 16px 0 12px;
  font-size: 22px;
  font-weight: 600;
  color: #303133;
}

.error-404__desc {
  margin: 0 0 32px;
  font-size: 14px;
  line-height: 1.7;
  color: #606266;
}

.error-404__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}
</style>
