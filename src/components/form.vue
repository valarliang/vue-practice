<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
  export default {
    provide() {
      return {
        form: this
      }
    },
    props: {
      model: Object,
      rules: Object,
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