import { asyncRoutes } from '@/router/routes';

/**
 * 通过递归过滤异步路由表
 * @param routes asyncRoutes
 * @param roles 用户角色
 */

function filterAsyncRoutes(routes, roles) {
  const res = [];
  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  })
  return res;
}

/**
 * 检查用户是否有对该路由的权限
 * @param roles 用户角色
 * @param route 路由
 * @returns {boolean}
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role));
  }
  return true;
}

/**
 * 生成可访问的路由
 * @param roles 用户角色
 */
export function generateRoutes(roles) {
  return filterAsyncRoutes(asyncRoutes, roles);
}

/**
 * 动态加载组件
 * @param view 组件路径
 * @returns {function(): *}
 */
export const loadView = (view) => {
  return () => import(`@/views/${view}`);
}