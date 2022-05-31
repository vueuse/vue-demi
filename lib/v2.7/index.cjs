var Vue = require('vue')

Object.keys(Vue).forEach(function(key) {
  exports[key] = Vue[key]
})

exports.set = function(target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  Vue.set(target, key, val)
  return val
}

exports.del = function(target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1)
    return
  }
  Vue.delete(target, key)
}

exports.Vue = Vue
exports.Vue2 = Vue
exports.isVue2 = true
exports.isVue3 = false
exports.install = function(){}
