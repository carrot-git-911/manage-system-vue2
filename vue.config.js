// 引入Vue CLI服务的配置定义函数
const { defineConfig } = require("@vue/cli-service");
// 引入path模块用于路径解析
const path = require("path");

// 路径解析辅助函数
function resolve(dir) {
  return path.join(__dirname, dir);
}

// 导出Vue CLI配置
module.exports = defineConfig({
  // 需要通过Babel转译的依赖包，设置为true表示转译所有node_modules中的依赖
  transpileDependencies: true,

  // 部署应用包时的基本URL，根据环境变量设置公共路径
  // 在开发环境下通常为'/'，生产环境可能需要设置为CDN地址或子目录
  publicPath: process.env.VUE_APP_PUBLIC_PATH || "/",

  // 构建时生成的生产环境构建文件的目录
  outputDir: "dist",

  // 放置生成的静态资源(js、css、img、fonts)的目录(相对于outputDir)
  assetsDir: "static",

  // 是否在开发环境下通过eslint-loader在每次保存时lint代码
  // 设置为false可以提高开发时的构建速度
  lintOnSave: false,

  // 是否在生产环境构建时生成sourceMap文件
  // 设置为false可以减小构建包的大小，但调试会比较困难
  productionSourceMap: false,
  // 开发服务器配置
  devServer: {
    // 开发服务器端口号
    port: 8080,

    // 启动开发服务器时是否自动打开浏览器
    open: false,

    // 代理配置，用于解决开发环境的跨域问题
    proxy: {
      // 匹配以'/api'开头的请求
      "/api": {
        // 代理目标地址，从环境变量中获取后端API地址
        target: process.env.VUE_APP_BASE_API,

        // 是否改变请求头中的origin字段，解决跨域问题
        changeOrigin: true,

        // 是否验证SSL证书，开发环境通常设置为false
        secure: false,

        // 路径重写规则，将'/api'前缀从请求路径中移除
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  // webpack配置修改
  configureWebpack: {
    // 模块解析配置
    resolve: {
      // 路径别名配置，简化import路径
      alias: {
        // '@'指向src目录，是最常用的别名
        "@": resolve("src"),

        // 组件目录别名，方便引入公共组件
        components: resolve("src/components"),

        // 视图/页面目录别名
        views: resolve("src/views"),

        // 静态资源目录别名
        assets: resolve("src/assets"),

        // 工具函数目录别名
        utils: resolve("src/utils"),

        // 样式文件目录别名
        styles: resolve("src/assets/styles"),
      },
    },
  },
});
