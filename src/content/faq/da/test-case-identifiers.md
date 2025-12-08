---
question: Hvad er testtilfældeidentifikatorer?
category: Brug af Zonemaster
---

Alle testtilfælde tilhører et specifikt testniveau, og deres navne er baseret på navnet på dette testniveau. Følgende testniveauer er defineret og tilgængelige:

- Address
- Basic
- Connectivity
- Consistency
- DNSSEC
- Delegation
- Nameserver
- Syntax
- Zone

Navnet på testniveauet er ikke skriftstørrelsesfølsomt, men de former, der er defineret ovenfor, skal bruges, når der henvises til testniveauerne, dvs. kun den første bogstav er stort, undtagen akronymer, hvor alle bogstaver er store. For eksempel "Address" og hverken "ADDRESS" eller "address".

Testtilfældeidentifikatoren i testtilfældespecifikationen (både i hovedoverskriften og i afsnittet "Testtilfældeidentifikator") bruger navnet på testniveauet, som defineret ovenfor, og har formatet: `{Testniveau navn} + {Indeks}`

Når der henvises til et testtilfælde, skal bogstavstørrelsen, der er defineret ovenfor, bruges til navnet på testniveauet for læsbarhed.

`{Indeks}` er et to-cifret suffiks 01-99, og skal vælges, så testtilfældeidentifikatoren er unik. Normalt vælges det første ledige indeks.

Eksempler på testtilfældeidentifikatorer:

- Address03
- Basic04
- DNSSEC15
- Zone06
