---
question: Hur kan jag testa en "reverse"-zon med Zonemaster?
category: Använda Zonemaster
---

För att kontrollera en reverse-zon med Zonemaster behöver du först veta vilken reverse-zon det gäller och ange den i det format som används i DNS. En reverse-zon fås genom att vända på en IP-adress och lägga till ett suffix. IPv4-adresser använder suffixet "in-addr.arpa" medan IPv6-adresser använder "ip6.arpa".

Exempel:

* för IPv4-prefixet '198.51.100.0/24': 100.51.198.in-addr.arpa;
* för IPv6-prefixet '2001:db8::/32': 8.b.d.0.1.0.0.2.ip6.arpa.
