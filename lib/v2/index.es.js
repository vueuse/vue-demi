import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)

const isVue2 = true

export * from '@vue/composition-api'
export {
  Vue,
  isVue2,
}