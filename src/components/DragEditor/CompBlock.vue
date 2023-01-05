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