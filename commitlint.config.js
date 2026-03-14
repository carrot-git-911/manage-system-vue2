/**
 * Commitlint 配置：规范提交信息格式（Conventional Commits）
 * 提交格式：<type>(<scope>): <subject>
 * 示例：feat(user): 添加登录接口
 *
 * 常用 type 说明：
 *   feat     新功能
 *   fix      修复 bug
 *   docs     仅文档
 *   style    格式（空格、分号等，不影响逻辑）
 *   refactor 重构（既不是新功能也不是修 bug）
 *   perf     性能优化
 *   test     测试相关
 *   chore    构建/工具/依赖等
 *   ci       CI 配置或脚本
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'ci'
      ]
    ],
    'subject-case': [0],
    'header-max-length': [0]
  }
}
