const path = require('path')
const ctx = require.context('@/components/Charts/', false, /\.vue$/)
const componentList = []
const componentMap = []
ctx.keys().forEach(e => {
  const component = ctx(e).default
  const type = path.basename(e, '.vue')
  const componentConfig = {
    label: component.label, type, component, preview: component
  }
  componentList.push(componentConfig)
  componentMap[type] = componentConfig
})

export default {
  componentList,
  componentMap
}