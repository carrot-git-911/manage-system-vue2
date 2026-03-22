import Vue from 'vue'
import VueRouter from 'vue-router'
import constantRoutes from '@/router/constantRoutes'

Vue.use(VueRouter)

console.log(constantRoutes)

const router = new VueRouter({
  mode: 'history',
  base: './', // process.env.BASE_URL TODO
  routes: constantRoutes
})

export default router
