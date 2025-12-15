---
question: ¿Cómo es que mi nombre de dominio no puede ser probado?
category: Usando Zonemaster
---

Hay varias posibilidades.

* Su nombre de dominio aún no está delegado.
* Su nombre de dominio no es alcanzable desde Internet público.
* Zonemaster solo puede probar lo que se llama una zona DNS, por ejemplo 'zonemaster.net', y no nombres de host, como 'www.zonemaster.net'.
* Existe una protección de 10 minutos entre pruebas consecutivas para un nombre de dominio dado, con los mismos parámetros de prueba. Ejecutar una prueba dentro de esa ventana mostrará en su lugar la última prueba disponible para ese nombre de dominio y parámetros.
* Ha escrito mal su nombre de dominio.
