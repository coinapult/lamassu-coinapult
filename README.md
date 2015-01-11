lamassu-coinapult
=================

Welcome to the Lamassu Coinapult Plugin. This plugin provides all of the "ticker", "trader", and "wallet" functionalities by using Coinapult services. The "trader" functionality requires further user permissions to use and you should enter in contact with Coinapult to use it.

This is known to work with the stable versions of lamassu-admin, lamassu-server, and lamassu-machine. It has been tested with lamassu-admin @ 0.5.5, lamassu-server @ 1.0.2 (currently the same as `git clone https://github.com/lamassu/lamassu-admin` and `git clone https://github.com/lamassu/lamassu-server`), and lamassu-machine @ 0.2.15 (`git clone https://github.com/lamassu-machine`, `cd lamassu-machine && git checkout v0.2.15`). It is assumed that these have been configured as described elsewhere.


Installing
==========

While inside the lamassu-admin repository, do `npm install lamassu-coinapult`. Do the same inside the lamassu-server repository. Done.


Configuring the plugin with lamassu-admin
=========================================

The current lamassu-admin does not list the Coinapult plugin, so you must update it. There are two steps for this:

 * Grab the patch at https://gist.github.com/g-p-g/1c5e6568563a2eaa417a, save it as `coinapult_lamassu.patch` inside lamassu-admin/ and apply it with `patch -p1 < coinapult_lamassu.patch`
 * Create a file named `coinapult_wallet.json` with the contents that follow and run `lamassu-update-config coinapult_wallet.json`:

```
{
  "exchanges": {
    "plugins": {"current": {"transfer": "coinapult"}},
    "settings": {"coinapult": {}}
  }
}
```

Now you can configure the plugin from the admin website.

If you don't have a Coinapult account yet, it takes only an email and password to create it at https://coinapult.com. Log in to your Coinapult account and visit https://coinapult.com/settings/general#apikeys to create new API keys.

Now in the Wallet section present in lamassu-admin website, use your API key as the GUID and API secret as the Password as shown in the following screenshot.

![lamassu-admin screenshot for wallet configuration](http://i.imgur.com/C1Sa6Js.png "Coinapult wallet in lamassu-admin")

If you're using the trading functionality too, configure it with the same key pair:

![lamassu-admin screenshot for trading configuration](http://i.imgur.com/hvhAndj.png "Coinapult trading in lamassu-admin")
