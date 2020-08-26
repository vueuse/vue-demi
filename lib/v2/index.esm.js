import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'

if (Vue && !Vue['__composition_api_installed__'])
  Vue.use(VueCompositionAPI)

export * from '@vue/composition-api'
export { Vue }
export default Vue
