import Vue from 'vue'

var isVue2 = true
var isVue3 = false
var Vue2 = Vue

function install() {}

export function set(target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  Vue.set(target, key, val)
  return val
}

export function del(target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1)
    return
  }
  Vue.delete(target, key)
}

export * from 'vue'
export {
  Vue,
  Vue2,
  isVue2,
  isVue3,
  install,
}
