---
question: Kuinka voin testata "käänteisvyöhykettä" Zonemasterilla?
category: Zonemasterin käyttö
---

Käänteisvyöhykkeen tarkistamiseksi Zonemasterilla on ensin tiedettävä, mikä käänteisvyöhyke on, ja syöttää se DNS:ssä olevaan muotoon. Käänteisvyöhyke saadaan kääntämällä IP-osoite ja lisäämällä pääte. IPv4-osoitteet käyttävät pääteä "in-addr.arpa", kun taas IPv6-osoitteet käyttävät "ip6.arpa".

Esimerkit:

* IPv4-prefixille "198.51.100.0/24": 100.51.198.in-addr.arpa
* IPv6-prefixille "2001:db8::/32": 8.b.d.0.1.0.0.2.ip6.arpa
