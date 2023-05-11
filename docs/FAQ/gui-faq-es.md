Zonemaster
==========

1. [¿Qué es Zonemaster?](#q1)
2. [¿Quién está detrás de Zonemaster?](#q2)
3. [¿Cómo me puede ayudar Zonemaster?](#q3)
4. [Zonemaster indica "Error" o "Advertencia" en mi nombre de dominio. ¿Qué significa?](#q4)
5. [¿Cómo puede Zonemaster distinguir entre qué está bien y qué está mal?](#q5)
6. [¿Zonemaster soporta IPv6?](#q6)
7. [¿Zonemaster verifica DNSSEC?](#q7)
8. [¿Qué hace distinto a Zonemaster de otros software de validación DNS?](#q8)
9. [Zonemaster y privacidad](#q9)
10. [¿Por qué no puedo probar mi nombre de dominio?](#q10)
11. [¿Qué tipo de consultas genera Zonemaster?](#q11)
12. [¿Qué es una prueba de dominio no-delegado?](#q12)
13. [¿Puedo probar los registros DS antes de ser publicados?](#q13)
14. [¿Cómo puedo probar una zona reversa con Zonemaster?](#q14)

Zonemaster
----------

#### <span id="q1"></span>1. ¿Qué es Zonemaster?
Zonemaster es un programa diseñado para ayudar a la gente a revisar,
medir y ojalá también entender cómo funciona el DNS (Sistema de Nombres de
Dominio).

Consiste de varios componentes:

  1. "Engine" (Motor) - una arquitectura de pruebas que soporta toda la funcionalidad para realizar pruebas DNS.
  2. "CLI" - una interfaz de línea de comandos hacia el Engine.
  3. "Backend" - un servidor interno que permite ejecutar las pruebas de Zonemaster y guardar los resultados, usando una API JSON-RPC y una base de datos.
  4. GUI - una interfaz web hacia el Backend.

Cuando un nombre de dominio (tal como "zonemaster.net") es enviado a Zonemaster (usando la CLI o
GUI), este verificará el estado de salud general del nombre de dominio con
una serie de pruebas. 
Las distintas pruebas realizadas por Zonemaster están documentadas en el
documento de [Definición de Casos de Pruebas] (en inglés).

#### <span id="q2"></span>2. ¿Quién está detrás de Zonemaster?
Zonemaster es un proyecto conjunto entre [AFNIC]
(registro para el TLD .fr y varios otros, por ejemplo
.re, .pm, .tf, .wf, .yt y .paris) y
[The Swedish Internet Foundation]
(registro de los TLDs .se y .nu).

#### <span id="q3"></span>3. ¿Cómo me puede ayudar Zonemaster?
La herramienta Zonemaster está orientada a dos categorías de usuarios:

  - Usuarios que entienden bien el protocolo DNS.
  - Usuarios que solo quieren saber si el nombre de dominio que poseen o usan tiene algún problema.

Los usuarios de la segunda categoría deberían contactar a sus operadores
DNS tan pronto obtengan resultados distintos a "verde" en cualquiera
de las pruebas sobre sus nombres de dominio.

#### <span id="q4"></span>4. Zonemaster indica "Error" o "Advertencia" en mi dominio. ¿Qué significa?
Depende cuáles de las pruebas fallaron en su dominio. Cada prueba está
acompañada por uno o más mensajes que describen los problemas encontrados.
También puede encontrar más detalles de cada prueba en el documento de
[Definición de Casos de Pruebas] (en inglés).

#### <span id="q5"></span>5. ¿Cómo puede juzgar Zonemaster qué está bien y qué está mal?
El criterio de Zonemaster se basa principalmente en los estándares
DNS definidos en los [RFCs]. También basa su criterio en las mejores
prácticas del DNS, que pueden ser definiciones un poco más vagas.
Todas las pruebas de Zonemaster están definidas en el
[Documento de Requerimientos de Pruebas] y [Definición de Casos de Pruebas]
(ambos en inglés), donde se encuentran las referencias a los documentos
de estándar relevantes para cada caso.

Las descripciones de los niveles de mensaje, como *información*, *advertencia*
y *error* se encuentran en [Definiciones de Nivel de Gravedad] (en inglés).
￼
A veces hay distintas interpretaciones de los estándares, u opiniones
de lo que es una buena práctica, y el equipo de Zonemaster siempre
está abierto a sugerencias. Si crees que hemos cometido un error de
criterio, por favor no dudes en enviarnos un email a
[zonemaster-users@lists.iis.se] (lista de correo moderada) con un enlace
al resultado de tu prueba y una explicación por qué crees que muestra
algo que consideres incorrecto.


#### <span id="q6"></span>6. ¿Zonemaster soporta IPv6?
Sí.
Por defecto Zonemaster consultará a los servidores de nombre usando
IPv4 e IPv6, a menos que sea configurado explícitamente de otra forma.
Esta configuración se encuentra en el botón "Opciones".

#### <span id="q7"></span>7. ¿Zonemaster verifica DNSSEC?
Sí.
En caso que un nombre de dominio que esté en prueba por Zonemaster tenga
soporte DNSSEC, será revisado automáticamente.

#### <span id="q8"></span>8. ¿Qué hace distinto a Zonemaster de otros software de validación DNS?
Primero que todo, Zonemaster guarda toda la historia de pruebas anteriores
basadas en el nombre del dominio probado, de tal forma que puedes ir hacia atrás
a una prueba que hiciste hace un tiempo, y compararla con la prueba
que acabas de hacer hace unos momentos.

En segundo lugar, todas las pruebas que ejecuta Zonemaster son definidas en Especificaciones
de Casos de Prueba que están enlazadas desde el documento
[Definición de Casos de Pruebas] (en inglés).

En tercer lugar, Zonemaster puede ser utilizado para probar dominios no-delegados. Más
información sobre dominios no-delegados en la [Pregunta 12].

En cuarto lugar, Zonemaster puede usarse para probar registros DS antes
de ser publicados en la zona padre (lo que es necesario para habilitar
DNSSEC en una zona firmada). Ver la [Pregunta 13].

Por último, esta versión de código abierto de Zonemaster fue construida
usando código modular, lo que básicamente significa que puedes integrar
partes del software en tus propios sistemas, si así lo quisieras.
Por ejemplo, es muy raro que quieras instalar un programa completo para
sólo probar redelegaciones.

#### <span id="q9"></span>9. Zonemaster y privacidad
Dado que [Zonemaster.net] es abierto a todos, es posible que cualquiera pueda
probar tu dominio y ver la historia de pruebas anteriores. Sin embargo, no hay
forma de saber quién ejecutó una prueba en específico, ya que solo se
almacena los parámetros de la prueba y sus resultados.
En específico, no se almacenan ni las cookies ni la dirección IP del
usuario. El usuario que inició la prueba no puede ser rastreado usando
la información de la base de datos.

#### <span id="q10"></span>10. ¿Por qué no puedo probar mi nombre de dominio?
Puede haber varias posibilidades:

- Su nombre de dominio aún no está delegado.
- Su nombre de dominio no es alcanzable desde la Internet pública.
- Zonemaster solo puede probar una zona DNS (por ej. 'zonemaster.net')
y no nombres de host (por ej. 'www.zonemaster.net').
- Existe una protección de 10 minutos entre pruebas consecutivas por
un nombre de dominio determinado (con los mismos parámetros de pruebas).
Al ejecutar una prueba dentro de esa ventana de tiempo, se mostrará
el último resultado que se se obtuvo para ese nombre de dominio (con
los mismos parámetros).
- Ha escrito mal su nombre de dominio.

#### <span id="q11"></span>11. ¿Qué tipo de consultas genera Zonemaster?
Zonemaster envía múltiples consultas DNS a los servidores de nombre que
hospedan al nombre de dominio que se está probando, y también a los
servidores de nombre que hospedan la zona padre del nombre de dominio.

La interfaz gráfica (GUI) de Zonemaster no muestra ninguna de las
consultas que envía, solo la interfaz CLI lo puede hacer. Si quiere
ver esas consultas, deberá instalar localmente una instancia con
funcionamiento mínimo de los componentes Engine y CLI (hay una imagen
Docker disponible). Las consultas enviadas pueden mostrarse usando
la opción de nivel 'DEBUG'. Le advertimos que la salida del CLI
puede ser bastante compleja. Para más información ver [Usando la CLI]
(en inglés).

#### <span id="q12"></span>12. ¿Qué es una prueba de dominio no-delegado?]
Una prueba de dominio no-delegado es una prueba ejecutada sobre un nombre
de dominio que puede o no estar completamente publicado en el DNS.
Esto es muy útil
cuando uno quiere mover un nombre de dominio desde un registrador a otro,
por ejemplo al mover la zona example.com desde el servidor de nombres
"ns.example.com" al servidor "ns.example.org". En este escenario, uno
podría ejecutar una prueba de dominio no-delegado indicando la zona
(example.com) y el servidor de nombres futuro al cual va a mover el
dominio (ns.example.org) *antes* de que muevas el dominio. Cuando obtenga
los resultados de las pruebas en verde, uno puede estar suficientemente
seguro que la nueva ubicación del dominio está funcionando correctamente.
Sin embargo, puede haber otros problemas en los datos de la zona en
sí misma, que esta prueba ignora.

#### <span id="q13"></span>13. ¿Puedo probar los registros DS antes de ser publicados?</a>
Sí.
Puede utilizar el botón "Opciones" y agregar ahí los registros
"Delegation Signer" (DS) que quiera probar. Zonemaster los usará
de la misma forma que si hubieran sido obtenidos desde la zona
padre.

#### <span id="q14"></span>14. ¿Cómo puedo probar una zona reversa con Zonemaster?
Para revisar una zona "reversa" (también llamada "inversa") con Zonemaster,
lo primero que necesitas es saber qué zona reversa es, e ingresarla en
el formato que tiene en el DNS.
Una zona reversa se obtiene dando vuelta una dirección IP y agregándole
un sufijo. Las direcciones IPv4 usan el sufijo "in-addr.arpa", mientras
que las direcciones IPv6 usan "ip6.arpa".

Ejemplos:
  - Para el prefijo IPv4 '198.51.100.0/24': 100.51.198.in-addr.arpa
  - Para el prefijo IPv6 '2001:db8::/32': 8.b.d.0.1.0.0.2.ip6.arpa


[AFNIC]:                                   https://www.afnic.fr/en/
[Documento de Requerimientos de Pruebas]:  https://github.com/zonemaster/zonemaster/tree/master/docs/specifications/tests#list-of-defined-test-cases
[Definición de Casos de Pruebas]:          https://github.com/zonemaster/zonemaster/tree/master/docs/specifications/tests#list-of-defined-test-cases
[Pregunta 12]:                             #q12
[Pregunta 13]:                             #q13
[RFCs]:                                    https://www.ietf.org/standards/rfcs/
[Definiciones de Nivel de Gravedad]:       https://github.com/zonemaster/zonemaster/blob/master/docs/specifications/tests/SeverityLevelDefinitions.md
[The Swedish Internet Foundation]:         https://internetstiftelsen.se/en/
[Usando La CLI]:                           https://github.com/zonemaster/zonemaster-cli/blob/master/USING.md
[Zonemaster.net]:                          https://zonemaster.net/
[zonemaster-users@lists.iis.se]:           mailto:zonemaster-users@lists.iis.se
