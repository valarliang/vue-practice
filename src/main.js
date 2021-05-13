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
import permission from './directive/permission';

Vue.config.productionTip = false
Vue.mixin(mixins)
Vue.prototype.$create = create
Vue.directive('permission', permission)

if (window.__POWERED_BY_QIANKUN__) {
// eslint-disable-next-line
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
} else render()

// let router = null;
let instance = null;
function render(props = {}) {
  const { container } = props;

  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}
export async function mount(props) {
  console.log('[vue] props from main framework', props);
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  // router = null;
}