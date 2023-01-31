<template>
  <ul @click="insert">
  <!-- eslint-disable-next-line -->
    <li v-for="(item, index) of list" :key="item">{{item}}</li>
  </ul>
</template>

<script>
  export default {
    data() {
      return {
        list: ['a','b','c']
      }
    },
    methods: {
      insert() {
// // eslint-disable-next-line
//     debugger
        /** 通过 updateChildren() 断点
        证明若没有key或设置为数组下标（因为会随数据变化而变化），sameVnode()依旧会返回true，无法有效减少DOM操作量 **/
        this.list.splice(1, 0, 'z')
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>