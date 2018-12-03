# Installation

## Overview

This document describes an abstract, prerequisites, installation and
post-install sanity checking for Zonemaster Web GUI. The final section wraps up
with a few pointer to other interfaces to Zonemaster. For an overview of the
Zonemaster product, please see the [main Zonemaster Repository].


## Prerequisites

Before installing Zonemaster Web GUI, you should [install Zonemaster::Engine][
Zonemaster::Engine installation] and [Zonemaster::Backend][Zonemaster::Backend
installation].

## Installation

This instruction covers the following operating systems:

 1. [CentOS](#1-centos)
 2. [Debian](#2-debian)
 4. [FreeBSD](#4-freebsd)
 5. [Ubuntu](#5-ubuntu)


### 1. CentOS

* Install Httpd (Apache):

```sh
sudo yum update
sudo yum install httpd
```

* Install Zonemaster Web GUI
```sh
wget https://github.com/zonemaster/zonemaster-gui/releases/download/v2.0.0/zonemaster_web_gui.zip -O temp.zip
sudo mkdir -p  /var/www/html/zonemaster-web-gui
sudo mkdir -p /var/log/zonemaster
sudo unzip temp.zip -d /var/www/html/zonemaster-web-gui
rm temp.zip
```

* Basic httpd configuration:

```sh
sudo install /var/www/html/zonemaster-web-gui/zonemaster.conf-example /etc/httpd/conf.d/zonemaster.conf
```
Then update the zonemaster.conf file with your own ServerName, ServerAlias, ServerAdmin

* Reload httpd
```sh
sudo systemctl enable httpd
sudo systemctl reload httpd
```

### 2. Debian

Install apache2:

```sh
sudo apt-get update && sudo apt-get upgrade -y 
sudp apt-get install apache2
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod rewrite
sudo systemctl restart apache2
```

* Install Zonemaster Web GUI
```sh
wget https://github.com/zonemaster/zonemaster-gui/releases/download/v2.0.0/zonemaster_web_gui.zip -O temp.zip
sudo mkdir -p  /var/www/html/zonemaster-web-gui
sudo mkdir -p /var/log/zonemaster
sudo unzip temp.zip -d /var/www/html/zonemaster-web-gui
rm temp.zip
```

* Basic apache2 configuration:

```sh
sudo chown -R www-data:www-data /var/www #Change owner of the directory 
sudo install /var/www/html/zonemaster-web-gui/zonemaster.conf-example /etc/apache2/sites-available/zonemaster.conf
cd /etc/apache2/sites-available
sudo a2ensite zonemaster #Activate the website
```
Then update the zonemaster.conf file with your own ServerName, ServerAlias, ServerAdmin

* Reload apache
```sh
sudo systemctl enable apache2
sudo systemctl reload apache2
```

### 4. FreeBSD

TODO

### 5. Ubuntu

Use the procedure for installation on [Debian](#2-debian).


## Post-installation sanity check

Point your browser at `http://localhost/` (or the address of the server where
you installed Zonemaster Web GUI).

Verify that the Zonemaster Web GUI is shown with the " Version used " in its page footer.
And when the mouse over this text, it display all version of the zonemaster stack (Backend, Engine and GUI).



## What to do next?

 * For a JSON-RPC API, see the Zonemaster::Backend [JSON-RPC API] documentation.
 * For a command line interface, follow the [Zonemaster::CLI installation] instruction.
 * For a Perl API, see the [Zonemaster::Engine API] documentation.
 * For Https, see [Let's Encrypt / Certbot](https://certbot.eff.org/all-instructions/)

-------

[Declaration of prerequisites]: https://github.com/zonemaster/zonemaster/blob/master/README.md#prerequisites
[JSON-RPC API]: https://github.com/zonemaster/zonemaster-backend/blob/master/docs/API.md
[Main Zonemaster repository]: https://github.com/zonemaster/zonemaster/blob/master/README.md
[Zonemaster::Backend installation]: https://github.com/zonemaster/zonemaster-backend/blob/master/docs/Installation.md
[Zonemaster::Backend]: https://github.com/zonemaster/zonemaster-backend/blob/master/README.md
[Zonemaster::CLI installation]: https://github.com/zonemaster/zonemaster-cli/blob/master/docs/Installation.md
[Zonemaster::Engine API]: http://search.cpan.org/%7Eznmstr/Zonemaster-Engine/lib/Zonemaster/Engine/Overview.pod
[Zonemaster::Engine installation]: https://github.com/zonemaster/zonemaster-engine/blob/master/docs/Installation.md
[Zonemaster::Engine]: https://github.com/zonemaster/zonemaster-engine/blob/master/README.md
[Zonemaster::LDNS]: https://github.com/zonemaster/zonemaster-ldns/blob/master/README.md

Copyright (c) 2013 - 2018, IIS (The Internet Foundation in Sweden) \
Copyright (c) 2013 - 2018, AFNIC \
Creative Commons Attribution 4.0 International License

You should have received a copy of the license along with this
work.  If not, see <https://creativecommons.org/licenses/by/4.0/>.
