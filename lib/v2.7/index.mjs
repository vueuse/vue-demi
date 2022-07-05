import Vue from 'vue'

var isVue2 = true
var isVue3 = false
var Vue2 = Vue

function install() {}

// createApp polyfill
export function createApp(rootComponent, rootProps) {
  var mountedVM
  var provide = {}
  var app = {
    config: Vue.config,
    use: Vue.use.bind(V),
    mixin: Vue.mixin.bind(V),
    component: Vue.component.bind(V),
    provide: function (key, value) {
      provide[key] = value
      return this
    },
    directive: function (name, dir) {
      if (dir) {
        Vue.directive(name, dir)
        return app
      } else {
        return Vue.directive(name)
      }
    },
    mount: function (el, hydrating) {
      if (!mountedVM) {
        mountedVM = new Vue(Object.assign({ propsData: rootProps }, rootComponent, { provide: Object.assign(provide, rootComponent.provide) }))
        mountedVM.$mount(el, hydrating)
        return mountedVM
      } else {
        return mountedVM
      }
    },
    unmount: function () {
      if (mountedVM) {
        mountedVM.$destroy()
        mountedVM = undefined
      }
    },
  }
  return app
}

export { Vue, Vue2, isVue2, isVue3, install }
export * from 'vue'
