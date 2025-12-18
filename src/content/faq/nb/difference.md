---
question: Hva gjør Zonemaster annerledes fra andre DNS-sonevalideringsprogrammer?
category: Generell informasjon
---

* Zonemaster lagrer all historie fra tidligere tester basert på det testede domenenavnet, hvilket betyr at du kan gå tilbake til en test du gjorde for en stund siden og sammenligne den med testen du nettopp kjørte.
* Alle tester som Zonemaster kjører er definert i Test Case Specification-dokumentene som kan finnes i [Test Case Specification-dokumentene](https://github.com/zonemaster/zonemaster/tree/master/docs/public/specifications/tests#zonemaster-test-case-specifications).
* Zonemaster kan brukes til å teste [udelegerte domenenavn](https://zonemaster.net/nb/faq#what-is-an-undelegated-domain-test).
* Zonemaster kan brukes til å teste [DS-oppføringer før deres publisering i overordnet sone](https://zonemaster.net/nb/faq#can-i-test-the-ds-records-before-they-are-published).
* Denne åpne kildekodeversjonen av Zonemaster ble bygget ved hjelp av modulær kode, hvilket betyr at du kan integrere deler av den i dine egne systemer, hvis du ønsker. For eksempel er det ganske sjeldent at du ville ønske et komplett program bare for å sjekke for omdelegeringer.
