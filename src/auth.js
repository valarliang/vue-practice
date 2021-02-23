import router, { createRouter, routes} from './router';
import store from './store';

const whiteList = ['/login']

async function getAccessibleRoutes() {
  const roles = await store.dispatch('user/getInfo')
  // 根据当前用户角色动态生成路由
  const accessRoutes = await store.dispatch('auth/generateRoutes', roles)
  router.matcher = createRouter(routes).matcher
  router.addRoutes(accessRoutes)
}

router.beforeEach(async (to, from, next) => {
  const hasToken = localStorage.getItem('token')
  console.log(hasToken, to, from)
  if (hasToken) {
    const hasRoles = store.state.user.roles.length > 0
    console.log('after---------', hasRoles)
    if (!hasRoles) {
      try {
        await getAccessibleRoutes()
        next({...to, replace: true}) // 动态添加路由后不会执行next()，报错Navigation cancelled from/... to /... with a new navigation
      } catch (error) {
        // 出错需重置令牌并重新登录(令牌过期、网络错误等原因)
        await store.dispatch('user/resetToken')
        next(`/login?redirect=${to.path}`)
        console.log('beforeEach catch error', error || '未知错误')
      }
    } else next()
  } else {
    if (whiteList.indexOf(to.path) !== -1) next()
    else next(`/login?redirect=${to.path}`)
  }
})