class Vue {
  constructor(options) {
    this.$options = options
    this.$data = options.data
    this.observe(this.$data)
    new Compile(options.el, this)
    if (options.created) options.created.call(this)
  }
  observe(data) {
    if (!data || typeof data != 'object') return
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
      this.proxyData(key)
    })
  }
  defineReactive(data, key, value) {
    this.observe(value)
    const dep = new Dep()
    Object.defineProperty(data, key, {
      get() {
        Dep.target && dep.addDep(Dep.target)
        return value
      },
      set: (v) => {
        if (value == v) return
        this.observe(v)
        value = v
        dep.notify()
      }
    })
  }
  proxyData(key) {
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key]
      },
      set(v) {
        this.$data[key] = v
      }
    })
  }
}

class Dep {
  constructor() {
    this.deps = []
  }
  addDep(watcher) {
    this.deps.push(watcher)
  }
  notify() {
    this.deps.forEach(watcher => watcher.update())
  }
}

class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb
    Dep.target = this
    vm[key]
    Dep.target = null
  }
  update() {
    this.cb()
  }
}