import { routes as constRoutes } from '@/router';
import asyncRoutes from '@/router/dynamic';
import notFound from '@/router/notFound.js'

function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res;
}

function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role));
  } else {
    return true;
  }
}

export default {
  namespaced: true,
  state: {
    routes: constRoutes, // 完整路由表
    accessibleRoutes: [] // 用户可访问路由表
  },
  mutations: {
    SET_ROUTES: (state, accessibleRoutes) => {
      state.accessibleRoutes = accessibleRoutes;
      state.routes = constRoutes.concat(accessibleRoutes);
    }
  },
  actions: {
    // 路由生成:在得到用户角色后会第一时间调用
    generateRoutes({ commit }, roles) {
      return new Promise(resolve => {
        // 根据角色做过滤处理
        const accessibleRoutes = filterAsyncRoutes(asyncRoutes, roles)
        accessibleRoutes.push(notFound)
        commit("SET_ROUTES", accessibleRoutes)
        resolve(accessibleRoutes)
      })
    }
  }
}