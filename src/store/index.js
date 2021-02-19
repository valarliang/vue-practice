import Vue from 'vue'
import Vuex from "vuex";

// import Vuex from '../utils/vuex.js'
Vue.use(Vuex)

const modules = {}
const requireModules = require.context('./modules', false, /\.js$/)
requireModules.keys().forEach(key => {
  const name = key.replace(/^\.\//, '').replace(/\.\w+$/, '')
  modules[name] = requireModules(key).default
})
const store = new Vuex.Store({
  modules,
  getters: {
    roles: state => state.user.roles
  }
})

export default store