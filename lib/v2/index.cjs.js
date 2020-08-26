const Vue = require('vue')
const CompositionAPI = require('@vue/composition-api')

if (Vue && !Vue['__composition_api_installed__'])
  Vue.use(CompositionAPI)

module.exports = Vue

Object.keys(CompositionAPI).forEach(key => {
  module.exports[key] = CompositionAPI[key]
})
