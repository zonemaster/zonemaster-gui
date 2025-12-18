---
question: ¿Cómo puedo probar una zona "inversa" con Zonemaster?
category: Usando Zonemaster
---

Para verificar una zona inversa con Zonemaster, primero se necesita saber cuál es la zona inversa y escribirla en el formato que tiene en el DNS. Una zona inversa se obtiene invirtiendo una dirección IP y añadiendo un sufijo. Las direcciones IPv4 utilizan el sufijo "in-addr.arpa" mientras que las direcciones IPv6 utilizan "ip6.arpa".

Ejemplos:

* para el prefijo IPv4 "198.51.100.0/24": 100.51.198.in-addr.arpa
* para el prefijo IPv6 "2001:db8::/32": 8.b.d.0.1.0.0.2.ip6.arpa
