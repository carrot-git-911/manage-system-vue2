import Vue from 'vue'
import VueRouter from 'vue-router'
import constantRoutes from '@/router/constantRoutes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: './', // process.env.BASE_URL TODO
  constantRoutes
})

export default router
