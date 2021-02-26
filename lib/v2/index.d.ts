import Vue from 'vue'
declare const isVue2: boolean
declare const isVue3: boolean
declare const Vue2: Vue
declare const version: string
declare const install: (vue?: Vue) => void
/** @deprecated */
declare const V: Vue

export * from '@vue/composition-api'
export {
  V as Vue,
  Vue2,
  isVue2,
  isVue3,
  version,
  install,
}
