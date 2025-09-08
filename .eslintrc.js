module.exports = {
  // 指定此配置文件为根配置，停止向上查找
  root: true,
  // 指定代码运行环境
  env: {
    node: true, // Node.js 全局变量和作用域
    browser: true, // 浏览器全局变量和作用域
    es6: true, // 启用 ES6 全局变量和语法
  },
  // 继承 eslint 推荐规则
  extends: [
    "plugin:vue/essential", // Vue.js 基础规则
    "eslint:recommended", // 推荐规则
    "plugin:prettier/recommended", // 集成 Prettier 规则
  ],
  // 解析器选项
  parserOptions: {
    parser: "@babel/eslint-parser", // 使用 Babel 解析器
    requireConfigFile: false, // 不要求配置文件
    ecmaVersion: 2020, // ECMAScript 版本
    sourceType: "module", // 使用 ES 模块
    ecmaFeatures: {
      jsx: false, // 不启用 JSX
    },
  },
  // 自定义规则
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off", // 生产环境禁用 console
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off", // 生产环境禁用 debugger
    "vue/multi-word-component-names": "off", // 组件名可以使用单单词
    "prettier/prettier": "warn", // 开启 Prettier 规则
  },
};
