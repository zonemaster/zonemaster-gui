---
question: Kako lahko preverim "obratno" cono z Zonemasterjem?
category: Uporaba Zonemasterja
---

Da bi preverili obratno cono z Zonemasterjem, je najprej potrebno vedeti, kaj je obratna zona, in jo vnesli v format, ki ga ima v DNS. Obratna zona se dobiva z obrnitvijo naslova IP in dodajanjem priponke. Naslovi IPv4 uporabljajo priponko "in-addr.arpa", naslovi IPv6 pa "ip6.arpa".

Primeri:

* za IPv4 prefiks "198.51.100.0/24": 100.51.198.in-addr.arpa
* za IPv6 prefiks "2001:db8::/32": 8.b.d.0.1.0.0.2.ip6.arpa