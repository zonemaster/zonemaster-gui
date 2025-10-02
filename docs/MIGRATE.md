# Migrating from the Old Zonemaster GUI

The old Zonemaster GUI was similar to the current [quick install](INSTALL.md#quick-install-1-minute) option, which means there is no complex migration path required.

## Migration Overview

Since the old GUI functioned similarly to a static deployment, you can simply replace it with the new GUI by following the standard installation process. Choose the installation method that best fits your needs:

1. **[Quick install](INSTALL.md#quick-install-1-minute)** - For simple deployments with basic configuration
2. **[Full customization](INSTALL.md#full-customization-5-minutes)** - For deployments requiring theming or advanced customization

## Migrating Your Configuration

If you had customized configuration in the old GUI, you can migrate these settings to the new GUI's `static/config.json` file.
All previous configuration options may not be available in the new GUI.

Refer to [CONFIG.md#staticconfigjson](CONFIG.md#staticconfigjson) for information on how to configure the new GUI's runtime settings, including message banners.

## Installation Steps

1. Choose your installation method from [INSTALL.md](INSTALL.md)
2. Follow the installation instructions for your chosen method
3. Configure your web server (Apache or Nginx) using the provided example configurations
4. If you had custom configuration, update the `static/config.json` file accordingly
5. Test your new installation to ensure it works as expected

## Need Help?

For detailed configuration options, see:
- [CONFIG.md](CONFIG.md) - Complete configuration guide
- [THEMING.md](THEMING.md) - Theming and customization guide
- [INSTALL.md](INSTALL.md) - Installation instructions
