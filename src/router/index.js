import Vue from "vue";
import Router from "vue-router";
import Layout from "@/components/common/Layout/index.vue";
// import { baseRoutes } from "./routes/base";
// import { userRoutes } from "./routes/user";

Vue.use(Router);

// 基础路由
// const constantRoutes = [
//   ...baseRoutes,
//   // 404页面必须放在最后
//   { path: '*', redirect: '/404', hidden: true }
// ]

// 异步路由
// const asyncRoutes = [
//   ...userRoutes,
//   // 404页面必须放在最后
//   { path: '*', redirect: '/404', hidden: true }
// ]

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/Login/index.vue"),
    meta: {
      title: "登录",
      hidden: true,
    },
  },
  {
    path: "/404",
    component: () => import("@/views/404/index.vue"),
    meta: {
      title: "404",
      hidden: true,
    },
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    meta: {
      hidden: true,
      requiresAuth: true,
    },
    children: [
      {
        path: "/dashboard",
        component: () => import("@/views/Dashboard/index.vue"), // TODO: 文件夹名字大小写问题
        meta: {
          title: "首页",
        },
      },
    ],
  },
  {
    path: "/user",
    component: Layout,
    meta: {
      title: "用户管理",
      requiresAuth: true,
      icon: "el-icon-user",
    },
    children: [
      {
        path: "/user/list",
        component: () => import("@/views/user/List.vue"),
        meta: {
          title: "用户列表",
          requiresAuth: true,
          icon: "el-icon-user-solid",
        },
      },
      {
        path: "/user/add",
        component: () => import("@/views/user/Add.vue"),
        meta: {
          title: "添加用户",
          requiresAuth: true,
          icon: "el-icon-plus",
        },
      },
    ],
  },
  // 404 重定向必须放在最后
  {
    path: "*",
    redirect: "/404",
    meta: {
      hidden: true,
    },
  },
];

const createRouter = () =>
  new Router({
    mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// 重置路由
export const resetRouter = () => {
  router.matcher = createRouter().matcher;
};

// 路由守卫
// router.beforeEach((to, from, next) => {
//   // 检查用户是否已登录
//   const token = localStorage.getItem('token');

//   // 需要登录的页面
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

//   if (requiresAuth && !token) {
//     next('/login');
//   } else if (token && to.path === '/login') {
//     next('/');
//   } else {
//     next();
//   }
// });

// 路由守卫二
const whiteList = ["/login", "/404"];

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  console.log(token, to);
  if (whiteList.includes(to.path)) {
    if (token && to.path === "/login") {
      next("/dashboard");
    } else {
      next();
    }
  } else {
    if (token) {
      console.log("有token", typeof token);
      next();
    } else {
      next("/login");
    }
  }
});

export default router;
