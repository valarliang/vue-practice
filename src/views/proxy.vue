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
          // 此处不使用target[key]方式取值原因：当target中有getter或setter使用了this时，proxy实例对应的getter或setter使用
          // 的this依然是target，需要修改this指向，即通过receiver指定到proxy实例本身
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
    data.b.e = 4 // 设置时会读取 data.b 触发getter添加响应
    // 'd' in data
    // console.log(data)
  },
};
</script>

<style lang="stylus" scoped></style>