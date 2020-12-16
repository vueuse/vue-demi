import Vue from 'vue'
declare const isVue2: boolean
declare const isVue3: boolean
declare const version: string
declare const install: (vue?: Vue) => void

export * from '@vue/composition-api'
export {
  Vue,
  isVue2,
  isVue3,
  version,
  install,
}
