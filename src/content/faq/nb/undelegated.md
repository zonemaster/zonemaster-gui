---
question: Hva er en udelegert domenesjekk?
category: Bruk av Zonemaster
---

En udelegert domenesjekk er en sjekk som utføres på et domenenavn som kan, eller ikke kan, være fullstendig publisert i DNS.

Dette kan være svært nyttig hvis man skal migrere sitt domene fra en registrar/forhandler til en annen, for eksempel migrere sonen 'example.com' fra navnetjeneren 'ns.example.com' til navnetjeneren 'ns.example.org'. I denne scenariet kan man utføre en udelegert domenesjekk ved å gi sonen ('example.com') og navnetjeneren du migrerer til ('ns.example.org') før du migrerer ditt domene.

Når resultatene av testen ikke viser noen feil eller advarsler, kan man være ganske sikker på at domenets nye plassering fungerer bra. Det kan imidlertid fortsatt være andre problemer i sonedataene selv som denne testen ikke er klar over.
