/**
 * 从 vue-router 已注册路由生成侧栏菜单树（基于 router.getRoutes()）。
 * 与 store 中 accessibleRoutes 配合：在 computed 里读取 getter 以在动态 addRoute 后触发更新。
 */

/**
 * @param {import('vue-router').RouteRecord} record
 * @returns {boolean}
 */
function isMenuRouteRecord(record) {
  if (!record || !record.meta) return false
  if (record.meta.hidden === true) return false
  if (!record.meta.title) return false
  if (record.path === '*') return false
  return true
}

/**
 * @param {import('vue-router').default} router
 * @returns {{ path: string, name?: string, meta: Object, children: any[] }[]}
 */
export function buildMenuTreeFromRouter(router) {
  const records = router.getRoutes().filter(isMenuRouteRecord)
  const pathSet = new Set(records.map(r => r.path))
  const nodeMap = new Map()

  records.forEach(record => {
    nodeMap.set(record.path, {
      path: record.path,
      name: record.name,
      meta: { ...record.meta },
      children: []
    })
  })

  const roots = []

  records.forEach(record => {
    const node = nodeMap.get(record.path)
    const parent = record.parent
    if (parent && pathSet.has(parent.path)) {
      nodeMap.get(parent.path).children.push(node)
    } else {
      roots.push(node)
    }
  })

  const sortByPath = list => {
    list.sort((a, b) => a.path.localeCompare(b.path))
    list.forEach(n => {
      if (n.children.length) sortByPath(n.children)
    })
  }
  sortByPath(roots)

  return roots
}
