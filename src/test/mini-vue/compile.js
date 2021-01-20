class Compile {
  constructor(el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)
    if (this.$el) {
      this.compile(this.$el)
    }
  }
  compile(el) {
    const childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      if (this.isElement(node)) {
        this.compileElement(node)
        if (node.childNodes && node.childNodes.length > 0) this.compile(node)
      } else if (this.isInterposition(node)) {
        this.compileText(node)
      }
    })
  }
  isElement(node) {
    return node.nodeType == 1
  }
  isInterposition(node) {
    return node.nodeType == 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
  compileText(node) {
    this.update(node, RegExp.$1, 'text')
  }
  compileElement(node) {
    Array.from(node.attributes).forEach(attr => {
      const name = attr.name
      if (name.startsWith('v-')) {
        this.update(node, attr.value, name.slice(2))
      } else if (name.startsWith('@')) {
        this.eventHandler(node, attr.value, name.slice(1))
      }
    })
  }
  update(node, exp, type) {
    const updater = this[type + 'Updater'] && this[type + 'Updater'].bind(this)  // 函数赋值会失去this
    updater && updater(node, exp)
    new Watcher(this.$vm, exp, function () {
      updater && updater(node, exp)
    })
  }
  eventHandler(node, exp, type) {
    const methods = this.$vm.$options.methods
    if (methods && methods[exp]) {
      node.addEventListener(type, methods[exp].bind(this.$vm))
    }
  }
  textUpdater(node, key) {
    node.textContent = this.$vm[key]
  }
  htmlUpdater(node, key) {
    node.innerHTML = this.$vm[key]
  }
  modelUpdater(node, key) {
    node.value = this.$vm[key]
    node.addEventListener('input', e => {
      this.$vm[key] = e.target.value
    })
  }
}