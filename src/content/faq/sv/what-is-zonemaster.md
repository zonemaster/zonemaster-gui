---
question: Vad är Zonemaster?
category: Generell information
---

Zonemaster är ett programvarupaket som validerar kvaliteten på en DNS-delegering.

Ambitionen med Zonemaster-projektet är att utveckla och underhålla ett open source-verktyg för DNS-validering, med bättre prestanda än befintliga verktyg och med omfattande dokumentation som kan återanvändas av liknande projekt i framtiden.

Zonemaster består av flera moduler eller komponenter:

- Engine, ett test-ramverk som har all funktionalitet för att utföra DNS-tester;
- CLI, ett kommandoradsgränssnitt till Engine;
- Backend, en server som låter dig köra Zonemaster-tester och spara resultat via ett JSON-RPC API och en databas;
- GUI, ett webbgränssnitt till Backend.
- Komponenterna hjälper olika typer av användare att kontrollera domänservrar efter konfigurationsfel och generera en rapport som underlättar felsökning.
