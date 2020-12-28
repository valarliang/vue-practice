<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <div class="error">{{error}}</div>
  </div>
</template>

<script>
  import Schema from "async-validator"

  export default {
    name: 'FormItem',
    inject: ['form'],
    props: {
      label: String,
      prop: String,
    },
    data() {
      return {
        error: '',
      }
    },
    mounted() {
      this.$on('validate',this.debounce(this.validate, 100))
    },
    methods: {
      validate() {
        const rule = this.form.rules[this.prop]
        const value = this.form.model[this.prop]
        return new Schema({ [this.prop]: rule }).validate({ [this.prop]: value }, error => {
          if (error) this.error = error[0].message
          else this.error = ''
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
.error
  height 20px
  color red
</style>