var coinapult = require('./common').coinapult;

exports.sendBitcoins = function (address, satoshis, fee, callback) {
  var data, amount = (satoshis / 1e8).toFixed(8);

  coinapult.send(function(err, raw, body) {
    if (err) {
      return callback(err);
    }
    data = JSON.parse(body);
    if (data.error) {
      return callback(new Error(data.error));
    }
    callback(null, data.transaction_id);
  }, amount, address, 'BTC');
};
