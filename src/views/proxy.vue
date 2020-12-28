<template>
  <h1>Proxy demo</h1>
</template>

<script>
export default {
  created() {
    const obj = {a:1, b: {c: 2}, d: 3}
    function reactive(obj) {
      return new Proxy(obj, {
        get(target, key, receiver) {
          const result = Reflect.get(target, key, receiver)
          console.log('get', key)
          return typeof result == 'object' ? reactive(result) : result // 响应式递归处理发生在设置值得时候，性能得到很大提升
        },
        set(target, key, value, receiver) {
          console.log('set',key)
          return Reflect.set(target, key, value, receiver)
        },
        deleteProperty(obj, key) {
          console.log('delete')
          return Reflect.deleteProperty(obj,key)
        },
        has(target, p) {
          console.log('has')
          return Reflect.has(target, p)
        }
      })
    }
    const data = reactive(obj)
    data.b.e = 4
    // 'd' in data
    // console.log(data)
  },
};
</script>

<style lang="stylus" scoped></style>