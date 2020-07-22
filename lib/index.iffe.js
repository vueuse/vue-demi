(function (window) {
  if (window.Vue && window.Vue.version) {
    var v = window.Vue.version[0];
    if (v === "3") {
      window.VueDemi = window.Vue;
    } else if (v === "2") {
      var Demi = window.Vue;
      var VCA = window.VueCompositionAPI || {};
      for (const k in VCA) {
        Demi[k] = VCA[k];
      }
      window.VueDemi = Demi;
    }
  }
})(window);
