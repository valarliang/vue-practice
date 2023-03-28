<template>
  <div class="body">
    <div class="head">
      <SvgIcon name='architecture' class='svg'/>
      <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <h1>Home</h1>
    <router-link to="/home/defineProperty">Object.defineProperty</router-link>
    <router-link to="/home/proxy">Proxy</router-link>
    <router-link to="/home/compile">Compile</router-link>
    <router-link to="/home/visualize">Visualize</router-link>
    <router-link to="/home/setKeyWithIndex">setKeyWithIndex</router-link>
    <router-link to="/G6graph">G6graph</router-link>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="stylus" scoped>
.body
  margin-top 60px
  display flex
  flex-direction column
  align-items center
  .head
    margin-bottom: 30px
    text-align: center
    .svg
      display block
      width 50px
      height 50px
      margin auto
    .view
      margin-top 20px
  img
    display: block;
    margin: 0 auto;
</style>