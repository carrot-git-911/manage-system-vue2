const systemRoutes = [
  {
    path: '/system',
    name: 'System',
    component: () => import('@/layouts/index.vue'),
    redirect: '/system/user',
    meta: { title: '系统管理', icon: 'setting', permission: 'system:view' },
    children: [
      {
        path: 'user', // 注意：子路由这里不加 /
        name: 'SystemUser',
        component: () => import('@/views/system/user/index.vue'),
        meta: { title: '用户管理', permission: 'system:user:list' }
      },
      {
        path: 'role',
        name: 'SystemRole',
        component: () => import('@/views/system/role/index.vue'),
        meta: { title: '角色管理', permission: 'system:role:list' }
      }
    ]
  }
]

export default systemRoutes
