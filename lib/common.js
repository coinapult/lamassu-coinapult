var coinapult = require('./coinapult').create();
/* Set one or more keys to 0 to disable support for them. */
var TICKER_CURRENCIES = {USD: 1, EUR: 1, GBP: 1};

exports.coinapult = coinapult;
exports.TICKER_CURRENCIES = TICKER_CURRENCIES;

exports.config = function (cfg) {
  coinapult.apiKey = cfg.key;
  coinapult.apiSecret = cfg.secret;
}

exports.balance = function (callback) {
  coinapult.accountInfo(function (err, req, body) {
    if (err) {
      return callback(err);
    }
    var data = JSON.parse(body);
    var amount, balances = {};
    for (var i = 0; i < data.balances.length; i++) {
	amount = data.balances[i].amount;
        balances[data.balances[i].currency] = amount;
    }
    console.log(balances);
    callback(null, balances);
  }, 'normal');
};
