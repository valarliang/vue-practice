import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mixins from './utils/mixins'
// eslint-disable-next-line
import global from './components/globalComponent'
import './assets/styles/reset.css'

Vue.config.productionTip = false

Vue.mixin(mixins)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
