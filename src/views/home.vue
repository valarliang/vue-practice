<template>
  <div class="body">
    <h1>Home</h1>
    <router-link to="/defineProperty">Object.defineProperty</router-link>
    <router-link to="/proxy">Proxy</router-link>
    <router-link to="/compile">Compile</router-link>
    <router-link to="/form-demo">Form demo</router-link>&nbsp;
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