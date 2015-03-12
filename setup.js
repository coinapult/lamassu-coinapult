#!/usr/bin/env node
'use strict';

var LamassuConfig = require('lamassu-config');
var promptly = require('promptly');

var config = new LamassuConfig();

console.log('\nSetting up the Coinapult wallet and trading plugin.\n');
console.log('Please enter your API credentials.\n');
promptly.prompt('API Key: ', function(keyErr, key) {
  promptly.password('API Secret: ', function(secretErr, secret) {
    promptly.prompt('Currency (three letter ISO code, same as machine): ', function(fiatCurrencyErr, fiatCurrency) {
      updateDb(key, secret, fiatCurrency, function(err) {
        if (err) throw err;
        console.log('\nSuccess.');
      });
    });
  });
});

function updateDb(key, secret, fiatCurrency, callback) {
  var newConfig = {
    exchanges: {
      plugins: {
        settings: {
          coinapult: {
            guid: key,
            password: secret,
            fromAddress: '',
            key: key,
            clientId: '',
            secret: secret,
            fiatCurrency: fiatCurrency
          }
        },
        current: {
          ticker: 'coinapult',
          transfer: 'coinapult',
          wallet: 'coinapult',
          trade: 'coinapult'
        }
      }
    }
  };
  config.mergeConfig(newConfig, callback);
}
