<template>
  <div ref="block" class="comp-block" :style="blockStyle">
    <component :is="componentMap[block.type].component" />
  </div>
</template>

<script>
import material from "@/utils/drag-editor-material.js";
import { mapState } from "vuex";
export default {
  props: ['index'],
  data() {
    return {
      componentMap: material.componentMap
    }
  },
  computed: {
    ...mapState({
      block(state) {
        return state.visualizeConfig.blocks[this.index]
      }
    }),
    blockStyle() {
      const {top,left,width,height,zIndex} = this.block
      return {top: top+'px',left: left+'px',width: width+'px',height:height+'px',zIndex}
    }
  },
  mounted() {
    const { top, left, droped } = this.block
    if (droped) {
      const {offsetWidth,offsetHeight} = this.$refs.block
      // 使元素相对鼠标居中
      this.$store.commit('visualizeConfig/UPDATE_BLOCKS', {
        index: this.index,
        config: {...this.block,top: top - offsetHeight/2, left: left - offsetWidth/2, droped: false}
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.comp-block
  position: absolute
  &::after
    content: ''
    position: absolute
    top: 0
    left: 0
    bottom 0
    right 0
</style>