<template>
  <div>
    <el-table :data="visibleData" ref="table"></el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [],
        visibleCount: 1,
        start: 0,
      }
    },
    computed: {
      visibleData() {
        return this.list.slice(this.start, this.start + this.visibleCount)
      }
    },
    watch: {
      'list.length': {
        handler(n) {
          this.$nextTick(() => this.visibleCount = Math.ceil(this.wrapper.clientHeight / this.itemSize))
          this.virtualEl.style.height = n * this.itemSize + 'px'
      }
    },
    mounted() {
      this.$nextTick(this.virtualization)
    },
    methods: {
      virtualization() {
        this.virtualEl = document.createElement('div')
        this.wrapper = this.$refs.table.$el.querySelector('.el-table__body-wrapper')
        this.$res.table.$el.querySelector('.el-table__body').style.position = 'absolute'
        this.itemSize = this.$res.table.$el.querySelector('.el-table__row').clientHeight // 行高
        this.$nextTick(() => this.visibleCount = Math.ceil(this.wrapper.clientHeight / this.itemSize)) // 可见行数
        this.virtualEl.style.height = this.list.length * this.itemSize + 'px' // 列表总长
        this.wrapper.appendChild(this.virtualEl)
        this.wrapper.onscroll = this.tableScroll
      },
      tableScroll() {
        let scrollTop = this.wrapper.scrollTop, // 滚动总长度
          startOffset = scrollTop - (scrollTop % this.itemSize) // 可见列表第一项的遮蔽长度
        this.start = Math.floor(scrollTop / this.itemSize)
        this.$res.table.$el.querySelector('.el-table__body').style.transform = `translateY(${startOffset}px)`
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>