import Vue from 'vue-v2.7'
import { getCurrentInstance } from 'vue-v2.7'
import type { PluginFunction, PluginObject, VueConstructor, Directive, InjectionKey } from 'vue-v2.7'

export declare type Plugin = PluginObject<any> | PluginFunction<any>

export type { VNode } from 'vue'

export interface App<T = any> {
  config: VueConstructor['config']
  use: VueConstructor['use']
  mixin: VueConstructor['mixin']
  component: VueConstructor['component']
  directive(name: string): Directive | undefined
  directive(name: string, directive: Directive): this
  provide<T>(key: InjectionKey<T> | string, value: T): this
  mount: Vue['$mount']
  unmount: Vue['$destroy']
}

const isVue2 = true
const isVue3 = false
const Vue2 = Vue
const warn = Vue.util.warn

function install() {}

// createApp polyfill
export function createApp(rootComponent: any, rootProps?: any): App {
  let vm: any
  const provide: any = {}
  const app = {
    config: Vue.config,
    use: Vue.use.bind(Vue),
    mixin: Vue.mixin.bind(Vue),
    component: Vue.component.bind(Vue),
    provide: function (key: string, value) {
      provide[key] = value
      return this
    },
    directive: function (name, dir) {
      if (dir) {
        Vue.directive(name, dir)
        return app
      } else {
        return Vue.directive(name)
      }
    },
    mount: function (el, hydrating) {
      if (!vm) {
        vm = new Vue(Object.assign({ propsData: rootProps }, rootComponent, { provide: Object.assign(provide, rootComponent.provide) }))
        vm.$mount(el, hydrating)
        return vm
      } else {
        return vm
      }
    },
    unmount: function () {
      if (vm) {
        vm.$destroy()
        vm = undefined
      }
    },
  } as App
  return app
}

export {
  Vue,
  Vue2,
  isVue2,
  isVue3,
  install,
  warn
}

// Vue 3 components mock
function createMockComponent(name: string) {
  return {
    setup() {
      throw new Error('[vue-demi] ' + name + ' is not supported in Vue 2. It\'s provided to avoid compiler errors.')
    }
  }
}
export const Fragment = /*#__PURE__*/ createMockComponent('Fragment')
export const Transition = /*#__PURE__*/ createMockComponent('Transition')
export const TransitionGroup = /*#__PURE__*/ createMockComponent('TransitionGroup')
export const Teleport = /*#__PURE__*/ createMockComponent('Teleport')
export const Suspense = /*#__PURE__*/ createMockComponent('Suspense')
export const KeepAlive = /*#__PURE__*/ createMockComponent('KeepAlive')

export * from 'vue-v2.7'

// Not implemented https://github.com/vuejs/core/pull/8111, falls back to getCurrentInstance()
export function hasInjectionContext() {
  return !!getCurrentInstance()
}
