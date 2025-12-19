---
question: ¿Qué es una prueba de dominio no delegado?
category: Usando Zonemaster
---

Una prueba de dominio no delegado es una prueba realizada en un nombre de dominio que puede, o no, estar completamente publicado en el DNS.

Esto puede ser bastante útil si uno va a migrar su dominio de un registrador a otro, por ejemplo, migrar la zona 'example.com' del servidor de nombres 'ns.example.com' al servidor de nombres 'ns.example.org'. En este escenario, uno podría realizar una prueba de dominio no delegado proporcionando la zona ('example.com') y el servidor de nombres al que se está migrando ('ns.example.org') antes de migrar su dominio.

Cuando los resultados de la prueba no muestran errores ni advertencias, se puede estar bastante seguro de que la nueva ubicación del dominio funciona bien. Sin embargo, aún puede haber otros problemas en los datos de la zona que esta prueba no detecta.
