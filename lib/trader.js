var coinapult = require('./common').coinapult;


/* XXX How to specify the Fiat currency here? */

exports.purchase = function (satoshis, options, callback) {
  var amount = (satoshis / 1e8).toFixed(8);

  coinapult.convert(function(err, raw, body) {
    if (err) {
      return callback(err);
    }
    return callback(null, JSON.parse(body));
  }, amount, 'BTC', 'USD');

};

exports.sell = function (satoshis, options, callback) {
  var amount = (satoshis / 1e8).toFixed(8);

  coinapult.convert(function(err, raw, body) {
    if (err) {
      return callback(err);
    }
    return callback(null, JSON.parse(body));
  }, amount, 'USD', 'BTC');
};
