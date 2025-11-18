---
question: Hva er en udelegerte domene test?
category: Bruk av Zonemaster
---

En udelegerte domene test er en test som utføres på et domenenavn som kan, eller ikke kan, være fullstendig publisert i DNS.

Dette kan være svært nyttig hvis man skal migrere sitt domene fra en registrator til en annen, for eksempel migrere sonen 'example.com' fra navneserveren 'ns.example.com' til navneserveren 'ns.example.org'. I denne scenariet kan man utføre en udelegerte domene test ved å gi sonen ('example.com') og navneserveren du migrerer til ('ns.example.org') før du migrerer ditt domene.

Når resultatene av testen ikke viser noen feil eller advarsler, kan man være ganske sikker på at domenets nye plassering fungerer bra. Det kan imidlertid fortsatt være andre problemer i sonedataene selv som denne testen ikke er klar over.
