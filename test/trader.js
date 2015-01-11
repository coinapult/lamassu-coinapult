var should = require('chai').should();

var plugin = require('../main');
var common = require('../lib/common');


var REQUIRED_MOCK_PROPERTIES = ['key', 'secret'];


// re-reads *uncached* version of config JSON
function requireFresh(file) {
  delete require.cache[require.resolve(file)];
  return require(file);
}


if (!process.env.TRAVIS) {
  describe(plugin.NAME + ' Trader', function() {
    // NOTE: MAX timeout for each test
    this.timeout(7000);

    var configMock = null;

    describe('Mock config file', function() {

      it('`test/mockConfig.json` should exist', function() {
        should.not.Throw(function() {
          configMock = requireFresh('./mockConfig.json');
        });

        configMock.should.be.an('object');
      });

      if (REQUIRED_MOCK_PROPERTIES.length) {
        REQUIRED_MOCK_PROPERTIES.forEach(function(property) {
          it('should have \'' + property + '\' property', function() {
            configMock.should.have.property(property);
          });
        });
      }
    });

    describe('Credentials', function() {

      it('should have valid and activated API credentials', function(done) {
        should.not.Throw(function() {
          plugin.config(requireFresh('./mockConfig.json'));
        });

        plugin.balance(function(err) {
          should.not.exist(err);
          done();
        });
      });
    });

    describe('Requests', function() {

      var balance = null;
      var minSize = 0.0005 * 1e8;


      it('should return valid balance', function(done) {
        plugin.balance(function(err, localBalance) {
          should.not.exist(err);
          localBalance.USD.should.be.a('number');
          isNaN(localBalance.USD).should.not.equal(true);

          localBalance.BTC.should.be.a('number');
          isNaN(localBalance.BTC).should.not.equal(true);

          balance = localBalance;

          done();
        });
      });

      describe('Buy (convert BTC to USD)', function() {
        it('should fail when amount is zero', function(done) {
          plugin.purchase(0, null, function(err) {
            should.exist(err);

            done();
          });
        });

        it('should fail when amount too small', function(done) {
          var tooSmallAmount = 10000;  /* satoshis */

          plugin.purchase(tooSmallAmount, null, function(err) {
            should.exist(err);

            err.message.should.have.string('too small');

            done();
          });
        });

       it('should have at least $1 on account', function() {
          balance.USD.should.be.above(1);
        });

        it('should successfully place order', function(done) {
          plugin.purchase(minSize, null, function(err, data) {
            should.not.exist(err);

	    data.transaction_id.should.be.a('string');
	    data.timestamp.should.be.a('number');
	    (data.in.expected).should.be.equal(minSize / 1e8);

            done();
          });
        });
      });

      describe('Sell (convert USD to BTC)', function() {
        it('should fail when amount is zero', function(done) {
          plugin.sell(0, null, function(err) {
            should.exist(err);

            done();
          });
        });

        it('should fail when amount too small', function(done) {
          var tooSmallAmount = 10000;  /* satoshis */

          plugin.sell(tooSmallAmount, null, function(err) {
            should.exist(err);

            err.message.should.have.string('too small');

            done();
          });
        });

        it('should have at least $1 *in BTC* on account', function() {
          plugin.ticker('USD', function(err, results) {
            var price = results.USD.rate;
	    (balance.BTC / 1e8).should.be.above(1 / price);
          });
        });

        it('should successfully place order', function(done) {
          plugin.sell(minSize, null, function(err, data) {
            should.not.exist(err);

            data.transaction_id.should.be.a('string');
            data.timestamp.should.be.a('number');
            (data.out.expected).should.be.equal(minSize / 1e8);

            done();
          });
        });
      });

    });
  });
}
