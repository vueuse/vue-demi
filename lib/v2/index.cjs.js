const Vue = require('vue')
const VueCompositionAPI = require('@vue/composition-api')

if (Vue && !Vue['__composition_api_installed__'])
  Vue.use(VueCompositionAPI)

Object.keys(VueCompositionAPI).forEach(key => {
  exports[key] = VueCompositionAPI[key]
})
exports.Vue = Vue
exports.isVue2 = true
exports.isVue3 = false
exports.version = Vue.version
