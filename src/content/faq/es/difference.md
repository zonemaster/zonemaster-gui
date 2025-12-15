---
question: ¿Qué hace que Zonemaster sea diferente de otros software de validación de zonas DNS?
category: Información general
---

* Zonemaster guarda todo el historial de las pruebas anteriores basadas en el nombre de dominio probado, lo que significa que puede volver a una prueba que realizó hace algún tiempo y compararla con la prueba que acaba de realizar.
* Todas las pruebas que ejecuta Zonemaster están definidas en los documentos de Especificación de Casos de Prueba que se pueden encontrar en los [documentos de Especificación de Casos de Prueba](https://github.com/zonemaster/zonemaster/tree/master/docs/public/specifications/tests#zonemaster-test-case-specifications).
* Zonemaster se puede utilizar para probar [nombres de dominio no delegados](https://zonemaster.net/es/faq#what-is-an-undelegated-domain-test).
* Zonemaster se puede utilizar para probar [registros DS antes de su publicación en la zona padre](https://zonemaster.net/es/faq#can-i-test-the-ds-records-before-they-are-published).
* Esta versión de código abierto de Zonemaster se construyó utilizando código modular, lo que básicamente significa que puede integrar partes de él en sus propios sistemas, si lo desea. Por ejemplo, es bastante raro que desee un programa completo solo para verificar las redelegaciones.
