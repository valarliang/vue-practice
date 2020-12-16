<template>
  <h1>Proxy demo</h1>
</template>

<script>
export default {
  created() {
    const obj = {a:1, b: {c: 2}, d: 3}
    function reactive(obj) {
      Object.keys(obj).forEach(key => {
        if (typeof obj[key] == 'object') {
          return obj[key] = reactive(obj[key])
        }
      })
      return new Proxy(obj, {
        set(target, key, value, receiver) {
          console.log('set',key)
          if (typeof value == 'object') {
            const newVal = reactive(value)
            return Reflect.set(target, key, newVal, receiver)
          }
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
    // data.a = [1,2]
    'd' in data
    console.log(data)
  },
};
</script>

<style lang="stylus" scoped></style>