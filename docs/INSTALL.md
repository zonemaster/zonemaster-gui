# Installing the Zonemaster GUI

There are two ways to install the Zonemaster GUI: using the zip attached to the release assets or cloning the repository and building it yourself. 
The first option is the easiest but offer no customization. 
The second option offers full customization but requires you to build the GUI yourself.

## Quick install (1 minute)

1. Download the zonemaster_web_gui_{date}.zip file from the latest release.
2. Upload the contents of the zip file to your web server.
3. Refer to [zonemaster.conf-example](/zonemaster.conf-example) for Apache configuration or [zonemaster-nginx.conf-example](/zonemaster-nginx.conf-example) for Nginx configuration.

This option comes preconfigured with the default theme and no customization.
You have basic configuration options. Refer to the [configuration](CONFIG.md#staticconfigjson) guide for more information.

## Full customization (5 minutes)

1. Clone the repository `git clone git@github.com:zonemaster/zonemaster-gui.git`
2. Install the dependencies `npm install`
3. Build the GUI `npm run build`
4. Upload the contents of the `public` folder to your web server or use CI/CD to deploy the GUI.
5. Refer to [zonemaster.conf-example](/zonemaster.conf-example) for Apache configuration or [zonemaster-nginx.conf-example](/zonemaster-nginx.conf-example) for Nginx configuration.

## Configuration

Refer to the [configuration](CONFIG.md) guide for more information on how to configure the GUI.

## Theming

Refer to the [theming](THEMING.md) guide for more information on how to customize the GUI.

## Keeping the source up to date

To keep the source up to date, the easiest is to add an upstream remote to your local repository:
```sh
git remote add upstream git@github.com:zonemaster/zonemaster-gui.git
git fetch upstream
```

Now you can rebase your local branch on top of the upstream branch:
```sh
git rebase upstream/main
```
This way you have version control of your local changes and can easily update the source code from the main repository.

Refer to [CUSTOMIZATION.md](THEMING.md) for more information on how to customize the GUI.
