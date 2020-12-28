import Vue from 'vue'
import VueRouter from '../utils/router.js'

Vue.use(VueRouter)

const routerList = require.context('.', true, /\.routes\.js/)
const routes = []
routerList.keys().forEach(key => {
  const config = routerList(key).default || {path: ''} // 空文件预设
  config.length ? routes.push(...config) : routes.push(config)
})
console.log('\n','routes:', routes)

export default new VueRouter({routes})