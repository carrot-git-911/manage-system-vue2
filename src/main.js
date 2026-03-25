import 'normalize.css/normalize.css'
import '@/styles/index.scss'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/router/permission'
import store from './store'

import '@/utils/element' // Element UI 按需引入（组件注册与 $message 等）

Vue.config.productionTip = false

async function bootstrap() {
  console.log('bootstrap')
  console.log(process.env.NODE_ENV)
  console.log(process.env.VUE_APP_USE_MOCK)
  if (
    process.env.NODE_ENV === 'development' &&
    process.env.VUE_APP_USE_MOCK === 'true'
  ) {
    console.log('启用 MSW Mock')
    // 启用 MSW Mock
    const { setupMock } = await import('@/mock')
    await setupMock()
    console.log('MSW Mock 启动成功')
  }
  // 创建 Vue 实例
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}
bootstrap()
