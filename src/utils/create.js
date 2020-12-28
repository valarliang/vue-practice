import Vue from 'vue'

export default function create(component, props) {
  // 方法1：
  // const vm = new Vue({
  //   render(h) {
  //     return h(component, {props})
  //   }
  // }).$mount()
  // console.log(vm)
  // document.body.appendChild(vm.$el)

  // const comp = vm.$children[0]
  // comp.remove = () => {
  //   document.body.removeChild(vm.$el)
  //   vm.$destroy()
  // }
  // 方法2：
  const VComp = Vue.extend(component)
  const comp = new VComp({propsData: props}).$mount()
  console.log(comp)
  document.body.appendChild(comp.$el)
  comp.remove = () => {
    document.body.removeChild(comp.$el)
    comp.$destroy()
  }
  return comp
}