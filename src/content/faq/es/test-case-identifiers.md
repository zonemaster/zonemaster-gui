---
question: ¿Qué son los Identificadores de Casos de Prueba?
category: Usando Zonemaster
---

### Especificación de Identificadores de Casos de Prueba

Todos los casos de prueba pertenecen a un nivel de prueba específico y sus nombres se basan en el nombre de ese nivel de prueba. Los siguientes niveles de prueba están definidos y disponibles:

- Address
- Basic
- Connectivity
- Consistency
- DNSSEC
- Delegation
- Nameserver
- Syntax
- Zone

El nombre del nivel de prueba no es sensible a mayúsculas y minúsculas, pero las formas definidas anteriormente deben usarse al referirse a los niveles de prueba, es decir, solo la primera letra en mayúscula, excepto para acrónimos en los que se usa todo en mayúscula. Por ejemplo, "Address" y ni "ADDRESS" ni "address".

El identificador del caso de prueba en la especificación del caso de prueba (tanto en el título principal como en la sección "Identificador del caso de prueba") utiliza el nombre del nivel de prueba, como se define anteriormente, y tiene el formato: `{Nombre del nivel de prueba} + {Índice}`

Al referirse a un caso de prueba, para mayor claridad, se debe usar la letra mayúscula definida anteriormente para el nombre del nivel de prueba.

El `{Índice}` es un sufijo de dos dígitos 01-99, y debe seleccionarse de manera que el identificador del caso de prueba sea único. Normalmente, se selecciona el primer índice libre.

Ejemplos de identificadores de casos de prueba:

- Address03
- Basic04
- DNSSEC15
- Zone06
