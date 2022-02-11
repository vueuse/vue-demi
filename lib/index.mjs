import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api/dist/vue-composition-api.mjs'

var isVue2 = true
var isVue3 = false
var Vue2 = Vue.default || Vue
var version = Vue?.default.version || Vue.version

function install(_vue) {
  _vue = _vue || Vue
  const COMPOSITION_API_INSTALLED = '__composition_api_installed__';

  if (_vue && !(_vue[COMPOSITION_API_INSTALLED] || _vue.default?.[COMPOSITION_API_INSTALLED])) {
    Vue2.use(VueCompositionAPI)
  }
}

install(Vue2)

/**VCA-EXPORTS**/
export * from '@vue/composition-api/dist/vue-composition-api.mjs'
/**VCA-EXPORTS**/

export {
  Vue,
  Vue2,
  isVue2,
  isVue3,
  version,
  install,
}
