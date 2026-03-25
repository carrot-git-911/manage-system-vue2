import Vue from 'vue'
import VueRouter from 'vue-router'
import constantRoutes from '@/router/constantRoutes'
// import asyncRoutes from '@/router/asyncRoutes'

Vue.use(VueRouter)

const routes = [...constantRoutes]
const router = new VueRouter({
  mode: 'history',
  base: './', // process.env.BASE_URL TODO
  routes
})

export default router
