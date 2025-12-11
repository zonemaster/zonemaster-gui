---
question: Hvordan kan Zonemaster skille mellom hva som er riktig og galt?
category: Generell informasjon
---

Zonemasters dømming baserer seg primært på DNS-standardene som er definert i RFC-er. Den baserer også sin dømming på DNS-best practices, som kan være mer løst definert.

Alle Zonemaster-tester er definert i [Test Case Specification-dokumentene](https://github.com/zonemaster/zonemaster/tree/master/docs/public/specifications/tests#zonemaster-test-case-specifications), hvor referansene til standarddokumentene for hver testtilfelle finnes.

Beskrivelsene av meldingsnivåer som _NOTIS_, _ADVARSEL_ og _FEIL_ finnes i [Severity Level Definitions](https://github.com/zonemaster/zonemaster/blob/master/docs/public/specifications/tests/SeverityLevelDefinitions.md).

Noen ganger er det forskjellige tolkninger av standardene eller meninger om hva som er best practice, og Zonemaster-teamet er alltid åpent for innspill. Hvis du tror vi har gjort en feil i vår dømming, vær så snill å sende oss en e-post på [zonemaster-users@lists.iis.se](mailto:zonemaster-users@lists.iis.se) (moderert postliste) med en lenke til ditt testresultat og en forklaring på hvorfor du tror det viser noe du mener er feil.
