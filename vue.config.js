const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 开发时仅 warning 提示，不阻断热更新；生产构建由 CI/lint 脚本把关
  lintOnSave: process.env.NODE_ENV !== 'production' ? 'warning' : false,
  devServer: {
    port: 8080,
    open: true,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://localhost:3000',
        changeOrigin: true, // 允许跨域
        pathRewrite: { [`^${process.env.VUE_APP_BASE_API}`]: '' }
      }
    }
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  }
})
