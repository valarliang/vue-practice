export default function(vm) {
  const state = {
    queue: [], // 操作历史队列
    current: -1, // 当前在队列的下标
    commandList: [],
    commands: {},
    destroyList: []
  }
  const registry = (command) => {
    state.commandList.push(command)
    state.commands[command.name] = () => {
      const { redo, undo } = command.execute()
      redo()
      if (!command.pushQueue) return // 只保存拖拽操作
      let { current, queue } = state
      if (queue.length) {
        state.queue = queue.slice(0, current + 1) // 如果当前操作前是撤销操作，要去除废弃的操作历史，之后push最新（当前）操作
      }
      state.queue.push({ redo, undo })
      state.current++
    }
  }

  registry({
    name: 'redo',
    keyboard: 'ctrl+y',
    execute() {
      return {
        redo() {
          const item = state.queue[state.current + 1]
          if (item) {
            item.redo && item.redo()
            state.current++
          }
        }
      }
    }
  })
  registry({
    name: 'undo',
    keyboard: 'ctrl+z',
    execute() {
      return {
        redo() {
          if (state.current === -1) return
          const item = state.queue[state.current]
          if (item) {
            item.undo && item.undo()
            state.current--
          }
        }
      }
    }
  })
  registry({
    name: 'drag',
    pushQueue: true,
    init() {
      this.before = null
      const start = () => this.before = JSON.parse(JSON.stringify(vm.config.blocks))
      const end = () => state.commands.drag()
      vm.$on('dragstart', start)
      vm.$on('dragend', end)
      return () => {
        vm.$off('dragstart', start)
        vm.$off('dragend', end)
      }
    },
    execute() {
      const before = this.before // this要在此处获取
      const after = vm.config.blocks // 记录最新状态以供闭包使用
      return {
        redo() {
          vm.$store.commit('visualizeConfig/UPDATE_ALL_BLOCKS', after)
        },
        undo() { 
          vm.$store.commit('visualizeConfig/UPDATE_ALL_BLOCKS', before)
        }
      }
    }
  })
  // 监听快捷键
  const onKeydown = (e) => {
    const codes = { 90: 'z', 89: 'y' }
    if (e.ctrlKey) {
      const code = codes[e.keyCode]
      code && state.commands[state.commandList.find(c => c.keyboard === `ctrl+${code}`).name]()
    }
  }
  window.addEventListener('keydown', onKeydown)
  state.destroyList.push(() => window.removeEventListener('keydown', onKeydown))
  state.commandList.forEach(c => c.init && state.destroyList.push(c.init()))
  return state
}