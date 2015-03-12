lamassu-coinapult
=================

Welcome to the Lamassu Coinapult Plugin. This plugin provides all of the "ticker", "trader", and "wallet" functionalities by using Coinapult services. The "trader" functionality requires further user permissions to use and you should enter in contact with Coinapult to use it.

This is known to work with the stable versions of lamassu-admin, lamassu-server, and lamassu-machine. It has been tested with lamassu-admin @ 0.5.5, lamassu-server @ 1.0.2 (currently the same as `git clone https://github.com/lamassu/lamassu-admin` and `git clone https://github.com/lamassu/lamassu-server`), and lamassu-machine @ 0.2.15 (`git clone https://github.com/lamassu-machine`, `cd lamassu-machine && git checkout v0.2.15`). It is assumed that these have been configured as described elsewhere.

Pre-reqs
=========

If you don't have a Coinapult account yet, it takes only an email and password to create it at https://coinapult.com. 

Log in to your Coinapult account and visit https://coinapult.com/settings/general#apikeys to create new API keys.

It is recommended that your machine be on version 0.4.13 or higher. Please contact [support@lamassu.is](mailto:support@lamassu.is) to arrange an update.

Additionally, it is suggested that you run the plugin with the latest lamassu-server. After your machine has been updated to 0.4.13, you may run the upgrade script found here: https://github.com/lamassu/lamassu-install/tree/two-way#to-upgrade

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

Enter the API key, secret, and currency displayed on the machine, hitting <kbd>Enter</kbd> after each. The field for secret will remain blank when pasting the value.

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

![lamassu-admin screenshot for wallet configuration](http://i.imgur.com/C1Sa6Js.png "Coinapult wallet in lamassu-admin")

If you're using the trading functionality too, configure it with the same key pair:

![lamassu-admin screenshot for trading configuration](http://i.imgur.com/hvhAndj.png "Coinapult trading in lamassu-admin")

