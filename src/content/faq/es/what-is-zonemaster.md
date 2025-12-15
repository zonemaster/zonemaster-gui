---
question: ¿Qué es Zonemaster?
category: Información general
---

Zonemaster es un paquete de software que valida la calidad de una delegación DNS.

La ambición del proyecto Zonemaster es desarrollar y mantener una herramienta de validación DNS de código abierto, ofreciendo un mejor rendimiento sobre las herramientas existentes y proporcionando una documentación extensa que podría ser reutilizada por proyectos similares en el futuro.

Zonemaster consta de varios módulos o componentes:

- Engine, un marco de pruebas que soporta toda la funcionalidad para realizar pruebas DNS;
- CLI, una interfaz de línea de comandos para el Engine;
- Backend, un servidor que permite ejecutar pruebas de Zonemaster y guardar los resultados utilizando una API JSON-RPC y una base de datos;
- GUI, una interfaz web para el Backend.

Los componentes ayudarán a diferentes tipos de usuarios a verificar los servidores de nombres de un dominio en busca de errores de configuración y generar un informe que ayudará a corregir los errores.
