import Vue from 'vue'

export default function create(component, props) {
  const vm = new Vue({
    render(h) {
      return h(component, {props})
    }
  }).$mount()
  document.body.appendChild(vm.$el)
  const comp = vm.$children[0]
  comp.remove = () => {
    document.body.removeChild(vm.$el)
    vm.$destroy()
  }

  // const Ctor = Vue.extend(component)
  // const comp = new Ctor({propsData: props}).$mount()
  // document.body.appendChild(comp.$el)
  // comp.remove = () => {
  //   document.body.removeChild(comp.$el)
  //   comp.$destroy()
  // }
  return comp
}