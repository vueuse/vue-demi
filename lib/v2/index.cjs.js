var Vue = require('vue')
var VueCompositionAPI = require('@vue/composition-api')

if (Vue && !Vue['__composition_api_installed__']) {
  if (VueCompositionAPI && 'default' in VueCompositionAPI)
    Vue.use(VueCompositionAPI.default)
  else if (VueCompositionAPI)
    Vue.use(VueCompositionAPI)
}

Object.keys(VueCompositionAPI).forEach(function(key) {
  exports[key] = VueCompositionAPI[key]
})

exports.Vue = Vue
exports.isVue2 = true
exports.isVue3 = false
exports.version = Vue.version
