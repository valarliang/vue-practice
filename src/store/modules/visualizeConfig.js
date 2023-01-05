const state = {
  container: { width: 1000, height: 550 },
  blocks: [
    { top: 100, left: 100, width: 190, height: 150, zIndex: 1, focus: false, type: 'bar'},
    { top: 200, left: 200, width: 300, height: 180, zIndex: 1, focus: false, type: 'line'}
  ]
}
// 由于 撤销重做功能 需要记录blocks编辑前后状态，所以要用纯函数
const mutations = {
  ADD_BLOCKS({blocks}, block) {
    state.blocks = [...blocks, block]
  },
  UPDATE_BLOCKS({blocks}, {index, config}) {
    state.blocks = blocks.map((b, i) => i === index ? config : b)
  },
  UPDATE_ALL_BLOCKS(state, newBlocks) {
    state.blocks = newBlocks
  }
}
const actions = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}