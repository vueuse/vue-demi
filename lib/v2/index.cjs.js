var Vue = require('vue')
var VueCompositionAPI = require('@vue/composition-api')

function install(_vue) {
  _vue = _vue || Vue
  if (_vue && !_vue['__composition_api_installed__']) {
    if (VueCompositionAPI && 'default' in VueCompositionAPI)
      _vue.use(VueCompositionAPI.default)
    else if (VueCompositionAPI)
      _vue.use(VueCompositionAPI)
  }
}

install(Vue)

Object.keys(VueCompositionAPI).forEach(function(key) {
  exports[key] = VueCompositionAPI[key]
})

exports.Vue = Vue
exports.isVue2 = true
exports.isVue3 = false
exports.install = install
exports.version = Vue.version
