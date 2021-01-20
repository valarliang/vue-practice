<template>
  <div class="bar" @click="click" >

  </div>
</template>

<script>
  export default {
    data() {
      return {
        a: 1,
        b: 2,
      }
    },
    methods: {
      click(event) {
        this.$emit('click', event, this.a,this.b)
      }
    }
  }
</script>

<style lang="stylus" scoped>
.bar 
  position: fixed;
  top: 0;
  width: 100%;
  height: 40px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(0,0,0,0.25);
</style>