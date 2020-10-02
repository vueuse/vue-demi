(function(window) {
  var VueDemi = {};
  var Vue = window.Vue;
  if (Vue) {
    if (Vue.version.startsWith('2.')) {
      var VueCompositionAPI = window.VueCompositionAPI;
      if (VueCompositionAPI) {
        Object.assign(VueDemi, VueCompositionAPI, {
          Vue: Vue,
          isVue2: true,
          isVue3: false,
        });
      }
    } else
    if (Vue.version.startsWith('3.')) {
      Object.assign(VueDemi, Vue, {
        Vue: Vue,
        isVue2: false,
        isVue3: true,
      });
    }
  }
  window.VueDemi = VueDemi;
})(window);
