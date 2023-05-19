import * as Vue from 'vue'
import {getCurrentInstance} from "vue";

var isVue2 = false
var isVue3 = true
var Vue2 = undefined

function install() {}

export function set(target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  target[key] = val
  return val
}

export function del(target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1)
    return
  }
  delete target[key]
}

export * from 'vue'
export {
  Vue,
  Vue2,
  isVue2,
  isVue3,
  install,
}

//Fix hasInjectionContext is not defined https://github.com/vueuse/vue-demi/issues/233
export function hasInjectionContext() {
  return !!getCurrentInstance()
}
