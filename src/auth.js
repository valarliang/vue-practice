import router from './router';
import store from './store';

const whiteList = ['/login']

export async function getAccessibleRoutes() {
  const roles = await store.dispatch('user/getInfo')
  // 根据当前用户角色动态生成路由
  const accessRoutes = await store.dispatch('auth/generateRoutes', roles)
  router.addRoutes(accessRoutes)
}

router.beforeEach(async (to, from, next) => {
  const hasToken = localStorage.getItem('token')
  if (hasToken) {
    // if (to.path === '/login') next('/')
    // else {
      const hasRoles = store.state.user.roles.length > 0
      console.log(hasRoles)
      if (!hasRoles) {
        try {
          await getAccessibleRoutes()
          next({...to, replace: true})
        } catch (error) {
          // 出错需重置令牌并重新登录(令牌过期、网络错误等原因)
          await store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
          alert(error || '未知错误')
        }
      } else next()
    // }
  } else {
    if (whiteList.indexOf(to.path) !== -1) next()
    else next(`/login?redirect=${to.path}`)
  }
})