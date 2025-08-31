import Layout from '@/components/common/Layout/index.vue'

export const baseRoutes = [
  //  {
  //   path: '/login',
  //   name: 'Login',
  //   component: () => import('@/views/Login/Login.vue'),
  //   hidden: true,
  //   meta: {
  //     requiresAuth: false,
  //     title: '登录'
  //   }
  // },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/404.vue'),
    hidden: true,
    meta: {
      requiresAuth: false,
      title: '页面不存在'
    }
  },
]