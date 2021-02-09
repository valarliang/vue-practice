<template>
  <div id="app">
    <Header @click="click" />
    <svg><use href='#icon-architecture'/></svg>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <div>{{test[1].a}}</div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      app: 'app',
      acc: 3,
      test: [1,{a:2}],
    }
  },
  created() {
    // console.log(this.$parent)
  },
  mounted() {a
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
    click(evnet,a,b) {
      // this.$store.dispatch('increment')
      this.test[1].a = 'abc'
    },
  }
}
</script>

<style lang="stylus" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
img {
  display: block;
  margin: 0 auto;
}
svg
  display block
  width 100px
  margin auto
</style>
