---
question: Comment tester une zone "inverse" avec Zonemaster ? 
category: Utilisation de Zonemaster
---

Pour tester une zone inverse, il faut d'abord déterminer le nom de la zone inverse, puis la saisir dans le format qu'elle a dans le DNS. Une zone inverse s'obtient en inversant une adresse IP et en ajoutant un suffixe. Les adresses IPv4 utilisent le suffixe "in-addr.arpa" tandis que les adresses IPv6 utilisent "ip6.arpa".

Exemples:

* pour le préfixe IPv4 "198.51.100.0/24" : 100.51.198.in-addr.arpa
* pour le préfixe IPv6 "2001:db8::/32" : 8.b.d.0.1.0.0.2.ip6.arpa
