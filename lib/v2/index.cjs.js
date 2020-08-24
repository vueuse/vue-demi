const Vue = require('vue')
const CompositionAPI = require('@vue/composition-api')

Vue.use(CompositionAPI)

Object.keys(CompositionAPI).forEach(key => {
  // VCA exports it's own version, should not populate `Vue.version`
  if (!Vue[key] && key !== 'version') { 
    Vue[key] = CompositionAPI[key]
  }
})

module.exports = Vue
