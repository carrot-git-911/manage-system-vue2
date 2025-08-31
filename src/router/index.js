import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      hidden: true,
    },
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
      hidden: true,
    },
  },
  {
    path: '/',
    component: Layout,
    meta: {
      title: '首页',
      hidden: true,
    },
  }
]


const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
});

const router = createRouter();

// 重置路由
export const resetRouter = () => {
  router.matcher = createRouter().matcher;
};

// 路由守卫
router.beforeEach((to, from, next) => {
  // 检查用户是否已登录
  const token = localStorage.getItem('token');

  // 需要登录的页面
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !token) {
    next('/login');
  } else if (token && to.path === '/login') {
    next('/');
  } else {
    next();
  }
});

// 路由守卫二
// const whiteList = ['/login', '/404'];

// router.beforeEach((to, from, next) => {
//   if (whiteList.includes(to.path)) {
//     next();
//   } else {
//     const token = localStorage.getItem('token');
//     if (token) {
//       next();
//     } else {
//       next('/login');
//     }
//   }
// });

export default router;
