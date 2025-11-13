---
question: Hvad gør Zonemaster forskellig fra andre DNS-zonetestsoftware?
category: Generel information
---

* Zonemaster gemmer hele historien fra tidligere tests baseret på det testede domænenavn, hvilket betyder, at du kan gå tilbage til en test, du foretog for nogen tid siden, og sammenligne den med den test, du lige har kørt.
* Alle tests, som Zonemaster udfører, er defineret i Test Case Specification-dokumenterne, som kan findes i [Test Case Specification-dokumenterne](https://github.com/zonemaster/zonemaster/tree/master/docs/public/specifications/tests#zonemaster-test-case-specifications).
* Zonemaster kan bruges til at teste [ikke-delegerede domænenavne](https://zonemaster.net/da/faq#what-is-an-undelegated-domain-test).
* Zonemaster kan bruges til at teste [DS-registreringer før deres offentliggørelse i forældrezonen](https://zonemaster.net/da/faq#can-i-test-the-ds-records-before-they-are-published).
* Denne open source-version af Zonemaster er bygget ved hjælp af modulær kode, hvilket betyder, at du kan integrere dele af den i dine egne systemer, hvis du ønsker det. For eksempel er det ret sjældent, at du vil have et komplet program, bare for at tjekke for omdelegeringer.
