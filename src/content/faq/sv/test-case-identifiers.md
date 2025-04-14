---
question: Vad är testfallsidentifierare?
category: Använda Zonemaster
---

## Specifikation av testfallsidentifierare

Alla testfall tillhör en specifik testnivå och deras namn baseras på
den testnivåns namn. Följande testnivåer är definierade och tillgängliga:

- Address
- Basic
- Connectivity
- Consistency
- DNSSEC
- Delegation
- Nameserver
- Syntax
- Zone

Testnivåns namn är inte skiftlägeskänsligt, men de former som definieras ovan
måste användas när man hänvisar till testnivåerna, dvs. endast den första bokstaven
versalt, förutom för akronymer där alla bokstäver är versala.
Till exempel "Address" och varken "ADDRESS" eller "address".

Testfallsidentifieraren i testfallsspecifikationen (både i huvudrubriken och i avsnittet "Testfallsidentifierare") använder testnivåns namn,
som definieras ovan, och har formatet: `{Testnivåns namn} + {Index}`

När man hänvisar till ett testfall, för läsbarhetens skull, måste den bokstavsform som definieras
ovan användas för testnivåns namn.

`{Index}` är ett tvåsiffrigt suffix 01-99, och bör väljas så att
testfallsidentifieraren är unik. Normalt väljs det första lediga indexet.

Exempel på testfallsidentifierare:

- Address03
- Basic04
- DNSSEC15
- Zone06
