---
question: Vad är testfallsidentifierare?
category: Använda Zonemaster
---

### Specifikation för testfallsidentifierare

Alla testfall tillhör en specifik testnivå och deras namn baseras på
namnet för den testnivån. Följande testnivåer är definierade och tillgängliga:

- Address
- Basic
- Connectivity
- Consistency
- DNSSEC
- Delegation
- Nameserver
- Syntax
- Zone

Namnet på testnivån är inte skiftlägeskänsligt, men de former som definieras ovan
ska användas när testnivåer refereras till, dvs. endast första bokstaven versal,
förutom för akronymer som skrivs med enbart versaler.
Till exempel "Address" och varken "ADDRESS" eller "address".

Testfallsidentifieraren i testfallspecifikationen (både i huvudrubriken och i avsnittet "Test case identifier") använder testnivånamnet enligt ovan, och har formatet: `{Testnivånamn} + {Index}`

Vid referens till ett testfall ska, för läsbarhetens skull, skiftläget för testnivånamnet användas enligt definitionen ovan.

`{Index}` är ett tvåsiffrigt suffix 01–99 och bör väljas så att testfallsidentifieraren är unik. Normalt väljs det första lediga indexet.

Exempel på testfallsidentifierare:

- Address03
- Basic04
- DNSSEC15
- Zone06
