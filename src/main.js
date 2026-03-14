import 'normalize.css/normalize.css'
import '@/styles/index.scss'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/utils/element' // Element UI 按需引入（组件注册与 $message 等）

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
