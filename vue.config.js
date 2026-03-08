const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 开发时仅 warning 提示，不阻断热更新；生产构建由 CI/lint 脚本把关
  lintOnSave: process.env.NODE_ENV !== 'production' ? 'warning' : false
})
