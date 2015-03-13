lamassu-coinapult
=================

Welcome to the Lamassu Coinapult Plugin. This plugin provides all of the "ticker", "trader", and "wallet" functionalities by using Coinapult services.

Pre-reqs
=========

If you don't have a Coinapult account yet, it takes only an email and password to create it at https://coinapult.com. 

Log in to your Coinapult account and visit https://coinapult.com/settings/general#apikeys to create new API keys.

It is recommended that your machine be on version 0.4.13 or higher. Please contact [support@lamassu.is](mailto:support@lamassu.is) to arrange an update.

Additionally, it is suggested that you run the plugin with the latest lamassu-server. After your machine has been updated to 0.4.13, you may run the server upgrade script found here: https://github.com/lamassu/lamassu-install/tree/two-way#to-upgrade

Installing
==========

Run these four commands:

```
cd /usr/local/lib/node_modules/lamassu-server
npm install lamassu-coinapult
cd /usr/local/lib/node_modules/lamassu-admin
npm install lamassu-coinapult
```

Configuring
==========

Run:

```
node /usr/local/lib/node_modules/lamassu-server/node_modules/lamassu-coinapult/setup
```

Enter the API key, API secret, and currency displayed on the machine, hitting <kbd>Enter</kbd> after each. The field for secret will remain blank when pasting the value.

When complete, you'll see 'Success' and the machine will begin to use Coinapult as ticker, wallet, and trader.

Configuring with lamassu-admin
=========================================

While the prior `setup` script successfully configures the machine to use Coinapult, the admin will not list the plugin unless updated.

To do so, run these three commands:

```
cd /usr/local/lib/node_modules/lamassu-admin
curl -#o coinapult_lamassu.patch https://gist.githubusercontent.com/g-p-g/1c5e6568563a2eaa417a/raw/476d5e00d6427bbec3e74d70d184e0ab49849969/coinapult_lamassu.patch
patch -p1 < coinapult_lamassu.patch
```

Upon logging into the Admin, you'll notice the values present from running the `setup` script. You may use the either the `setup` script or the Admin to update these if they change in the future.

In the Wallet section, 'GUID' corresponds to your Coinapult API key, and 'Password' corresponds to the API secret. Leave the 'From Address' field blank:

![lamassu-admin screenshot for wallet configuration](http://i.imgur.com/WPG0KPM.png "Coinapult wallet in lamassu-admin")

In Trading, ID is unused. The API key and secret values are the same as above:

![lamassu-admin screenshot for trading configuration](http://i.imgur.com/xP8TMLq.png "Coinapult trading in lamassu-admin")

