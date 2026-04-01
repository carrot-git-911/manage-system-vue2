/**
 * 检查权限
 * @param {string} permission 权限
 * @param {string[]} permissions 权限列表
 * @returns {boolean} 是否有权限
 */
export const hasPermission = (permission, permissions) => {
  if (!permission) return true
  if (!Array.isArray(permissions)) return false
  if (permissions.includes('*')) return true
  return permissions.includes(permission)
}

/**
 * 过滤异步路由
 * @param {RouteConfig[]} routes 路由配置
 * @param {string[]} permissions 权限列表
 * @returns {RouteConfig[]} 过滤后的路由配置
 */
export const filterAsyncRoutes = (routes, permissions) => {
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
