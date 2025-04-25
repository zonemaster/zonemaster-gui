---
question: How can I test a "reverse" zone with Zonemaster? 
category: Using Zonemaster
---

To check a reverse zone with Zonemaster, one first needs to know what the reverse zone is, and enter it in the format it has in the DNS. A reserve zone is obtained by reversing an IP address and adding a suffix. IPv4 addresses use the suffix "in-addr.arpa" while IPv6 addresses use "ip6.arpa".

Examples:

* for IPv4 prefix '198.51.100.0/24': 100.51.198.in-addr.arpa;
* for IPv6 prefix '2001:db8::/32': 8.b.d.0.1.0.0.2.ip6.arpa.
