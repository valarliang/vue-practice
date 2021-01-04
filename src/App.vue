<template>
  <div id="app">
    <Header @click="click" />
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
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
    }
  },
  created() {
    // console.log(this.$parent)
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
    click(evnet,a,b) {
      // console.log(a,b)
    },
  }
}
</script>

<style>
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
</style>
