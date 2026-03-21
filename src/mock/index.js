import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

const worker = setupWorker(...handlers)

export const setupMock = async () => {
  await worker.start({
    onUnhandledRequest: 'warn', // 非 Mock 接口直接放行，不报警告
    serviceWorker: {
      url: '/mockServiceWorker.js' // 指定 Service Worker 文件路径
    }
  })
}
