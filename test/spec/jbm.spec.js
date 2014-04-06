define(['should', 'jbm'], function(should, jbm) {

  describe('jbm test', function() {
    it('should be able to sync run test', function(done) {
      jbm.runTest('test', function() {
        for (var i = 0; i < 1000000; i ++) {
          document.getElementsByTagName('*');
        }
      }); 
      done();
    });

    it('should be able to async run test', function(done) {
      var outerDone = done;
      jbm.runTest('async test', function(done) {
        setTimeout(function() {
          done();
          outerDone();
        }, 10);
      });
    });

    it('should be able to sync run test and return a result to reporterCallback', function(done) {
      jbm.runTest('test with reporterCallback', function() {
        for (var i = 0; i < 1000000; i ++) {
          document.getElementsByTagName('*');
        }
      }, function(name, result) {
        should(name).be.a.String;
        should(result).be.a.Number;
      }); 
      done();
    });
  });

    it('should be able to async run test and return a result to reporterCallback', function(done) {
      var outerDone = done;
      jbm.runTest('async test with reporterCallback', function(done) {
        setTimeout(function() {
          done();
          outerDone();
        }, 50);
      }, function(name, result) {
        should(name).be.a.String;
        should(result).be.a.Number;
      });
    });

});