import * as Vue from 'vue'

const isVue2 = false
const isVue3 = true
const Vue2 = undefined

function install() {}

export function set<T>(target: any, key: any, val: T): T {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  target[key] = val
  return val
}

export function del(target: any, key: any): void {
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
