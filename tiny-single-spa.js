const { bootstrap } = require("@/main");

// 应用状态
const NOT_LOADED = 'NOT_LOADED';
const LOADING_SOURCE_CODE = 'LOADING_SOURCE_CODE';
const NOT_BOOTSTRAPPED = 'NOT_BOOTSTRAPPED';
const BOOTSTRAPPING = 'BOOTSTRAPPING';
const NOT_MOUNTED = 'NOT_MOUNTED';
const MOUNTING = 'MOUNTING';
const MOUNTED = 'MOUNTED';
const UPDATING = 'UPDATING';
const UNMOUNTING = 'UNMOUNTING';
const UNLOADING = 'UNLOADING';
const LOAD_ERR = 'LOAD_ERR';
const SKIP_BECAUSE_BROKEN = 'SKIP_BECAUSE_BROKEN';
function isActive(app) {
  return app.status === MOUNTED
}
function shouldBeActive(app) {
  return app.activeWhen(window.location)
}
function getAppsStatus() {
  const appsToLoad = []
  const appsToMount = []
  const appsToUnmount = []
  apps.forEach(app => {
    const appShouldBeActive = shouldBeActive(app)
    switch(app.status) {
      case NOT_LOADED:
      case LOADING_SOURCE_CODE:
        if(appShouldBeActive) appsToLoad.push(app)
        break
      case NOT_BOOTSTRAPPED:
      case BOOTSTRAPPING:
      case NOT_MOUNTED:
        if(appShouldBeActive) appsToMount.push(app)
        break
      case MOUNTED:
        if(!appShouldBeActive) appsToUnmount.push(app)
    }
  })
  return {appsToLoad, appsToMount, appsToUnmount}
}
function flattenFns(arr) {
  const fns = Array.isArray(arr) ? arr : [arr]
  return (props) => fns.reduce((acc, cur) => acc.then(() => cur(props)), Promise.resolve())
}
function loadApps(app) {
  if (app.loaded) return app.loaded
  return app.loaded = Promise.resolve().then(async () => {
    app.status = LOADING_SOURCE_CODE
    const { bootstrap, mount, unmount } = await app.loadApp(app.customProps)
    app.status = NOT_BOOTSTRAPPED
    app.bootstrap = flattenFns(bootstrap)
    app.mount = flattenFns(mount)
    app.unmount = flattenFns(unmount)
    delete app.loaded // 主要目的是避免两次app.loadApp(app.customProps)，所以及时清除缓存
    return app
  })
}
async function bootstrapApps(app) {
  if (app.status !== NOT_BOOTSTRAPPED) return app
  app.status = BOOTSTRAPPING
  await app.bootstrap()
  app.status = NOT_MOUNTED
  return app
}
async function mountApps(app) {
  if (app.status !== NOT_MOUNTED) return app
  app.status = MOUNTING
  await app.bootstrap()
  app.status = MOUNTED
  return app
}
async function unmountApps(app) {
  if (app.status !== MOUNTED) return app
  app.status = UNMOUNTING
  await app.unmount()
  app.status = NOT_MOUNTED
  return app
}

const apps = []
let started = false
function reroute() {
  const {appsToLoad, appsToMount, appsToUnmount} = getAppsStatus()
  if (started) {
    return performAppChanges() // 挂载
  } else {
    return loadApp() // 预加载
  }
  async function loadApp() {
    let apps = await Promise.all(appsToLoad.map(loadApps))
  }
  async function performAppChanges() {
    const unMountedApps = await appsToUnmount.map(unmountApps)
    appsToLoad.map(async app => {
      app = await loadApps(app)
      app = await bootstrapApps(app)
      return await mountApps(app)
    })
    appsToMount.map(async app => {
      app = await bootstrapApps(app)
      return await mountApps(app)
    })
  }
}
/**
 *
 * @param {String} appName 应用名称
 * @param {Promise} loadApp 应用加载生命周期
 * @param {*} activeWhen 激活规则
 * @param {*} customProps 自定义属性
 */
function registerApplication(appName, loadApp, activeWhen, customProps) {
  apps.push({name: appName, loadApp, activeWhen, customProps, status: NOT_LOADED})
  reroute() // 预加载
}

function start() {
  started = true
  reroute() // 根据路径挂载
}

// 路由劫持
const routingEvents = ['hashchange','popstate']
function urlReroute() {
  reroute(arguments)
}
window.addEventListener('hashchange', urlReroute)
window.addEventListener('popstate', urlReroute)

const originalAddEventLithener = window.addEventListener
const originalRemoveEventLithener = window.removeEventListener
const capturedEvent = { // 暂存框架/用户自定义的路由事件回调，后续执行
  hashchange: [],
  popstate: [],
}

window.addEventListener = function(name, fn) {
  if (routingEvents.includes(name) && !capturedEvent[name].some(e => e == fn)) capturedEvent[name].push(fn)
  else return originalAddEventLithener.apply(this, arguments)
}
window.removeEventListener = function(name, fn) {
  if (routingEvents.includes(name)) capturedEvent[name] = capturedEvent[name].filter(e => e !== fn)
  else return originalRemoveEventLithener.apply(this, arguments)
}

function patchUpdateState(origin) {
  return function() {
    const urlBefore = window.location.href
    origin.apply(this, arguments)
    const urlAfter = window.location.href
    urlBefore !== urlAfter && urlReroute(new PopStateEvent('popstate'))
  }
}
window.history.pushState = patchUpdateState(window.history.pushState)
window.history.replaceState = patchUpdateState(window.history.replaceState)