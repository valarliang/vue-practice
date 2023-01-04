const state = {
  container: { width: 1000, height: 550 },
  blocks: [
    { top: 100, left: 100, width: 190, height: 150, zIndex: 1, focus: false, droped: false, type: 'bar'},
    { top: 200, left: 200, width: 300, height: 180, zIndex: 1, focus: false, droped: false, type: 'line'}
  ]
}
const mutations = {
  ADD_BLOCKS({blocks}, block) {
    blocks.push(block)
  },
  UPDATE_BLOCKS({blocks}, {index, config}) {
    blocks.splice(index, 1, config)
  }
}
const actions = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}