<template>
  <div id="mountNode">test</div>
</template>

<script>
import G6 from '@antv/g6'
import remoteData from '@/assets/tree_data'
export default {
  data() {
    return {
      nodeWidth: 212,
      nodeHeight: 184
    }
  },
  computed: {
    leafWidth() {
      return this.nodeWidth/2
    },
    leafHeight() {
      return this.nodeHeight/2
    },
  },
  mounted() {
    this.registerNode()
    this.registerLeaf()
    this.registerEdge()
    this.registerEvent()
    this.graph = new G6.TreeGraph({
      container: 'mountNode',
      width: '100vw',
      height: '100vh',
      renderer: 'svg', // 使用 DOM 自定义节点
      layout: {
        type: 'compactBox',
        direction: 'TB',
        getWidth: ({ type }) => type === 'node' ? this.nodeWidth : this.leafWidth,
        getHeight: ({ type }) => type === 'node' ? this.nodeHeight : this.leafHeight,
        getHGap: ({ type }) => 10,
        getVGap: ({ type }) => 30,
      },
      modes: {
        default: ['drag-canvas', 'zoom-canvas'], // 允许拖拽画布、放缩画布
        custom: ['zoom-canvas'],
      },
      defaultNode: {
        type: 'node',
        size: [this.nodeWidth, this.nodeHeight],
        anchorPoints: [
          [0.5, 0],
          [0.5, 1]
        ]
      },
      defaultEdge: {
        type: 'flow-line',
        style: {
          stroke: '#B4C3D4',
          endArrow: false,
        },
      },
    });
    this.main()
  },
  methods: {
    main() {
      this.graph.data(remoteData.tree); // 加载远程数据
      this.graph.render(); // 渲染
      // 鼠标进入节点
      this.graph.on('node:mouseenter', (e) => {
        const nodeItem = e.item; // 获取鼠标进入的节点元素对象
      });
      // 鼠标离开节点
      this.graph.on('node:mouseleave', (e) => {
        const nodeItem = e.item; // 获取鼠标离开的节点元素对象
      });
    },
    registerNode() {
      G6.registerNode('node',
        {
          draw: (cfg, group) => {
            const { fname, nsamples, id, fsplit, criterion, output, _class_, } = cfg
            const positive = cfg.labelP;
            const negative = cfg.labelN;
            let positive_rto = positive * 1.0 / (positive + negative)
            positive_rto = Math.round((positive_rto + Number.EPSILON) * 10000) / 100
            let negative_rto = negative * 1.0 / (positive + negative)
            negative_rto = Math.round((negative_rto + Number.EPSILON) * 10000) / 100

            return group.addShape('dom', {
              attrs: {
                width: this.nodeWidth,
                height: this.nodeHeight,
                cursor: 'pointer',
                html: `
                  <ul style="width: ${this.nodeWidth}px; height: ${this.nodeHeight}px; padding: 20px 0; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; background-color: #E6F7FF; border: 1px solid #145DFF; border-bottom-width: 4px; border-radius: 2px; font-size: 16px; user-select: none">
                    <li style="align-self: center; font-weight: bold; display: flex; justify-content: space-between;">
                      <div style="width: 140px;line-height: 20px;" onmousedown="editName(event)">${fname}</div><i class="el-icon-s-tools"></i>
                    </li>
                    <li style="display: flex; justify-content: space-between;">
                      <div style="width: 96px; text-align: right;">样本</div>
                      <div style="  width: 96px;text-align: left;">${nsamples}</div>
                    </li>
                    <li style="display: flex; justify-content: space-between;">
                      <div style="width: 96px; text-align: right;">${criterion?.statistical_name}</div>
                      <div style="  width: 96px;text-align: left;">${criterion?.statistical_val}%</div>
                    </li>
                    <li style="display: flex; justify-content: space-between;">
                      <div style="width: 96px; text-align: right;">${criterion?.impurity_name}</div>
                      <div style="  width: 96px;text-align: left;">${criterion?.impurity_val}%</div>
                    </li>
                    <li style="display: flex; justify-content: space-between;">
                      <div style="width: 96px; text-align: right;">平均值</div>
                      <div style="  width: 96px;text-align: left;">${output.val}%</div>
                    </li>
                    <li style="display: flex; justify-content: space-between;">
                      <div style="width: 96px; text-align: right;">决策点</div>
                      <div style="width: 96px;text-align: left;line-height: 20px;" onmousedown="editName(event)">${fsplit}</div>
                    </li>
                  </ul>
                `,
              },
            });
          },
        }
      );
    },
    registerLeaf() {
      G6.registerNode('leaf',
        {
          draw: (cfg, group) => {
            const { fname, nsamples, output, id, fsplit, _class_, } = cfg
            return group.addShape('dom', {
              attrs: {
                width: this.leafWidth,
                height: this.leafHeight,
                cursor: 'pointer',
                html: `
                  <ul style="width: ${this.leafWidth}px; height: ${this.leafHeight}px; padding: 20px 0; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; background-color: #E6F7FF; border: 1px solid #145DFF; border-bottom-width: 4px; border-radius: 2px; font-size: 16px; user-select: none">
                    <li style="align-self: center; font-weight: bold; display: flex; justify-content: space-between;">
                      <i class="el-icon-s-tools"></i>
                    </li>
                    <li style="display: flex; justify-content: space-between;">
                      <div style="width: 96px; text-align: right;">样本</div>
                      <div style="  width: 96px;text-align: left;">${nsamples}</div>
                    </li>
                    </li>
                    <li style="display: flex; justify-content: space-between;">
                      <div style="width: 96px; text-align: right;">均值</div>
                      <div style="  width: 96px;text-align: left;">${output.val}</div>
                    </li>
                  </ul>
                `,
              },
            });
          },
        }
      );
    },
    registerEdge() {
      G6.registerEdge('flow-line', {
        draw(cfg, group) {
          const { startPoint, endPoint, style } = cfg;
          const shape = group.addShape('path', {
            attrs: {
              stroke: style.stroke,
              endArrow: style.endArrow,
              path: [
                ['M', startPoint.x, startPoint.y],
                ['L', startPoint.x, (startPoint.y + endPoint.y) / 2],
                ['L', endPoint.x, (startPoint.y + endPoint.y) / 2],
                ['L', endPoint.x, endPoint.y],
              ],
            },
          })
          return shape
        }
      })
    },
    registerEvent() {
      window.editName = this.editName
    },
    editName(ev) {
      this.graph.setMode('custom')
      ev.target.contentEditable = true
    }
  },
  destroyed() {
    window.editName = null
  }
}
</script>

<style scoped>
.a {
  width: 212px;
  height: 184px;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #E6F7FF;
  border: 1px solid #145DFF;
  border-bottom-width: 4px;
  border-radius: 2px;
  font-size: 16px;
   user-select: none;
}
.b {
  align-self: center;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
}
.c {
  display: flex;
  justify-content: space-between;
}
.c1 {
  width: 96px;
  text-align: right;
}
.c2 {
  width: 96px;
  text-align: left;
}
</style>