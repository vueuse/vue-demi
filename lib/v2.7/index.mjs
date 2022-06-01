import Vue from 'vue'

var isVue2 = true
var isVue3 = false
var Vue2 = Vue

function install() {}

export * from 'vue'
export {
  Vue,
  Vue2,
  isVue2,
  isVue3,
  install,
}
