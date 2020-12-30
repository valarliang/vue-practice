let Vue
class Store {
  constructor(options) {
    this.$options = options
    this.state = new Vue({
      data: options.state
    })
    this.getters = {}
    this.mountGetters(options.getter)
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }
  mountGetters(getter) {
    Object.keys(getter).forEach(e => {
      Object.defineProperties(this.getters, e, {
        get() {
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