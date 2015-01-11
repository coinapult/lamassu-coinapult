var coinapult = require('./common').coinapult;


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
  }, null, coinapult.fiat, amount, 'BTC');

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
  }, amount, 'BTC', null, coinapult.fiat);
};
