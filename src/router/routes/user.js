import Layout from '@/components/common/Layout/index.vue'

const userRoutes = [
  {
    path: '/user',
    name: 'User',
    component: Layout,
    meta: {
      requiresAuth: true,
      title: '用户管理'
    },
    children: [
      {
        path: '/user/list',
        name: 'UserList',
        component: () => import('@/views/User/List.vue'),
        meta: {
          requiresAuth: true,
          title: '用户列表'
        }
      }
    ]
  }
]