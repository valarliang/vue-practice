<template>
  <div>
    <Header @click="click" />
    <router-view />
  </div>
</template>

<script>
  export default {
    methods: {
      click(evnet,a,b) {
        // this.$store.dispatch('increment')
      },
    }
  }
</script>

<style lang="stylus" scoped>

</style>