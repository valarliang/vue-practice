<template>
  <div id="app">
    <Header @click="click" />
    <img alt="Vue logo" src="./assets/logo.png">
    <router-link to="/home">Go to Home</router-link>&nbsp;
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
    this.test()
  },
  methods: {
    click(evnet,a,b) {
      // console.log(a,b)
    },
    test() {
      const obj = {app: 'obj'}
      if(++this.acc > 5) return
      this.test.call(obj) // 会导致死循环
      // console.log(this) // VueComponent
    }
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
