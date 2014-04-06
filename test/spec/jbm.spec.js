define(['should', 'jbm'], function(should, jbm) {

  describe('jbm test', function() {
    it('should be able to sync run test and return the result', function(done) {
      var result = jbm.runTest('test', function() {
        for (var i = 0; i < 1000000; i ++) {
          document.getElementsByTagName('*');
        }
      }); 
      done();
    });
  });

});