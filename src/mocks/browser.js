import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// 创建MSW worker实例
export const worker = setupWorker(...handlers)

// 启动MSW的函数
export const startMocking = async () => {
  if (process.env.NODE_ENV === 'development' && process.env.VUE_APP_MOCK === 'true') {
    try {
      await worker.start({
        onUnhandledRequest: 'bypass', // 未处理的请求直接通过
        serviceWorker: {
          url: '/mockServiceWorker.js'
        }
      })
      console.log('🔶 MSW Mock服务已启动')
    } catch (error) {
      console.error('MSW启动失败:', error)
    }
  }
}