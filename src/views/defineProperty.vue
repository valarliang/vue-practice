<template>
  <div>
    <h1>Object.defineProperty test</h1>
  </div>
</template>

<script>
  export default {
    created() {
      const obj = {a:1,b: {c: 2}, d: [1,2]}
      // console.log(obj)
      const reactive = (obj) => {
        Object.keys(obj).forEach(key => {
          let value = obj[key]    // 利用闭包，将初始值存为value，用来（作为桥梁）同步取值和赋值的结果
          if (typeof value == 'object') reactive(value)
          Object.defineProperty(obj, key, {
            get() {
              // console.log('get '+key)
              return value
            },
            set(v) {
              if (typeof v == 'object') reactive(v)
              if (v == value) return
              console.log('set '+key+'为 '+v)
              value = v
            }
          })
        })
      }
      reactive(obj)
      // obj.d[0] = 'abc' // Vue为性能考虑不予实现数组响应
      // obj.b.c = 4 // 已有属性通过外层递归挂载c的响应
      // obj.b.e = 5 // 新增的属性无法挂载响应
      // obj.a = {d: 3} // 已有属性赋值新对象通过setter内递归挂载新对象内d的响应
      // obj.a.d = 2
    }
  }
</script>

<style lang="stylus" scoped>

</style>