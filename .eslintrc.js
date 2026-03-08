module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true
  },
  extends: [
    // Vue 2 推荐规则集（包含 essential + 更多最佳实践）
    'plugin:vue/recommended',
    'eslint:recommended',
    // prettier 必须放最后，覆盖与格式相关的冲突规则
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    // Vue 规则微调
    'vue/html-self-closing': [
      'error',
      {
        html: { void: 'always', normal: 'never', component: 'always' },
        svg: 'always',
        math: 'always'
      }
    ],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/no-v-html': 'warn',
    'vue/order-in-components': 'error',

    // JS 通用规则
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'no-var': 'error',
    'prefer-const': ['error', { destructuring: 'all' }]
  }
}
