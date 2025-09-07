import { authHandlers } from './auth'

// 导出所有API处理器
export const handlers = [
  ...authHandlers,
  // 可以在这里添加其他模块的handlers
  // ...userHandlers,
  // ...productHandlers,
]