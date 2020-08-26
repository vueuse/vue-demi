const Vue = require('vue')
const CompositionAPI = require('@vue/composition-api')

if (Vue && !Vue['__composition_api_installed__'])
  Vue.use(CompositionAPI)

Object.keys(CompositionAPI).forEach(key => {
  // VCA exports it's own version, should not populate `Vue.version`
  if (!Vue[key] && key !== 'version') { 
    Vue[key] = CompositionAPI[key]
  }
})

module.exports = Vue
