<template>
  <div>
    <h2>About</h2>
    <router-link class="link" to="/about/articles">Articles ></router-link>
    <div v-permission="['administrator']">administrator</div>
    <div v-permission="['passerby']">passerby</div>
    <div v-permission="['passerby', 'administrator']">administrator & passerby</div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="stylus" scoped>
h2
  margin 10px
.link
  display block
  margin 10px
</style>