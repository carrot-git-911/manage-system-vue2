const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: false, // 这里避免对 `node_modules` 全量转译，防止 Babel 解析现代语法库（如 msw）时缺少 private-methods 插件导致编译失败
  // 开发时仅 warning 提示，不阻断热更新；生产构建由 CI/lint 脚本把关
  lintOnSave: process.env.NODE_ENV !== 'production' ? 'warning' : false,
  devServer: {
    port: 8080,
    open: false
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  }
})
