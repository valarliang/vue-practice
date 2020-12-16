<template>
  <div class="body">
    <h1>Home</h1>
    <router-link to="/defineProperty">Go to DefineProperty</router-link>
    <router-link to="/proxy">Go to Proxy</router-link>
    <router-link to="/compile">Go to Compile</router-link>
    <router-link to="/form-demo">Go to Form demo</router-link>&nbsp;
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
</style>