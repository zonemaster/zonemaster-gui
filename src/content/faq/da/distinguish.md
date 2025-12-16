---
question: Hvordan kan Zonemaster skelne mellem hvad der er rigtigt og forkert?
category: Generel information
---

Zonemasters dom er primært baseret på DNS-standarderne, som er defineret i RFC'er. Den baserer også sin dom på DNS-bedste praksis, som kan være mere løst defineret.

Alle Zonemaster-tests er defineret i [Test Case Specification-dokumenterne](https://github.com/zonemaster/zonemaster/tree/master/docs/public/specifications/tests#zonemaster-test-case-specifications), hvor henvisninger til standarddokumenterne for hvert testtilfælde findes.

Beskrivelserne af meddelelsesniveauer som _MEDDELELSE_, _ADVARSEL_ og _FEJL_ findes i [Severity Level Definitions](https://github.com/zonemaster/zonemaster/blob/master/docs/public/specifications/tests/SeverityLevelDefinitions.md).

Nogle gange er der forskellige fortolkninger af standarderne eller meninger om, hvad der er bedste praksis, og Zonemaster-holdet er altid åbent for input. Hvis du tror, at vi har gjort en fejl i vores dom, tøv ikke med at sende os en e-mail på [zonemaster-users@lists.iis.se](mailto:zonemaster-users@lists.iis.se) (modereret mailingliste) med et link til dit testresultat og en forklaring på, hvorfor du tror, at det viser noget, som du betragter som forkert.
