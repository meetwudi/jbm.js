define(['should', 'jbm'], function(should, jbm) {

  describe('helper test', function() {
    it('parse function parameter name list', function(done) {
      var argNames = jbm.debug.parseParams(function(a, b, $test){});
      should.deepEqual(argNames, ['a', 'b', '$test']);
      done();
    });

    it('can check if an function requires a done function', function(done) {
      var result;
      result = jbm.debug.verifyAsync(function(done) {});
      should(result).be.ok;
      result = jbm.debug.verifyAsync(function() {});
      should(result).not.be.ok;
      result = jbm.debug.verifyAsync(function(arb) {});
      should(result).not.be.ok;
      done();
    });
  });

});