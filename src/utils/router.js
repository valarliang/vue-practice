let Vue
class MyRouter {
  constructor(options) {
    this.$options = options
    this.routerMap = {}
    this.app = new Vue({
      data: {
        current: '/'
      }
    })
  }
  init() {
    this.bindEvents()
    this.createRouterMap()
    this.initComponent()
  }
  bindEvents() {
    window.addEventListener('load', this.hashChange.bind(this))
    window.addEventListener('hashChange', this.hashChange.bind(this))
  }
  hashChange() {
    this.app.current = window.location.hash.slice(1) || '/'
  }
  createRouterMap() {
    this.$options.routes.forEach(route => {
      this.routerMap[route.path] = route
    })
  }
  initComponent() {
    Vue.component('router-link', {
      render(h) {
        return h('a', {
          attrs: {'href': '#' + this.to}
        }, [this.$slots.default])
        // return <a href={'#' + this.to}>{this.$slots.default}</a>
      }
    })
    Vue.component('router-view', {
      render: h => {
        return h(this.routerMap[this.app.current].component)
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