import Vue from 'vue'
import App from './App.vue'
import router from './router'
import mixins from './utils/mixins'
// eslint-disable-next-line
import global from './components/globalComponent'

Vue.config.productionTip = false

Vue.mixin(mixins)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
