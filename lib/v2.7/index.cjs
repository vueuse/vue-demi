var Vue = require('vue')

exports.Vue = Vue
exports.Vue2 = Vue
exports.isVue2 = true
exports.isVue3 = false
exports.install = function(){}

// createApp polyfill
exports.createApp(rootComponent, rootProps) {
  var mountedVM
  var provide = {}
  var app = {
    config: Vue.config,
    use: Vue.use.bind(V),
    mixin: Vue.mixin.bind(V),
    component: Vue.component.bind(V),
    provide(key, value) {
      provide[key] = value
      return this
    },
    directive(name, dir) {
      if (dir) {
        Vue.directive(name, dir)
        return app
      } else {
        return Vue.directive(name)
      }
    },
    mount: function (el, hydrating) {
      if (!mountedVM) {
        mountedVM = new Vue(Object.assign(
          { propsData: rootProps },
          rootComponent, 
          { provide: Object.assign(provide, rootComponent.provide) }
        ))
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

Object.keys(Vue).forEach(function(key) {
  exports[key] = Vue[key]
})
