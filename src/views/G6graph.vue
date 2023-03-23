<template>
  <div id="mountNode">test</div>
</template>

<script>
import G6 from '@antv/g6'
import remoteData from '@/assets/tree_data'
export default {
  data() {
    return {

    }
  },
  mounted() {
    this.registerNode()
    this.registerEdge()
    this.graph = new G6.TreeGraph({
      container: 'mountNode', // 指定挂载容器
      width: 800, // 图的宽度
      height: 500, // 图的高度
      // fitView: true,
      // fitViewPadding: [20, 40, 50, 20],
      layout: {
        type: 'compactBox',
        direction: 'TB',
      },
      modes: {
        default: ['drag-canvas', 'zoom-canvas'] // 允许拖拽画布、放缩画布,
      },
      // 节点在默认状态下的样式配置（style）和其他配置
      defaultNode: {
        // type: 'dom-node',
        size: [200, 140],
        style: {
          stroke: '#666', // 节点描边色
          lineWidth: 1, // 节点描边粗细
        },
      },
      // 边在默认状态下的样式配置（style）和其他配置
      defaultEdge: {
        type: 'flow-line',
        style: {
          stroke: '#CED4D9',
          endArrow: false,
        },
      },
    });
    this.main()
  },
  methods: {
    main() {
      // nodes.forEach((node) => {
      //   if (!node.style) {
      //     node.style = {};
      //   }
      //   switch (
      //     node.class // 根据节点数据中的 class 属性配置图形
      //   ) {
      //     case 'c0': {
      //       node.type = 'circle'; // class = 'c0' 时节点图形为 circle
      //       break;
      //     }
      //     case 'c1': {
      //       node.type = 'rect'; // class = 'c1' 时节点图形为 rect
      //       node.size = [35, 20]; // class = 'c1' 时节点大小
      //       break;
      //     }
      //     case 'c2': {
      //       node.type = 'ellipse'; // class = 'c2' 时节点图形为 ellipse
      //       node.size = [35, 20]; // class = 'c2' 时节点大小
      //       break;
      //     }
      //   }
      // });
      // edges.forEach((edge) => {
      //   if (!edge.style) {
      //     edge.style = {};
      //   }
      //   edge.style.lineWidth = edge.weight; // 边的粗细映射边数据中的 weight 属性数值
      //   edge.style.opacity = 0.6;
      //   edge.style.stroke = 'grey';
      // });
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
      G6.registerNode('dom-node', {
        draw: (cfg, group) => {
          const stroke = cfg.style ? cfg.style.stroke || '#5B8FF9' : '#5B8FF9';
          const positive = cfg.labelP;
          const negative = cfg.labelN;
          let positive_rto = positive * 1.0 / (positive + negative)
          positive_rto = Math.round((positive_rto + Number.EPSILON) * 10000) / 100
          let negative_rto = negative * 1.0 / (positive + negative)
          negative_rto = Math.round((negative_rto + Number.EPSILON) * 10000) / 100

          let impurity_name = cfg['criterion']['impurity_name'];
          let impurity_val = cfg['criterion']['impurity_val'];
          let statistical_name = ''
          if('statistical_name' in cfg['criterion']){
            statistical_name = cfg['criterion']['statistical_name'];
          }
          let statistical_val = '';
          if('statistical_val' in cfg['criterion']){
            statistical_val = cfg['criterion']['statistical_val'];
          }
          

          let shape = '';
          let setting_icon = '<svg viewBox="64 64 896 896" focusable="false" data-icon="setting" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 009.3-35.2l-.9-2.6a443.74 443.74 0 00-79.7-137.9l-1.8-2.1a32.12 32.12 0 00-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 00-25.8-25.7l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 00-25.8 25.7l-15.8 85.4a351.86 351.86 0 00-99 57.4l-81.9-29.1a32 32 0 00-35.1 9.5l-1.8 2.1a446.02 446.02 0 00-79.7 137.9l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 00-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0035.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0025.8 25.7l2.7.5a449.4 449.4 0 00159 0l2.7-.5a32.05 32.05 0 0025.8-25.7l15.7-85a350 350 0 0099.7-57.6l81.3 28.9a32 32 0 0035.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c4.5-12.3.8-26.3-9.3-35zM788.3 465.9c2.5 15.1 3.8 30.6 3.8 46.1s-1.3 31-3.8 46.1l-6.6 40.1 74.7 63.9a370.03 370.03 0 01-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97a377.5 377.5 0 01-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9zM512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 01512 614c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 01400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390c29.9 0 58 11.6 79.2 32.8A111.6 111.6 0 01624 502c0 29.9-11.7 58-32.8 79.2z"></path></svg>'
          if(cfg['_class_'] == "<class 'sklearn.tree._classes.DecisionTreeRegressor'>"){
            // console.log('regressor shape, type ', cfg)
            if(cfg['showType'] == 'leaf'){
              shape = group.addShape('dom', {
                attrs: {
                  width: cfg.size[0],
                  height: cfg.size[1],
                  html: `
                  <div id=${cfg.id} class='dom-node noselect' style="background-color: #fff; border: 2px solid ${stroke}; border-radius: 5px; width: 
                  ${cfg.size[0]}px; height: ${cfg.size[1]}px;cursor: grab;">
                    <table style='font-size:10px; border-spacing:0px;'>
                      <thead>
                        <tr>
                          <th style='width:46px;text-align:right;'></th>
                          <th></th>
                        </tr>
                      <thead>
                      <tbody>
                        <tr>
                          <td style='text-align:center;' class='nodeSetting' ondblclick="event.stopPropagation();window['__CUST_FN__']['evt_setting_btn'](this)"> 
                            ${setting_icon}
                          </td>
                          <td>
                            <div class='node-fname' name='${cfg.id}' style='width:140px;background:#eee;' onclick="window['__CUST_FN__']['evt_fname_btn'](this)">
                            ${cfg.fname}
                            </div>
                          </td>
                        </tr>   
                        <tr>
                          <td style='text-align:right;'>样本</td>
                          <td style='text-align:right;font-size:0px;'>
                            <span style='width:144px;display:block;text-align:left;font-size:12px;'>
                              ${cfg.nsamples}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td style='text-align:right;'>${statistical_name}</td>
                          <td>
                          ${statistical_val}
                          </td>  
                        </tr>   
                        <tr>
                          <td style='text-align:right;'>${impurity_name}</td>
                          <td>
                          ${impurity_val}
                          </td>  
                        </tr> 
                        <tr>
                        <td style='text-align:right;'>平均值</td>
                        <td>
                        ${cfg.output.val}
                        </td>  
                      </tr>   
                        <tr>
                          <td style='text-align:right;'>决策点</td>
                          <td >
                          <div class='node-fsplit' name='${cfg.id}' style='width:140px;background:#eee;' onclick="window['__CUST_FN__']['evt_fsplit_btn'](this)">
                              ${cfg.fsplit}
                          </div>
                          </td>
                        </tr>  
                      </tbody>
                    </table>
                  
                  </div>
                    `,
                },
                draggable: false,
              });
            }else{
              // node 
              shape = group.addShape('dom', {
                attrs: {
                  width: cfg.size[0],
                  height: cfg.size[1],
                  html: `
                  <div id=${cfg.id} class='dom-node noselect' style="background-color: #fff; border: 2px solid ${stroke}; border-radius: 5px
                  ; width: ${cfg.size[0] - 5}px; height: ${cfg.size[1] - 5}px;cursor: grab;">
                    <table style='font-size:10px; border-spacing:0px;'>
                      <thead>
                        <tr>
                          <th style='width:46px;text-align:right;'></th>
                          <th></th>
                        </tr>
                      <thead>
                      <tbody>
                        <tr>
                          <td style='text-align:center;' class='nodeSetting' ondblclick="event.stopPropagation();window['__CUST_FN__']['evt_setting_btn'](this)"> 
                            ${setting_icon}
                          </td>
                          <td>
                            <div class='node-fname' name='${cfg.id}' style='width:140px;background:#eee;' onclick="window['__CUST_FN__']['evt_fname_btn'](this)">
                            ${cfg.fname}
                            </div>
                          </td>
                        </tr>   
                        <tr>
                          <td style='text-align:right;'>样本</td>
                          <td style='text-align:right;font-size:0px;'>
                            <span style='width:144px;display:block;text-align:left;font-size:12px;'>
                              ${cfg.nsamples}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td style='text-align:right;'>${statistical_name}</td>
                          <td>
                          ${statistical_val}
                          </td>  
                        </tr>   
                        <tr>
                          <td style='text-align:right;'>${impurity_name}</td>
                          <td>
                          ${impurity_val}
                          </td>  
                        </tr> 
                        <tr>
                        <td style='text-align:right;'>平均值</td>
                        <td>
                        ${cfg.output.val}
                        </td>  
                      </tr>   
                        <tr>
                          <td style='text-align:right;'>决策点</td>
                          <td >
                          <div class='node-fsplit' name='${cfg.id}' style='width:140px;background:#eee;' onclick="window['__CUST_FN__']['evt_fsplit_btn'](this)">
                              ${cfg.fsplit}
                        </div>
                          </td>
                        </tr>  
                      </tbody>
                    </table>
                  
                  </div>
                    `,
                },
                draggable: false,
              });
            }

          }
          if(cfg['_class_'] == "<class 'sklearn.tree._classes.DecisionTreeClassifier'>"){
            shape = group.addShape('dom', {
              attrs: {
                width: cfg.size[0],
                height: cfg.size[1],
                html: `
                <div id=${cfg.id} class='dom-node noselect' style="background-color: #fff; border: 2px solid ${stroke}; border-radius: 5px; 
                  width: ${cfg.size[0] - 5}px; height: ${cfg.size[1] - 5}px;cursor: grab;">
                  <table style='font-size:10px; border-spacing:0px;'>
                    <thead>
                      <tr>
                        <th style='width:46px;text-align:right;'></th>
                        <th></th>
                      </tr>
                    <thead>
                    <tbody>
                      <tr>
                        <td style='text-align:center;' class='nodeSetting' ondblclick="event.stopPropagation();window['__CUST_FN__']['evt_setting_btn'](this)"> 
                          ${setting_icon}
                        </td>
                        <td>
                          <div class='node-fname' name='${cfg.id}' style='width:140px' onclick="window['__CUST_FN__']['evt_fname_btn'](this)">
                          ${cfg.fname}
                          </div>
                        </td>
                      </tr>   
                      <tr>
                        <td style='text-align:right;'>样本</td>
                        <td style='text-align:right;font-size:0px;'>
                          <span style='width:144px;display:block;text-align:center;font-size:12px;'>
                            N ${cfg.nsamples}
                          </span>
                          <span style='background-color:#efcaca;display:inline-block;font-size:12px;'>1</span>
                          <span style='background-color:#fff1f0;width: 56px;display:inline-block;font-size:12px;'>${positive}</span>
                          <span style='background-color:#b3f5dd;display:inline-block;font-size:12px;margin-left:6px;'>0</span>
                          <span style='background-color:#e6fffb;width: 66px;display:inline-block;font-size:12px;'>${negative}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style='text-align:right;'>比例</td>
                        <td style='text-align:right;font-size:0px;padding:0px;'>
                          <span style='background-color:#efcaca;display:inline-block;font-size:12px;'>1</span>
                          <span style='background-color:#fff1f0;width: 56px;display:inline-block;font-size:12px;'>${positive_rto}%</span>
                          <span style='background-color:#b3f5dd;display:inline-block;font-size:12px;margin-left:6px;'>0</span>
                          <span style='background-color:#e6fffb;width: 66px;display:inline-block;font-size:12px;'>${negative_rto}%</span>
                        </td>
                      </tr>
                      <tr>
                        <td style='text-align:right;'>标准</td>
                        <td>
                        ${impurity_name}(${impurity_val})
                        ${statistical_name}(${statistical_val})
                        </td>
                      </tr>
                      <tr>
                        <td style='text-align:right;'>决策点</td>
                        <td >
                        <div class='node-fsplit' name='${cfg.id}' style='width:140px' onclick="window['__CUST_FN__']['evt_fsplit_btn'](this)">
                            ${cfg.fsplit}
                      </div>
                        </td>
                      </tr>  
                    </tbody>
                  </table>
                
                </div>
                  `,
              },
              draggable: false,
            });
          }
          // console.log($(shape))

          return shape;
        }, 
        getAnchorPoints() {
          return [
            [0.5, 1], // [x, y] 一组 0 ～ 1  左边 ～ 右边，上边 ～ 下边
            [0.5, 0]
          ];
        },
        });
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
    }
  }
}
</script>

<style scoped>
/* 提示框的样式 */
>>> .g6-tooltip {
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  font-size: 12px;
  color: #545454;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px 8px;
  box-shadow: rgb(174, 174, 174) 0px 0px 10px;
}
</style>