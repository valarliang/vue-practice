<template>
  <div>
    <h1>login</h1>
  </div>
</template>

<script>
  export default {
    created() {
      const obj = {a:1,b: {c: 2}}
      // console.log(obj)
      const reactive = (obj) => {
        Object.keys(obj).forEach(key => {
          let value = obj[key]
          Object.defineProperty(obj, key, {
            get() {
              console.log('get '+key)
              return value
            },
            set(v) {
              if (typeof value == 'object') reactive(value)
              if (v == value) return
              console.log('set '+key)
              value = v
            }
          })
        })
      }
      reactive(obj)
      obj.a = 5
      obj.b.c = 4 // 执行getter
    }
  }
</script>

<style lang="stylus" scoped>

</style>