import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'

if (Vue && !Vue['__composition_api_installed__'])
  Vue.use(VueCompositionAPI)

const isVue2 = true
const isVue3 = false
const version = Vue.version

export * from '@vue/composition-api'
export {
  Vue,
  isVue2,
  isVue3,
  version,
}