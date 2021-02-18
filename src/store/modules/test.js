export default {
  namespaced: true,
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  getters: {
    double: state => {
      return state.count*2
    }
  },
  actions: {
    increment ({ commit }) {
      commit('increment')
    }
  }
}