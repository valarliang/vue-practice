<template>
  <input :value="value" @input="onInput" v-bind="$attrs" />
</template>

<script>
  export default {
    name: 'Input',
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    created() {
      // console.log('child created')
      // this.$on('test-broadcast', (...args) => console.log(...args))
    },
    mounted() {
      // console.log('child mounted')
      // this.dispatch('Form', 'test-dispatch', 2, 'dispatch')
    },
    methods: {
      onInput(e) {
        this.$emit('input', e.target.value)
        this.$parent.$emit('validate')
        this.dispatch('FormItem','validate')
      }
    }
  }
</script>

<style lang="stylus" scoped>
input
  margin 10px
  padding 2px 8px
  border-radius 4px
  border 1px solid gray
</style>