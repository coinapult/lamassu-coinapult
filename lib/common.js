/* Set one or more keys to 0 to disable support for them. */
var TICKER_CURRENCIES = {USD: 1, EUR: 1, GBP: 1};
/* Define the fallback Fiat currency used for trading at Coinapult. */
var DEFAULT_FIAT_CURRENCY = 'USD';

var coinapult = require('./coinapult').create();

exports.coinapult = coinapult;
exports.TICKER_CURRENCIES = TICKER_CURRENCIES;

exports.config = function (cfg) {
  coinapult.apiKey = cfg.key || cfg.guid;
  coinapult.apiSecret = cfg.secret || cfg.password;
  coinapult.fiat = cfg.fiatCurrency || DEFAULT_FIAT_CURRENCY;
}

exports.balance = function (callback) {
  coinapult.accountInfo(function (err, req, body) {
    if (err) {
      return callback(err);
    }
    var data = JSON.parse(body);
    if (data.error) {
      return callback(new Error(data.error));
    }

    var amount, currency, balances = {};
    for (var i = 0; i < data.balances.length; i++) {
      amount = data.balances[i].amount;
      currency = data.balances[i].currency;
      if (currency == 'BTC') {
        /* Report BTC balance in satoshis. */
        amount *= 1e8;
      }
      balances[currency] = amount;
    }
    callback(null, balances);
  }, 'normal');
};
