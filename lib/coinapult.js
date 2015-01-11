var crypto = require('crypto');
var request = require('request');

/* Auxiliary functions for sending signed requests to Coinapult. */
function signData(data, seckey) {
  var sign = crypto.createHmac("sha512", seckey).update(data);
  return sign.digest('hex');
}

function genNonce(length) {
  if (length === undefined) {
    length = 22;
  }
  var nonce = crypto.randomBytes(Math.ceil(length/2)).toString('hex');
  return nonce;
}


module.exports = {

  create: function(options) {
    /* Recognized keys in options:
     *  apiKey, apiSecret, baseURL
     */
    if (options === undefined) {
      options = {};
    }
    if (!options.baseURL) {
      options.baseURL = 'https://api.coinapult.com/api/';
    }

    return {
      apiKey: options.apiKey,
      apiSecret: options.apiSecret,
      baseURL: options.baseURL,
      fiat: null,

      signData: signData,

      /* Make a call to the Coinapult API. */
      call: function(method, params, sign, post, cb) {
        var data, headers = {};
        if (sign) {
          params.nonce = genNonce();
          params.timestamp = (new Date().getTime() / 1000).toString();
          params.endpoint = '/' + method;
          data = new Buffer(JSON.stringify(params)).toString('base64');
          headers = {
            'cpt-key': this.apiKey,
            'cpt-hmac': signData(data, this.apiSecret)
          };
        } else {
          data = '';
        }

        var reqopts = {
          url: this.baseURL + method,
          form: {data: data},
          headers: headers,
          method: post ? 'POST' : 'GET',
        };
        if (!post) {
          reqopts.qs = params;
        }
        request(reqopts, cb);
      },


      /* Coinapult API */

      ticker: function(cb, market, begin, end) {
        var params = {};
        if (typeof begin != 'undefined') {
          params.begin = begin;
        }
        if (typeof end != 'undefined') {
          params.end = end;
        }
        if (typeof market != 'undefined') {
          params.market = market;
        }

        this.call('ticker', params, false, false, cb);
      },

      accountInfo: function(cb, balanceType) {
        var params = {};
        if (typeof balanceType != 'undefined') {
          params.balanceType = balanceType;
        }
        this.call('accountInfo', params, true, true, cb);
      },

      getBitcoinAddress: function(cb) {
        this.call('getBitcoinAddress', {}, true, true, cb);
      },

      send: function(cb, amount, address, currency, extOID, callback) {
        var params = {
          'amount': amount,
          'address': address,
          'currency': currency
        };
        if (typeof extOID != 'undefined') {
          params.extOID = extOID;
        }
        if (typeof callback != 'undefined') {
          params.callback = callback;
        }

        this.call('t/send', params, true, true, cb);
      },

      receive: function(cb, amount, address, inCurrency, outCurrency, extOID, urlCallback) {
        var params = {'amount': amount};
        if (typeof address != 'undefined') {
          params.address = address;
        }
        if (typeof inCurrency != 'undefined') {
          params.currency = inCurrency;
        } else {
          params.currency = 'BTC';
        }
        if (typeof outCurrency != 'undefined') {
          params.outCurrency = outCurrency;
        }
        if (typeof extOID != 'undefined') {
          params.extOID = extOID;
        }
        if (typeof urlCallback != 'undefined') {
          params.callback = urlCallback;
        }

        return this.call('t/receive', params, true, true, cb);
      },

      search: function(cb, criteria, many, page) {
        var count = 0;
        for (var key in criteria) {
          count++;
          if (!(key in VALID_SEARCH_KEYS)) {
            throw "Unsupported search criteria: " + key;
          }
        }
        if (!count) {
          throw "Empty search criteria";
        }
        if (typeof many != 'undefined') {
          criteria.many = many;
        }
        if (typeof page != 'undefined') {
          criteria.page = page;
        }

        this.call('t/search/', criteria, true, true, cb);
      },

      convert: function(cb, amount, inCurrency, outAmount, outCurrency, urlCallback) {
        if (isNaN(amount)
              || (inCurrency == 'BTC' && amount <= 0.0001)
              || (outCurrency == 'BTC' && outAmount <= 0.0001)) {
          return cb(null, null, JSON.stringify({"error": "Amount too small"}));
        }

        var params = {};

        if (amount != null) {
          params.amount = amount;
        }

        if (typeof inCurrency != 'undefined') {
          params.inCurrency = inCurrency;
        } else {
          params.inCurrency = 'BTC';
        }
        if (typeof outCurrency != 'undefined') {
          params.outCurrency = outCurrency;
        }
        if (typeof outAmount != 'undefined') {
          params.outAmount = outAmount;
        }
        if (typeof urlCallback != 'undefined') {
          params.callback = urlCallback;
        }

        this.call('t/convert', params, true, true, cb);
      },

      lock: function(cb, amount, outAmount, currency, urlCallback) {
        var params = {};
        if (typeof amount != 'undefined') {
          params.amount = amount;
        }
        if (typeof outAmount != 'undefined') {
          params.outAmount = outAmount;
        }
        if (typeof currency != 'undefined') {
          params.currency = currency;
        } else {
          params.currency = 'USD';
        }
        if (typeof urlCallback != 'undefined') {
          params.callback = urlCallback;
        }

        this.call('t/lock', params, true, true, cb);
      },

      unlock: function(cb, amount, address, outAmount, currency, urlCallback) {
        var params = {'address': address};
        if (typeof amount != 'undefined') {
          params.amount = amount;
        }
        if (typeof outAmount != 'undefined') {
          params.outAmount = outAmount;
        }
        if (typeof currency != 'undefined') {
          params.currency = currency;
        } else {
          params.currency = 'USD';
        }
        if (typeof urlCallback != 'undefined') {
          params.callback = urlCallback;
        }

        this.call('t/unlock', params, true, true, cb);
      }

    };
  }
};
