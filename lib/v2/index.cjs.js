const Vue = require('vue')
const CompositionAPI = require('@vue/composition-api')

if (Vue && !Vue['__composition_api_installed__'])
  Vue.use(VueCompositionAPI)

Object.keys(CompositionAPI).forEach(key => {
  exports[key] = CompositionAPI[key]
})
exports.Vue = Vue
exports.isVue2 = true
exports.isVue3 = false
