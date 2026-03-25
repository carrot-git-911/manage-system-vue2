import store from '@/store'
import router from './index'
import asyncRoutes from './asyncRoutes'

// 基础白名单：未登录允许访问的页面
const whiteList = ['/login', '/404']

let routesAdded = false

const hasPermission = (permission, permissions) => {
  if (!permission) return true
  if (!Array.isArray(permissions)) return false
  if (permissions.includes('*')) return true
  return permissions.includes(permission)
}

const filterAsyncRoutes = (routes, permissions) => {
  if (!Array.isArray(routes)) return []

  return routes.reduce((acc, route) => {
    const metaPermission = route?.meta?.permission
    const matchByPermission = hasPermission(metaPermission, permissions)

    let filteredChildren = []
    if (Array.isArray(route.children) && route.children.length > 0) {
      filteredChildren = filterAsyncRoutes(route.children, permissions)
    }

    // 若父节点自身有权限，直接保留；
    // 若父节点无权限但子节点过滤后仍有可访问项，也保留父节点（供 redirect/嵌套结构使用）
    if (matchByPermission || filteredChildren.length > 0) {
      acc.push({
        ...route,
        ...(filteredChildren.length > 0 ? { children: filteredChildren } : {})
      })
    }

    return acc
  }, [])
}

router.beforeEach((to, from, next) => {
  const token = store.getters['user/token']
  const permissions = store.getters['user/permissions'] || []

  // 未注入动态路由：首次进入且已登录时进行注入
  if (token && !routesAdded) {
    if (!Array.isArray(permissions) || permissions.length === 0) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }, // 携带重定向地址 在登录页 src/views/login/index.vue 登录成功后读取这个参数
        replace: true
      })
      return
    }
    const filteredAsyncRoutes = filterAsyncRoutes(asyncRoutes, permissions)
    // `router.addRoutes(routes: RouteConfig[])` 在当前类型定义中被标记为弃用，
    // 改为逐条调用 `addRoute` 来避免弃用签名警告。
    filteredAsyncRoutes.forEach(route => {
      router.addRoute(route)
    })
    routesAdded = true
    next({ ...to, replace: true })
    return
  }

  // 已登录访问登录页：直接重定向到首页
  if (token && to.path === '/login') {
    next({ path: '/', replace: true })
    return
  }

  // 白名单页面直接放行
  if (whiteList.includes(to.path)) {
    next()
    return
  }

  // 未登录访问非白名单页面：跳转登录页，并携带重定向地址
  if (!token) {
    next({
      path: '/login',
      query: { redirect: to.fullPath },
      replace: true
    })
    return
  }

  // 默认放行（后续动态路由/权限过滤会在这里继续扩展）
  next()
})
