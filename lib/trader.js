var coinapult = require('./common').coinapult;


/* XXX How to specify the Fiat currency here? */

exports.purchase = function (satoshis, options, callback) {
  var data, amount = (satoshis / 1e8).toFixed(8);

  coinapult.convert(function(err, raw, body) {
    if (err) {
      return callback(err);
    }
    data = JSON.parse(body);
    if (data.error) {
      return callback(new Error(data.error));
    }
    return callback(null, data);
  }, amount, 'BTC', null, 'USD');

};

exports.sell = function (satoshis, options, callback) {
  var data, amount = (satoshis / 1e8).toFixed(8);

  coinapult.convert(function(err, raw, body) {
    if (err) {
      return callback(err);
    }
    data = JSON.parse(body);
    if (data.error) {
      return callback(new Error(data.error));
    }
    return callback(null, data);
  }, null, 'USD', amount, 'BTC');
};
