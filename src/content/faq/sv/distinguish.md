---
question: Hur kan Zonemaster avgöra vad som är rätt och fel?
category: Allmän information
---

Zonemasters bedömning baseras främst på DNS-standarderna som definieras i RFC-dokument. Den baserar även sin bedömning på vedertagen praxis inom DNS, vilket kan vara mindre strikt definierad.

Alla testfall i Zonemaster är definierade i [Test Case Specification documents](https://github.com/zonemaster/zonemaster/tree/master/docs/public/specifications/tests#zonemaster-test-case-specifications), där det också finns referenser till relevanta standarddokument för varje testfall.

Beskrivningar av meddelandenivåer som _NOTERING_, _VARNING_ och _FEL_ finns i [Severity Level Definitions](https://github.com/zonemaster/zonemaster/blob/master/docs/public/specifications/tests/SeverityLevelDefinitions.md).

Ibland finns det olika tolkningar av standarderna eller olika åsikter om vad som är bästa praxis, och arbetsgruppen för Zonemaster är alltid öppet för synpunkter. Om du anser att vi har gjort ett fel i vår bedömning, tveka inte att skicka ett mejl till [zonemaster-users@lists.iis.se](mailto:zonemaster-users@lists.iis.se) (modererad e-postlista) med en länk till ditt testresultat och en förklaring till varför du anser att det visar något som är felaktigt.
