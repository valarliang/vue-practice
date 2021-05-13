<template>
  <div>
    <h2>About</h2>
    <div>display something after login</div>
    <router-link class="link" to="/about/articles" v-permission="['administrator']">Articles ></router-link>
    <div class="content">
      <div v-permission="['administrator']">display when roles = administrator</div>
      <div v-permission="['passerby']">display when roles = passerby</div>
      <div v-permission="['passerby', 'administrator']">display when roles = administrator & passerby</div>
    </div>
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
.content
  margin 0 auto
  width 300px
  text-align left
</style>