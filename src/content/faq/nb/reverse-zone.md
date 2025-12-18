---
question: Hvordan kan jeg teste en "omvendt" sone med Zonemaster?
category: Bruk av Zonemaster
---

For å sjekke en omvendt sone med Zonemaster, må man først vite hva den omvendte sonen er, og skrive den inn i formatet den har i DNS. En omvendt sone oppnås ved å snu en IP-adresse og legge til et suffiks. IPv4-adresser bruker suffikset "in-addr.arpa", mens IPv6-adresser bruker "ip6.arpa".

Eksempler:

* for IPv4-prefiks "198.51.100.0/24": 100.51.198.in-addr.arpa
* for IPv6-prefiks "2001:db8::/32": 8.b.d.0.1.0.0.2.ip6.arpa
