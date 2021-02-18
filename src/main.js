import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mixins from './utils/mixins'
// eslint-disable-next-line
import global from './components/globalComponent'
import './assets/styles/reset.css'
import './assets/icons'
import create from '@/utils/create.js'
import Notice from '@/components/notice.vue'
import './auth';

Vue.config.productionTip = false

Vue.mixin(mixins)

Vue.prototype.$notice = (config) => {
  const ins = create(Notice, config)
  ins.show()
}

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
