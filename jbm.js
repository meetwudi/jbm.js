(function(window) {
  "use strict";
  var jbm, 
      _originJbm,
      debugMode = !!window.__karma__; 

  /**
   *  Helper methods
   */
  
  // get parameter list of fn
  function parseParams(fn) {
    var fns = fn.toString(),
        names = fns.slice(fns.indexOf('(') + 1, fns.indexOf(')')).split(','),
        i;
    for (i = 0; i < names.length; i ++) {
      names[i] = names[i].replace(/\s+/, '');
    }
  }

  // test if a string is in the array
  function contains(value, arr) {
    var i;
    for (i = 0; i < arr.length; i ++) {
      if (arr[i] === value) {
        return true;
      }
    }
    return false;
  }

  // check if fn requires a done function
  function verifyAsync(fn) {
    var params = parseParams(fn);
    return contains('done', params);
  }




  /**
   *  Jbm API
   */
  
  // test case wrapper
  jbm.runTest = function(name, fn, reporterCallback) {
    jbm.runTest(name, fn, function(result) {

    });
  };
  
  // Restore window.jbm to its original state before jbm initialization
  jbm.noConflict = function() {
    window.jbm = _originJbm;
    return jbm;
  };

  /**
   *  Jbm private methods
   */
  
  // main body of test runner
  // pass the timeUsed into cb callback
  jbm._runTest = function(name, fn, cb) {
    var isAsync = verifyAsync(fn),
        ts = performance.now();
    if (isAsync) {
      fn(jbm._done.bind(this));
    }
    else {
      fn();
      cb(performance.now() - ts);
    }
  }

  // done function called when async test case finishes
  // This function's context is binded to jbm._runTest
  jbm._done = function() {
    cb(performance.now() - ts);
  }


  /**
   *  Initialization
   */
  
  // addtional API for debugging only
  if (debugMode) {
    jbm.debug = {};
    jbm.debug.parseParams = parseParams;
    jbm.debug.contains = contains;
    jbm.debug.verifyAsync = verifyAsync;
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