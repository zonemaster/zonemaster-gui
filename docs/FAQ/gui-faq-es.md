Zonemaster
==========

1. [¿Qué es Zonemaster?](#q1)
2. [¿Quién está detrás de Zonemaster?](#q2)
3. [¿Cómo me puede ayudar Zonemaster?](#q3)
4. [Zonemaster indica "Error" o "Advertencia" en mi dominio. ¿Qué significa?](#q4)
5. [¿Cómo puede juzgar Zonemaster qué está bien y qué está mal?](#q5)
6. [¿Zonemaster utiliza IPv6?](#q6)
7. [¿Zonemaster entiende DNSSEC?](#q7)
8. [¿Qué hace distinto a Zonemaster de otros software de validación DNS?](#q8)
9. [Zonemaster y privacidad](#q9)
10. [¿Por qué no puedo probar mi dominio?](#q10)
11. [¿Qué tipo de consultas genera Zonemaster?](#q11)
12. [¿Qué es una prueba de dominio no-delegado?](#q12)
13. [¿Cómo puedo probar una zona reversa con Zonemaster?](#q13)

Zonemaster
----------

<a name="q1"></a>
#### 1. ¿Qué es Zonemaster?
Zonemaster es un programa que fue diseñado para ayudar a la gente a revisar,
medir y ojalá también entender cómo funciona el DNS (Sistema de Nombres de
Dominio).

Consiste de cuatro partes básicas:

  1. Motor ("Engine") - una arquitectura de pruebas que soporta toda la funcionalidad para realizar pruebas DNS.
  2. La interfaz de línea de comandos ("CLI") hacia el Motor.
  3. Un servidor interno ("Backend"), que permite ejecutar las pruebas de Zonemaster y guardar los resultados, usando una API JSON-RPC y una base de datos.
  4. GUI - una interfaz web hacia el servidor interno.

Cuando un dominio (tal como "zonemaster.net") es enviado a Zonemaster (CLI o
GUI) este investigará el estado de salud general recorriendo el DNS desde
su raíz (.), pasando por el TLD (Dominio de Primer Nivel, como .net) hasta
llegar a los servidores de nombre que mantienen la información específica
del dominio (zonemaster.net). Las distintas pruebas de sanidad conducidas
por la herramienta Zonemaster están documentadas en el
[Documento de Requerimientos de Pruebas](https://github.com/zonemaster/zonemaster/blob/master/docs/requirements/TestRequirements.md) (en inglés).

<a name="q2"></a>
#### 2. ¿Quién está detrás de Zonemaster?
Zonemaster es un proyecto conjunto entre [Afnic](https://www.afnic.fr/en/)
(operador del registro para el TLD .fr y varios otros, por ejemplo
.re, .pm, .tf, .wf, .yt y .paris) y
[The Swedish Internet Foundation](https://internetstiftelsen.se/en/)
(operador del registro de los TLDs .se y .nu).

<a name="q3"></a>
#### 3. ¿Cómo me puede ayudar Zonemaster?
La herramienta Zonemaster está orientada a dos categorías de usuarios:

  - Usuarios que entienden bien el protocolo DNS.
  - Usuarios que solo quieren saber si los dominios que poseen o usan tienen algún problema o no.

Los usuarios de la segunda categoría deberían contactar a sus operadores
DNS tan pronto obtengan resultados distintos a "verde" en cualquiera
de las pruebas sobre sus nombres de dominio.

<a name="q4"></a>
#### 4. Zonemaster indica "Error" o "Advertencia" en mi dominio. ¿Qué significa?
Depende en cuál de las pruebas fallaron en su dominio.

<a name="q5"></a>
#### 5. ¿Cómo puede juzgar Zonemaster qué está bien y qué está mal?
No existe un juicio final sobre la salud de un dominio que pueda ser
certificada por cualquiera. Las personas detrás de Zonemaster no pueden
asegurar que la herramienta esté correcta en todos sus detalles. A veces
las opiniones difieren. Hemos hecho los mejores esfuerzos en este proyecto
para crear reglas por defecto que atrapen los errores más evidentes.
Esperamos que sea un buen compromiso entre un error que sea potencialmente
peligroso y los que puedan ser vistos simplemente como un aviso o una
advertencia. La ventaja especial de esta herramienta es que cada uno
puede crear sus propias reglas ajustadas a su propia necesidad, agregarlas
a un directorio, e indicar a la herramienta que use esas reglas al
ejecutar las pruebas.
Pero tal como muchas cosas que evolucionan como el DNS, la situación es
cambiante en el tiempo, y lo que es un aviso hoy puede ser un error
mañana. Si realmente crees que hemos cometido un error en nuestro
juicio, por favor no dudes en enviarnos un email a 
zonemaster-devel@lists.iis.se con un enlace a tu prueba y una explicación
por qué crees que muestra algo que consideres incorrecto.

<a name="q6"></a>
#### 6. ¿Zonemaster utiliza IPv6?
Sí, por supuesto. Todas las pruebas que se ejecutan sobre IPv4 también
se ejecutan sobre IPv6, si es que Zonemaster fue configurado para hacerlo.

<a name="q7"></a>
#### 7. ¿Zonemaster entiende DNSSEC?
Sí, en caso que un dominio que esté en prueba por Zonemaster tenga
soporte DNSSEC, será revisado automáticamente.

<a name="q8"></a>
#### 8. ¿Qué hace distinto a Zonemaster de otros software de validación DNS?
Primero que todo, Zonemaster guarda toda la historia de pruebas anteriores
basadas en el nombre del dominio probado, de tal forma que puedes ir hacia atrás
a una prueba que hiciste hace una semana, y compararla con la prueba
que acabas de hacer hace unos momentos.

Todas las pruebas que ejecuta Zonemaster son definidas en especificaciones
de casos de prueba que están enlazadas desde el
[Documento de Requerimientos de Pruebas](https://github.com/zonemaster/zonemaster/blob/master/docs/requirements/TestRequirements.md) (en inglés).

Zonemaster puede ser utilizado para probar dominios no-delegados. Más
información sobre dominios no-delegados en la [Pregunta 12](#q12).

Por último, esta versión de código abierto de Zonemaster fue construida
usando código modular, lo que básicamente significa que puedes usar
partes del software en tus propios sistemas, si así lo quisieras. Es
muy raro que quieras instalar el programa completo para sólo probar redelegaciones
de ejemplo.

<a name="q9"></a>
#### 9. Zonemaster y privacidad
Dado que Zonemaster es abierto a todos, es posible que cualquiera pueda
probar tu dominio y también ver pruebas anteriores. Sin embargo, no hay
forma de saber quién ejecutó una prueba en específico, ya que nada se
registra en nuestros sistemas, salvo el momento en que se ejecutó.

<a name="q10"></a>
#### 10. ¿Por qué no puedo probar mi dominio?
Si descartamos la situación donde el dominio no existe, como los casos
cuando ingresas un dominio no registrado en Zonemaster, hay dos otras
posibilidades:
  - Para proteger al sistema de entradas múltiples idénticas, como cuando
    desde la misma dirección IP se pide revisar la misma zona varias veces,
    existe una demora de 5 minutos entre pruebas idénticas subsecuentes.
    Esto quiere decir que solo puedes probar el mismo dominio una vez cada
    5 minutos, y si lo intentas hacer de nuevo antes de los 5 minutos del
    último resultado, se mostrará el último resultado disponible.
  - Debido a que Zonemaster fue hecho para revisar dominios o zonas DNS
    (como zonemaster.net) y no para máquinas (hosts) dentro de un dominio
    (como www.zonemaster.net), Zonemaster indicará una falla si
    intentas probar un nombre de máquina (host) en vez de un nombre de
    dominio que calce con una zona DNS.

<a name="q11"></a>
#### 11. ¿Qué tipo de consultas genera Zonemaster?
Zonemaster envía múltiples consultas DNS a los servidores de nombre que
hospedan al nombre de dominio, y también a los servidores de nombre que
hospedan la zona padre del nombre de dominio.

Para tener una vista completa de qué consultas y respuestas se generan,
puedes ejecutar una prueba con la interfaz de comandos (CLI) y seleccionar
la salida completa (para esto necesitarás descargar e instalar el paquete
completo de Zonemaster). La salida de la herramienta CLI es bastante
técnica, así que a menos que estés acostumbrado a información de bajo
nivel de bits y bytes, es mejor saltarse esta etapa.

<a name="q12"></a>
#### 12. ¿Qué es una prueba de dominio no-delegado?]
Una prueba de dominio no-delegado es una prueba ejecutada sobre un dominio
que puede o no estar completamente publicado en el DNS. Esto es muy útil
cuando uno quiere mover un nombre de dominio desde un registrador a otro,
por ejemplo al mover la zona example.com desde el servidor de nombres
"ns.example.com" al servidor "ns.example.org". En este escenario, uno
podría ejecutar una prueba de dominio no-delegado indicando la zona
(example.com) y el servidor de nombres futuro al cual vas a mover el
dominio (ns.example.org) *antes* de que muevas el dominio. Cuando obtengas
los resultados de las pruebas en verde uno puede estar suficientemente
seguro que la nueva ubicación del dominio está funcionando correctamente.
Sin embargo, puede haber otros problemas en los datos de la zona en
sí mismos que esta prueba ignora.

<a name="q13"></a>
#### 13. ¿Cómo puedo probar una zona reversa con Zonemaster?
Para revisar una zona "reversa" (también llamada "inversa") con Zonemaster,
lo primero que necesitas es saber qué zona reversa es. Si quieres probar
la zona reversa, es necesario ingresarla con el formato que tiene en el
DNS, por ejemplo:

  - 3.2.1.in-addr.arpa
  - 6.0.1.0.0.2.ip6.arpa


