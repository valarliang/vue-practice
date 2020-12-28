<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
  export default {
    name: 'Form',
    provide() {
      return {
        form: this
      }
    },
    props: {
      model: Object,
      rules: Object,
    },
    created() {
      // console.log('parent created')
      // this.$on('test-dispatch', (...args) => console.log(...args)) // 不能在mounted周期监听，当时还未挂载父组件(自下而上挂载DOM)
    },
    mounted() { 
      // console.log('parent mounted')
      this.broadcast('Input', 'test-broadcast', 1, 'broadcast') // 不能在created周期广播，当时未创建子组件(自上而下创建实例)
    },
    methods: {
      validate(cb) {
        const tasks = this.$children.filter(e => e.prop).map(e => e.validate())
        Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false))
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>