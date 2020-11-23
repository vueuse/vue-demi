import Vue from 'vue'
declare const isVue2: boolean
declare const isVue3: boolean
declare function warn(msg: string): void
declare const version: string
export * from '@vue/composition-api'
export {
  Vue,
  isVue2,
  isVue3,
  warn,
  version,
}
