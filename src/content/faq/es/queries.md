---
question: ¿Qué tipo de consultas DNS genera Zonemaster?
category: Información general
---

Zonemaster envía múltiples consultas DNS a los servidores de nombres que alojan el nombre de dominio que se está probando y también a los servidores de nombres que alojan la zona padre de ese nombre de dominio.

La interfaz web de Zonemaster no muestra las consultas que se enviaron, solo la interfaz de línea de comandos (CLI) puede hacerlo. Si desea ver dichas consultas, deberá instalar localmente una instancia de Zonemaster mínimamente funcional con ambos componentes, el Motor y la CLI. Consulte el [documento de instalación de la CLI](https://github.com/zonemaster/zonemaster/blob/master/docs/public/installation/zonemaster-cli.md) para obtener más información, o si prefiere, también está disponible una [imagen de Docker](https://github.com/zonemaster/zonemaster/blob/master/docs/public/using/cli.md#Invoking-the-command-line-tool-using-Docker).

Las consultas enviadas se pueden mostrar utilizando la opción de nivel 'DEPURACIÓN'. Advertencia justa, la salida de la CLI puede ser bastante pesada. Para más información, consulte la [documentación de uso de la CLI](https://github.com/zonemaster/zonemaster/blob/master/docs/public/using/cli.md).
