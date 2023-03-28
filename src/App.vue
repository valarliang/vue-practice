<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      app: 'app',
      acc: 3,
      test: [1,{a:2}],
    }
  },
  computed: {
    ...mapState([
      "count"
    ]),
  },
  created() {
    // console.log(this.$parent)
    window.addEventListener('pageshow', (event) => {
      console.log('pageshow--------', event.persisted)
    });
  },
  mounted() {
    const config = {
      data() { // 使用函数可规避 Test 的实例共享同一data
        return {a:'a'}
      }
    }
    function Test() {
      this.data = typeof config.data == 'function' ? config.data() : config.data
    }
    const a = new Test()
    const b = new Test()
    a.data.a = 'b'
    // console.log(a,b)
  },
  methods: {

  }
}
</script>

<style lang="stylus" scoped>
#app
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align center
  color: #2c3e50;
</style>
