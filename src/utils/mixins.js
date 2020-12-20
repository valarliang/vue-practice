export default {
  methods: {
    throttle(fn, delay) {
      let last = 0
      return (...args) => {
        const now = Date.now()
        if (now - last > delay) {
          last = now
          fn.apply(this, args)
        }
      }
    },
    debounce(fn, delay) {
      let timer = 0
      return (...args) => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          fn.apply(this, args)
        }, delay);
      }
    },
    dispatch(componentName,event,...params) {
      let parent = this.$parent
      let name = parent.$options.name
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        name = parent.$options.name
      }
      parent.$emit(event, ...params)
    },
    broadcast(componentName,event,...params) {
      this.$children.forEach(child => {
        const name = child.$options.name
        if (name === componentName) child.$emit(event, ...params)
        else child.broadcast(componentName,event,...params) // 不能使用this.broadcast，因为此时broadcast已绑定实例，调用call无济于事
      });
    }
  }
}