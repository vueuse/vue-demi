(function(window) {
  var VueDemi = {};
  var Vue = window.Vue;
  if (Vue) {
    if (Vue.version.startsWith('2.')) {
      var VueCompositionAPI = window.VueCompositionAPI;
      if (VueCompositionAPI) {
        Vue.use(VueCompositionAPI);
        Object.assign(VueDemi, VueCompositionAPI, {
          Vue: Vue,
          isVue2: true,
        });
      }
    } else
    if (Vue.version.startsWith('3.')) {
      Object.assign(VueDemi, Vue, {
        Vue: Vue,
        isVue2: false,
      });
    }
  }
  window.VueDemi = VueDemi;
})(window);
