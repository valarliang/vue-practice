<template>
  <svg class="i">
    <use :href='icon'/>
  </svg>
</template>

<script>
  export default {
    name: 'SvgIcon',
    props: {
      name: {
        type: String,
        required: true
      },
    },
    computed: {
      icon() {
        return `#icon-${this.name}`
      },
    }
  }
</script>

<style lang="stylus" scoped>
.i
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
</style>