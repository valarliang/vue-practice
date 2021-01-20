let Vue
class MyRouter {
  constructor(options) {
    this.$options = options
    this.routeMap = {}
    this.app = new Vue({
      data: {
        current: '/'
      }
    })
  }
  init() {
    this.bindEvents()
    this.createRouteMap()
    this.initComponent()
  }
  bindEvents() {
    window.addEventListener('load', this.hashChange.bind(this))
    window.addEventListener('hashchange', this.hashChange.bind(this))
  }
  hashChange() {
    this.app.current = window.location.hash.slice(1) || '/'
  }
  createRouteMap() {
    this.$options.routes.forEach(route => {
      this.routeMap[route.path] = route
    })
  }
  initComponent() {
    Vue.component('router-link', {
      props: {
        to: String
      },
      render(h) {
        // return h('a', {
        //   attrs: {'href': '#' + this.to}
        // }, [this.$slots.default])
        return <a href={'#' + this.to}>{this.$slots.default}</a>
      }
    })
    Vue.component('router-view', {
      render: h => {
        // console.log(this.app.current)
        return h(this.routeMap[this.app.current].component)
      }
    })
  }
}

MyRouter.install = function (_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate() {
      if(this.$options.router) {
        Vue.prototype.$router = this.$options.router
        this.$options.router.init()
      }
    }
  })
}

export default MyRouter