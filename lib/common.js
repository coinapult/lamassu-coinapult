/* Set one or more keys to 0 to disable support for them. */
var TICKER_CURRENCIES = {
  USD: 1, EUR: 1, GBP: 1, AUD: 1, CAD: 1,
  BRL: 1, CLP: 1, CNY: 1, CZK: 1, DKK: 1, FJD: 1, HNL: 1, HKD: 1,
  ISK: 1, INR: 1, IDR: 1, ILS: 1, KRW: 1, MYR: 1, MXN: 1, NZD: 1,
  NOK: 1, PKR: 1, PHP: 1, PLN: 1, RUB: 1, SGD: 1, ZAR: 1, SEK: 1,
  CHF: 1, TWD: 1, THB: 1, TRY: 1
};
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
