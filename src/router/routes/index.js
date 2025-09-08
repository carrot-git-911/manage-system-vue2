import { baseRoutes } from "./routes/base";
import { userRoutes } from "./routes/user";

export const constantRoutes = [
  ...baseRoutes,
  // 404页面必须放在最后
  { path: "*", redirect: "/404", hidden: true },
];

export const asyncRoutes = [
  ...userRoutes,
  { path: "*", redirect: "/404", hidden: true },
];
