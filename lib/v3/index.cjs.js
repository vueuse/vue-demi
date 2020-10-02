const Vue = require('vue')

Object.keys(Vue).forEach(key => {
  exports[key] = Vue[key]
})
exports.Vue = Vue
exports.isVue2 = false
exports.isVue3 = true
