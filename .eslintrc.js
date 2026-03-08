module.exports = {
  // 标记为根配置，ESLint 不会再向上层目录查找其他配置文件
  root: true,

  // 声明代码运行环境，ESLint 据此判断哪些全局变量是合法的
  env: {
    node: true, // 允许使用 Node.js 全局变量（如 require、module、__dirname）
    browser: true, // 允许使用浏览器全局变量（如 window、document、localStorage）
    es6: true // 启用 ES6+ 全局变量（如 Promise、Map、Set）
  },

  // 继承的规则集，优先级从上到下依次升高，后者会覆盖前者的冲突项
  extends: [
    // Vue 2 推荐规则集：涵盖模板语法、组件写法等最佳实践（比 essential 更严格）
    'plugin:vue/recommended',
    // ESLint 官方推荐规则：覆盖常见 JS 错误（如未声明变量、重复 case 等）
    'eslint:recommended',
    // 集成 Prettier：禁用所有与格式化冲突的 ESLint 规则，将格式检查交给 Prettier
    // 必须放最后，确保 Prettier 的格式规则优先级最高
    'plugin:prettier/recommended'
  ],

  // 解析器配置：ESLint 默认解析器不支持 Babel 语法，需要指定 @babel/eslint-parser
  parserOptions: {
    // 使用 Babel 解析器处理 ES 新语法（装饰器、可选链等）
    parser: '@babel/eslint-parser',
    // 不要求项目根目录存在 babel.config.js，避免在无 Babel 配置时报错
    requireConfigFile: false
  },

  rules: {
    // 生产环境将 console/debugger 视为警告（提醒清理调试代码），开发环境关闭避免干扰
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    // ── Vue 模板规则 ──────────────────────────────────────────────────────────

    // 统一自闭合标签写法：
    //   void 元素（<br> <img>）必须自闭合；普通 HTML 标签（<div>）不自闭合；
    //   Vue 组件标签（<MyComp>）必须自闭合
    'vue/html-self-closing': [
      'error',
      {
        html: { void: 'always', normal: 'never', component: 'always' },
        svg: 'always',
        math: 'always'
      }
    ],

    // 模板中的组件名必须使用 PascalCase（如 <MyButton>），与 JS 导入命名保持一致
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],

    // 禁止直接使用 v-html，防止 XSS 攻击（仍可用但会收到警告，需人工审查）
    'vue/no-v-html': 'warn',

    // 强制组件选项按规范顺序排列（name → components → props → data → computed → ...）
    // 统一代码结构，便于阅读和维护
    'vue/order-in-components': 'error',

    // ── JavaScript 通用规则 ──────────────────────────────────────────────────

    // 必须使用严格相等 ===，避免隐式类型转换带来的 bug；null 比较除外（兼容 == null 写法）
    eqeqeq: ['error', 'always', { null: 'ignore' }],

    // 禁止使用 var，统一使用 let/const，避免变量提升导致的作用域问题
    'no-var': 'error',

    // 优先使用 const 声明不会被重新赋值的变量；解构时只要有一个变量会被重新赋值就允许用 let
    'prefer-const': ['error', { destructuring: 'all' }]
  }
}
