---
question: Vad är Zonemaster?
category: Allmänt
---

Zonemaster är ett mjukvarupaket som validerar kvaliteten på en DNS-delegering.

Ambitionen med Zonemaster-projektet är att utveckla och underhålla ett DNS-valideringsverktyg med öppen källkod, som erbjuder förbättrad prestanda jämfört med befintliga verktyg och tillhandahåller omfattande dokumentation som kan återanvändas av liknande projekt i framtiden.

Zonemaster består av flera moduler eller komponenter:

- Engine, ett testramverk som stödjer all funktionalitet för att utföra DNS-tester;
- CLI, ett kommandoradsgränssnitt till Engine;
- Backend, en server som låter dig köra Zonemaster-tester och spara resultat med hjälp av ett JSON-RPC API och en databas;
- GUI, ett webbgränssnitt till Backend.
- Komponenterna hjälper olika typer av användare att kontrollera domänservrar för konfigurationsfel och generera en rapport som hjälper till att åtgärda felen.
