import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api/dist/vue-composition-api.esm.js'

function install(_vue) {
  _vue = _vue || Vue
  if (_vue && !_vue['__composition_api_installed__'])
    Vue.use(VueCompositionAPI)
}

install(Vue)

var isVue2 = true
var isVue3 = false
var Vue2 = Vue
var version = Vue.version

/**VCA-EXPORTS**/
export * from '@vue/composition-api/dist/vue-composition-api.esm.js'
/**VCA-EXPORTS**/

export {
  Vue,
  Vue2,
  isVue2,
  isVue3,
  version,
  install,
}
