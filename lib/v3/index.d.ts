import * as Vue from 'vue'
declare const isVue2: boolean
declare const isVue3: boolean
declare const install: (vue?: any) => void

export * from 'vue'
export {
  Vue,
  isVue2,
  isVue3,
  install,
}
