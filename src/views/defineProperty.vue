<template>
  <div>
    <h1>Object.defineProperty test</h1>
  </div>
</template>

<script>
  export default {
    created() {
      const obj = {a:1,b: {c: 2}}
      // console.log(obj)
      const reactive = (obj) => {
        Object.keys(obj).forEach(key => {
          let value = obj[key]    // 利用闭包，将初始值存为value，以便get和set作用
          if (typeof value == 'object') reactive(value)
          Object.defineProperty(obj, key, {
            get() {
              // console.log('get '+key)
              return value
            },
            set(v) {
              if (typeof v == 'object') reactive(v)
              if (v == value) return
              console.log('set '+key)
              value = v
            }
          })
        })
      }
      reactive(obj)
      // obj.b.c = 4 // 通过外层递归挂载c的响应
      // obj.b.e = 5 // 新增的属性无法挂载响应
      // obj.a = {d: 3}
      // obj.a.d = 2 // 通过setter内递归挂载d的响应
    }
  }
</script>

<style lang="stylus" scoped>

</style>