import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'

if (Vue && !Vue['__composition_api_installed__'])
  Vue.use(VueCompositionAPI)

var isVue2 = true
var isVue3 = false
var version = Vue.version
var warn = console.warn

export * from '@vue/composition-api'
export {
  Vue,
  isVue2,
  isVue3,
  version,
  warn
}
