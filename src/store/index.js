import Vue from 'vue'
import Vuex from '../utils/vuex.js'
Vue.use(Vuex)

const store = new Vuex.Store({
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
})

export default store