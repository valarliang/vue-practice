import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routerList = require.context('.', true, /\.routes\.js/)
const routes = []
routerList.keys().forEach(key => {
  const config = routerList(key).default
  config.length ? routes.push(...config) : routes.push(config)
})
console.log('routerList.keys():',routerList.keys(),'\n','routes:', routes)

export default new VueRouter({routes})