<template>
  <div>
    <h1>Article1</h1>
    <button @click.prevent="go">Go to Article2</button>
  </div>
</template>

<script>
  export default {
    methods: {
      go() {
        this.$router.push('/article2')
      },
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
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>