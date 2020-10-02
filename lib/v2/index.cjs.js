const Vue = require('vue')
const CompositionAPI = require('@vue/composition-api')

Vue.use(CompositionAPI)

Object.keys(CompositionAPI).forEach(key => {
  exports[key] = CompositionAPI[key]
})
exports.Vue = Vue
exports.isVue2 = true
