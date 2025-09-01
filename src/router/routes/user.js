import Layout from '@/components/common/Layout/index.vue'

export const userRoutes = [
 {
    path: '/user',
    component: Layout,
    meta: {
      title: '用户管理',
      requiresAuth: true,
      icon: 'el-icon-user'
    },
    children: [
      {
        path: '/user/list',
        component: () => import('@/views/user/List.vue'),
        meta: {
          title: '用户列表',
          requiresAuth: true,
          icon: 'el-icon-user-solid',
        },
      },
      {
        path: '/user/add',
        component: () => import('@/views/user/Add.vue'),
        meta: {
          title: '添加用户',
          requiresAuth: true,
          icon: 'el-icon-plus'
        },
      },
    ]
  },
]