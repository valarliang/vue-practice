<template>
  <v-chart :option="option" />
</template>

<script>
// import "echarts"
import { THEME_KEY } from "vue-echarts";
export default {
  label: '柱状图',
  provide: {
    [THEME_KEY]: "dark"
  },
  data() {
    return {
      option: {
        grid: {
          top: '20%',
          height: '65%'
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: false
          }
        },
        dataset: {
          source: [
            ['a', 10],
            ['b', 30],
            ['c', 20],
          ]
        },
        series: [
          { type: 'bar' }
        ]
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.echarts
  width: 100%
  height: 100%
</style>