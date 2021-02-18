<template>
  <div class="bar" @click="click" >
    <div class="account" @click="login">
      <button class="btn">{{user.name}}</button>
      <SvgIcon name='login' class="svg"/>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        a: 1,
        b: 2,
      }
    },
    computed: {
      ...mapState([
        'user'
      ])
    },
    methods: {
      click(event) {
        this.$emit('click', event, this.a,this.b)
      },
      login() {
        this.$router.push({name: 'login'})
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
  display grid
  align-content center
  background-color: #fff;
  box-shadow: 0 0 2px rgba(0,0,0,0.25);
  .account
    display flex
    align-items center
    justify-content space-between
    place-self end
    .btn
      background white
    .svg
      margin 0 6px
      height 16px
      width 16px
</style>