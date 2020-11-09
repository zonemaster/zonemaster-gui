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

Prerequisite for FreeBSD is that the package system is updated and activated,
see FreeBSD section of [install Zonemaster::Engine][Zonemaster::Engine
installation].


## Installation

This instruction covers the following operating systems:

 1. [CentOS](#1-centos)
 2. [Debian](#2-debian)
 3. [FreeBSD](#3-freebsd)
 4. [Ubuntu](#4-ubuntu)


### 1. CentOS

* Install Httpd (Apache), if it is not installed:

```sh
sudo yum update
sudo yum install httpd
```

#### Install Zonemaster Web GUI

```sh
wget https://github.com/zonemaster/zonemaster-gui/releases/download/v3.2.1/zonemaster_web_gui.zip -O zonemaster_web_gui.zip
sudo mkdir -p  /var/www/html/zonemaster-web-gui
sudo mkdir -p /var/log/zonemaster
sudo unzip -d /var/www/html/zonemaster-web-gui zonemaster_web_gui.zip
rm zonemaster_web_gui.zip
```

#### Basic httpd configuration

```sh
sudo install /var/www/html/zonemaster-web-gui/zonemaster.conf-example /etc/httpd/conf.d/zonemaster.conf
```
Then update the zonemaster.conf file with your own ServerName, ServerAlias, ServerAdmin

* Start  httpd if it is newly installed
```sh
sudo systemctl enable httpd
sudo systemctl start httpd
```

* Else, Reload httpd
```sh
sudo systemctl enable httpd
sudo systemctl reload httpd
```

### 2. Debian

#### Install Apache

```sh
sudo apt-get update && sudo apt-get upgrade -y 
sudo apt-get install -y apache2 unzip
```

#### Basic Apache configuration

```sh
sudo a2enmod proxy proxy_http rewrite
sudo a2dissite 000-default
sudo systemctl enable apache2
sudo systemctl restart apache2
```

#### Install Zonemaster Web GUI

```sh
wget https://github.com/zonemaster/zonemaster-gui/releases/download/v3.2.1/zonemaster_web_gui.zip -O zonemaster_web_gui.zip
sudo unzip -d /var/www/html/zonemaster-web-gui zonemaster_web_gui.zip
sudo install -vd /var/log/zonemaster
sudo install -v /var/www/html/zonemaster-web-gui/zonemaster.conf-example /etc/apache2/sites-available/zonemaster.conf
rm -f zonemaster_web_gui.zip
```

#### Configure Zonemaster Web GUI

```sh
sudo a2ensite zonemaster #Activate the website
```
Then update the zonemaster.conf file with your own ServerName, ServerAlias and ServerAdmin.
For testing on a local machine, you can edit zonemaster.conf and change the "*:80" part of 
to the host's IP or using localhost as ServerName if that is appropriate.


#### Reload Apache

```sh
sudo systemctl reload apache2
```

### 3. FreeBSD

For all commands below become root:

``su -l``

#### Install Apache and its dependencies

See [tutorial on Apache on FreeBSD].

``pkg install apache24``

Enter ``y`` at the confirmation prompt.

#### Enable Apache as a service

``sysrc apache24_enable=yes``
 
#### Enable three apache modules in Apache configuration file

``perl -pi -e 's/^#(LoadModule (proxy_module|proxy_http_module|rewrite_module) libexec)/$1/' /usr/local/etc/apache24/httpd.conf``

#### Start Apache
 
``service apache24 start``

If you want Apache to listen to an external IP address and it says that it only
listens to localhost (127.0.0.1/::1) then you have to set `ServerName` in
`/usr/local/etc/apache24/httpd.conf`, e.g.
``ServerName 192.0.2.246:80``

#### Install Zonemaster Web GUI

```sh
fetch https://github.com/zonemaster/zonemaster-gui/releases/download/v3.2.1/zonemaster_web_gui.zip
mkdir -p /var/www/html/zonemaster-web-gui
mkdir -p /var/log/zonemaster
unzip -d /var/www/html/zonemaster-web-gui zonemaster_web_gui.zip 
rm zonemaster_web_gui.zip 
```

#### Basic Apache configuration

```sh
install /var/www/html/zonemaster-web-gui/zonemaster.conf-example /usr/local/etc/apache24/Includes/zonemaster.conf
```
Then update `/usr/local/etc/apache24/Includes/zonemaster.conf` with your own ServerAdmin.
If Zonemaster-Backend RPCAPI runs on another server or on another port (not port 5000)
then update IP address or port in the same file.


#### Restart Apache
```sh
service apache24 restart
```

### 4. Ubuntu

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
 * For Https, see [Let's Encrypt / Certbot].

-------

[Declaration of prerequisites]: https://github.com/zonemaster/zonemaster/blob/master/README.md#prerequisites
[JSON-RPC API]: https://github.com/zonemaster/zonemaster-backend/blob/master/docs/API.md
[Let's Encrypt / Certbot]: https://certbot.eff.org/all-instructions/
[Main Zonemaster repository]: https://github.com/zonemaster/zonemaster/blob/master/README.md
[Tutorial on Apache on FreeBSD]: https://www.digitalocean.com/community/tutorials/how-to-install-an-apache-mysql-and-php-famp-stack-on-freebsd-10-1
[Zonemaster::Backend installation]: https://github.com/zonemaster/zonemaster-backend/blob/master/docs/Installation.md
[Zonemaster::Backend]: https://github.com/zonemaster/zonemaster-backend/blob/master/README.md
[Zonemaster::CLI installation]: https://github.com/zonemaster/zonemaster-cli/blob/master/docs/Installation.md
[Zonemaster::Engine API]: http://search.cpan.org/%7Eznmstr/Zonemaster-Engine/lib/Zonemaster/Engine/Overview.pod
[Zonemaster::Engine installation]: https://github.com/zonemaster/zonemaster-engine/blob/master/docs/Installation.md
[Zonemaster::Engine]: https://github.com/zonemaster/zonemaster-engine/blob/master/README.md
[Zonemaster::LDNS]: https://github.com/zonemaster/zonemaster-ldns/blob/master/README.md

