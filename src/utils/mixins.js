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
  }
}