let Vue
class Store {
  constructor(options) {
    this.$options = options
    this.state = new Vue({
      data: options.state
    })
    this.getters = {}
    this.mountGetters(options.getters)
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }
  mountGetters(getter) {
    Object.keys(getter).forEach(e => {
      Object.defineProperty(this.getters, e, {
        get: () => { // 注意函数中用到了this
          return getter[e](this.state, this.getters)
        }
      })
    })
  }
  commit(type, ...args) {
    return this.$options.mutations[type](this.state, ...args)
  }
  dispatch(type, ...args) {
    return this.$options.actions[type](this, ...args)
  }
}

function install(_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

export default {Store, install}