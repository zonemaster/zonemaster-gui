---
question: Hvad er Zonemaster?
category: Generel information
---

Zonemaster er et softwarepakke, der validerer kvaliteten af en DNS-delegering.

Ambitionen bag Zonemaster-projektet er at udvikle og vedligeholde et open source DNS-validationsværktøj, der tilbyder forbedret ydeevne i forhold til eksisterende værktøjer og leverer omfattende dokumentation, der kan genbruges af lignende projekter i fremtiden.

Zonemaster består af flere moduler eller komponenter:

- Engine, et testrammeværk, der understøtter al funktionalitet til udførelse af DNS-tests;
- CLI, en kommandolinjegrænseflade til Engine;
- Backend, en server, der gør det muligt at køre Zonemaster-tests og gemme resultater ved hjælp af en JSON-RPC-API og en database;
- GUI, en webgrænseflade til Backend.

Komponenterne vil hjælpe forskellige typer brugere med at tjekke et domænes navneservere for konfigurationfejl og generere en rapport, der vil hjælpe med at rette fejlene.
