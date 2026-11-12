---
question: ¿Qué es el enlace de información del TLD?
category: Usando Zonemaster
---

Cuando se completa una prueba, Zonemaster normalmente proporciona un enlace al sitio web del TLD (dominio de nivel superior) del nombre de dominio probado; por ejemplo, `.net` si el nombre de dominio probado es zonemaster.net. El enlace se encuentra en el botón `.net Info` (si .net es el TLD). Al seguirlo, normalmente será posible encontrar información útil sobre el nombre de dominio probado. La facilidad para encontrar la información depende del TLD en cuestión. Muchas veces el enlace es un enlace general para el TLD que se encuentra en la [base de datos de TLD de IANA](https://www.iana.org/domains/root/db), pero otras veces es un enlace más específico proporcionado por el TLD para esta función. En ese caso, puede esperar encontrar fácilmente información sobre el nombre de dominio probado.

Si pertenece a un registro de TLD y desea proporcionar un enlace mejor a sus registrantes, puede consultar en la [especificación de URL de TLD](https://doc.zonemaster.net/latest/configuration/tld-url-specification.html#txt-record) cómo proporcionar un registro TXT con la URL preferida.

Si no hay ningún enlace al sitio web del TLD, puede deberse a la política del TLD o a la política de la instalación de Zonemaster, que impide mostrarlo. Si el nombre de dominio probado es la zona raíz o un TLD, por ejemplo .net, no se muestra ningún enlace. Puede consultar la [especificación de URL de TLD](https://doc.zonemaster.net/latest/configuration/tld-url-specification.html#txt-record) para obtener más información sobre esta función.
