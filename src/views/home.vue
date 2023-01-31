<template>
  <div class="body">
    <h1>Home</h1>
    <router-link to="/home/defineProperty">Object.defineProperty</router-link>
    <router-link to="/home/proxy">Proxy</router-link>
    <router-link to="/home/compile">Compile</router-link>
    <router-link to="/home/visualize">Visualize</router-link>
    <router-link to="/home/setKeyWithIndex">setKeyWithIndex</router-link>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="stylus" scoped>
.body
  display flex
  flex-direction column
  align-items center
  .view
    margin-top 20px
</style>