import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routerList = require.context('.', true, /\.routes\.js/)

export const routes = []
routerList.keys().forEach(key => {
  const config = routerList(key).default || {path: ''} // 空文件预设
  config.length ? routes.push(...config) : routes.push(config)
})
console.log('routerList.keys():', routerList.keys())

export default new Router({
  mode: "history",
  base: process.env.BASE_URL, // publicPath
  routes
})