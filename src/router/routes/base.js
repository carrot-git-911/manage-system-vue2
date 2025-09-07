import Layout from '@/components/common/Layout/index.vue'

export const baseRoutes = [
   {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/index.vue'),
    hidden: true,
    meta: {
      requiresAuth: false,
      title: '登录'
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
    hidden: true,
    meta: {
      requiresAuth: false,
      title: '页面不存在'
    }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      hidden: true,
      requiresAuth: true,
    },
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/Dashboard/index.vue'), // TODO: 文件夹名字大小写问题
        meta: {
          title: '首页'
        },
      },
    ]
  },
]