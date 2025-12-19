---
question: Hvordan kan jeg teste en "omvendt" zone med Zonemaster?
category: Brug af Zonemaster
---

For at tjekke en omvendt zone med Zonemaster, skal man først vide, hvad den omvendte zone er, og indtaste den i det format, den har i DNS. En omvendt zone opnås ved at vende en IP-adresse og tilføje et suffiks. IPv4-adresser bruger suffikset "in-addr.arpa", mens IPv6-adresser bruger "ip6.arpa".

Eksempler:

* for IPv4-præfiks "198.51.100.0/24": 100.51.198.in-addr.arpa
* for IPv6-præfiks "2001:db8::/32": 8.b.d.0.1.0.0.2.ip6.arpa
