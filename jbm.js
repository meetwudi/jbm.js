(function(window) {
  "use strict";
  var jbm, _originJbm;

  // Restore window.jbm to its original state before jbm initialization
  jbm.noConflict = function() {
    window.jbm = _originJbm;
    return jbm;
  }

  // Set window.jbm to jbm itself.
  // Before doing that, backup the current window.jbm to _originJbm
  _originJbm = window.jbm;
  window.jbm = jbm;
  
  // If AMD style module loader is adopted
  if (!!window.define) {
    define('jbm', [], function() {
      return jbm.noConflict();
    });
  }
})(window);