const Vue = require('vue')
const CompositionAPI = require('@vue/composition-api')

Vue.use(CompositionAPI)

module.exports = Vue

Object.keys(CompositionAPI).forEach(key => {
  module.exports[key] = CompositionAPI[key]
})