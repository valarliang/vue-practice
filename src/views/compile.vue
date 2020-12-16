<template>
  <h1>compile test</h1>
</template>

<script>
  export default {
    created() {
      // 模板编译
      function compile(templet) {
        templet = templet.replace(/\{\{(.+)\}\}/g, (a,b) => '${'+b+'}')
        const body = 'let str=""; with(obj){str=`'+templet+'`} return str'
        return new Function('obj', body)
      }
      const str = compile('<a>{{name}}</a>')({name: 'Tom'})
      console.log(str)
    }
  }
</script>

<style lang="stylus" scoped>

</style>