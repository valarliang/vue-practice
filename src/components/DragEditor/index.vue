<template>
  <el-container class="panel">
    <el-aside class="left" width="200px">
      <div
        v-for="(item, index) of componentList"
        :key="index"
        draggable
        class="wrapper"
        @dragstart="dragstart($event, item)"
        @dragend="dragend"
      >
        <span class="title">{{item.label}}</span>
        <component :is="item.component" />
      </div>
    </el-aside>
    <el-container class="middle">
      <el-header>Header</el-header>
      <el-main>
        <div ref="editor" class="content" :style="contentStyle" @mousedown="clearBlockFocus">
          <CompBlock
            v-for="(item, index) of config.blocks"
            :key="index"
            :class="{focus: item.focus}"
            :index="index"
            @mousedown.native="blockMousedown($event, index, item)"
          />
          <div v-show="markLine.horizontal" class="h-line" :style="{ top: markLine.horizontal + 'px' }"></div>
          <div v-show="markLine.vertical" class="v-line" :style="{ left: markLine.vertical + 'px' }"></div>
        </div>
      </el-main>
    </el-container>
    <el-aside class="right">Aside</el-aside>
  </el-container>
</template>

<script>
import CompBlock from "./CompBlock.vue";
import material from "@/utils/drag-editor-material.js";
import { mapState } from "vuex";
export default {
  components: {
    CompBlock
  },
  data() {
    return {
      componentList: material.componentList,
      markLine: { horizontal: null, vertical: null }
    }
  },
  computed: {
    ...mapState({
      config: state => state.visualizeConfig
    }),
    contentStyle() {
      const {container: { width, height }} = this.config
      return {width: width + 'px',height: height + 'px'}
    }
  },
  methods: {
    dragstart(e, compConfig) {
      this.dragedComponent = compConfig
      const editor = this.$refs.editor
      editor.addEventListener('dragenter', this.dragenter)
      editor.addEventListener('dragover', this.dragover)
      editor.addEventListener('dragleave', this.dragleave)
      editor.addEventListener('drop', this.drop)
    },
    dragend() {
      const editor = this.$refs.editor
      editor.removeEventListener('dragenter', this.dragenter)
      editor.removeEventListener('dragover', this.dragover)
      editor.removeEventListener('dragleave', this.dragleave)
      editor.removeEventListener('drop', this.drop)
    },
    dragenter(e) {
      e.dataTransfer.dropEffect = 'move'
    },
    dragover(e) {
      e.preventDefault()
    },
    dragleave(e) {
      e.dataTransfer.dropEffect = 'none'
    },
    drop(e) {
      const block = {
        top: e.offsetY, left: e.offsetX,
        width: 190, height: 150,
        zIndex: 1, focus: false, droped: true,
        type: this.dragedComponent.type
      }
      this.$store.commit('visualizeConfig/ADD_BLOCKS', block)
      this.dragedComponent = null
    },
    blockMousedown(e, index, block) {
      e.stopPropagation()
      const { container, blocks } = this.config
      if (e.shiftKey || e.ctrlKey) {
        this.$store.commit('visualizeConfig/UPDATE_BLOCKS', {
          index, config: {...block, focus: blocks.filter(b => b.focus).length <= 1 ? true : !block.focus}
        })
      } else {
        if (!block.focus) {
          this.clearBlockFocus()
          this.$store.commit('visualizeConfig/UPDATE_BLOCKS', {index, config: {...block, focus: true}})
        }
      }
      // 记录所有选中元素起始位置配合 mousemove 可实现编辑器内拖拽元素
      const focusedBlocks = []
      // 记录所有未选中元素用来生成对齐参考线(和大屏中线)
      const unfocusedBlocks = [
        { top: 0, left: 0, width: container.width, height: container.height } // 大屏画布
      ]
      blocks.forEach((b,index) => (b.focus ? focusedBlocks : unfocusedBlocks).push({...b, index}))
      // 鼠标所在的选中元素位置
      const { top: startTop, left: startLeft, width: currentWidth, height: currentHeight } = blocks[index]
      const referenceLines = { horizontal: [], vertical: [] } // 记录所有对齐参考线和当前拖拽元素的 top、left
      unfocusedBlocks.forEach(b => { // 对齐参考线要根据未选中元素生成
        const { top, left, width, height } = b
        referenceLines.horizontal.push( // 收集水平参考线和拖拽元素相应top
          { lineTop: top, blockAlignTop: top }, // 顶对顶
          { lineTop: top, blockAlignTop: top - currentHeight }, // 底对顶
          { lineTop: top + height/2, blockAlignTop: top + height/2 - currentHeight/2 }, // 中对中
          { lineTop: top + height, blockAlignTop: top + height }, // 顶对底
          { lineTop: top + height, blockAlignTop: top + height - currentHeight  } // 底对底
        )
        referenceLines.vertical.push( // 收集垂直参考线和拖拽元素相应left
          { lineLeft: left, blockAlignLeft: left }, // 左对左
          { lineLeft: left + width, blockAlignLeft: left + width }, // 左对右
          { lineLeft: left + width/2, blockAlignLeft: left + width/2 - currentWidth/2 }, // 中对中
          { lineLeft: left + width, blockAlignLeft: left + width - currentWidth }, // 右对右
          { lineLeft: left, blockAlignLeft: left - currentWidth }, // 右对左
        )
      })

      this.blockDragState = {
        startX: e.clientX, startY: e.clientY, // 鼠标起始位置
        startTop, startLeft, // 鼠标拖拽元素的起始位置
        startPoints: focusedBlocks.map(({index,top,left}) => ({index,top,left})), // 所有选中元素起始位置
        referenceLines // 对齐参考线
      }
      document.addEventListener('mousemove', this.blockMousemove)
      document.addEventListener('mouseup', this.blockMouseup)
    },
    blockMousemove(e) {
      const {startX, startY, startTop, startLeft, startPoints, referenceLines } = this.blockDragState
      // 鼠标移动距离
      let distX = e.clientX - startX, distY = e.clientY - startY
      // 鼠标所拖拽元素的位置
      const top = startTop + distY, left = startLeft + distX
      // 参考线位置
      let horizontal = null, vertical = null
      // 元素接近参考线后要显示参考线并把当前拖拽元素位置对齐到参考线
      for (let i = 0; i < referenceLines.horizontal.length; i++) {
        const { lineTop, blockAlignTop } = referenceLines.horizontal[i]
        if (Math.abs(blockAlignTop - top) < 5) {
          horizontal = lineTop
          distY = blockAlignTop - startTop // 通过设置鼠标移动距离为 起始位置到对齐目标位置 实现参考线吸附效果
          break
        }
      }
      for (let i = 0; i < referenceLines.vertical.length; i++) {
        const { lineLeft, blockAlignLeft } = referenceLines.vertical[i]
        if (Math.abs(blockAlignLeft - left) < 5) {
          vertical = lineLeft
          distX = blockAlignLeft - startLeft
          break
        }
      }
      this.markLine = { horizontal, vertical }
      startPoints.forEach(({index,top,left}) => {
        this.$store.commit('visualizeConfig/UPDATE_BLOCKS', {
          index, config: {...this.config.blocks[index], top: top + distY, left: left + distX}
        })
      })
    },
    blockMouseup() {
      document.removeEventListener('mousemove', this.blockMousemove)
      document.removeEventListener('mouseup', this.blockMouseup)
      this.markLine.horizontal = null
      this.markLine.vertical = null
    },
    clearBlockFocus() {
      this.config.blocks.forEach((block, index) => {
        this.$store.commit('visualizeConfig/UPDATE_BLOCKS', {index, config: {...block, focus: false}})
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.panel
  width 90%
  .left
    overflow hidden
    border-right 1px solid #e6e6e6
    .wrapper
      margin-bottom 1px
      position relative
      width 190px
      height 150px
      .title
        position absolute
        top 4px
        left 4px
        z-index 1
        color white
      &::after
        content ''
        position absolute
        top 0
        left 0
        bottom 0
        right 0
        z-index 2
        cursor move
  .middle .content
    position relative
    overflow hidden
    background #352a46
    .focus::after
      border 2px dashed #5151ff
    .h-line
      position absolute
      z-index 100
      width 100%
      top 0
      border-top 1px dashed #888
    .v-line
      position absolute
      z-index 100
      height 100%
      left 0
      border-left 1px dashed #888
  .right
    border-left 1px solid #e6e6e6
</style>