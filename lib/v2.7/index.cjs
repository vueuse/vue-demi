var Vue = require('vue')

Object.keys(Vue).forEach(function(key) {
  exports[key] = Vue[key]
})

exports.Vue = Vue
exports.Vue2 = Vue
exports.isVue2 = true
exports.isVue3 = false
exports.install = function(){}
