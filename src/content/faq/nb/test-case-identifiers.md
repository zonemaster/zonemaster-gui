---
question: Hva er Test Case Identifiers?
category: Bruk av Zonemaster
---

### Test Case Identifier Specification

Alle testtilfeller tilhører et spesifikt testnivå, og navnene deres er basert på
navnet på dette testnivået. Følgende testnivåer er definert og tilgjengelige:

- Address
- Basic
- Connectivity
- Consistency
- DNSSEC
- Delegation
- Nameserver
- Syntax
- Zone

Navnet på testnivået er ikke skilletegnsfølsomt, men de former som er definert ovenfor
må brukes når man refererer til testnivåene, det vil si bare den første bokstaven
stor, unntatt akronymer hvor alle store bokstaver brukes.
For eksempel "Address" og verken "ADDRESS" eller "address".

Test Case Identifier i test Case Specification (både i hovedoverskriften og i "Test Case Identifier" -avsnittet) bruker testnivånavnet,
som definert ovenfor, og har formatet: `{Testnivånavn} + {Indeks}`

Når man refererer til et testtilfelle, for lesbarhet, må bokstavfallet definert
ovenfor brukes for testnivånavnet.

`{Indeks}` er et to-sifret suffiks 01-99, og skal velges slik at
test Case Identifier er unik. Normalt velges det første ledige indeksen.

Eksempler på test Case Identifiers:

- Address03
- Basic04
- DNSSEC15
- Zone06
