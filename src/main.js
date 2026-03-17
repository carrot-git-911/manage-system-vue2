import 'normalize.css/normalize.css'
import '@/styles/index.scss'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 仅在开发环境启用 Mock 接口
if (process.env.NODE_ENV === 'development') {
  console.log('启用 Mock 接口')
  require('./mock')
}

import '@/utils/element' // Element UI 按需引入（组件注册与 $message 等）

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
