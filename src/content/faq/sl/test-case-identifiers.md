---
question: Kaj so Identifikatorji primerov testov?
category: Uporaba Zonemasterja
---

Vsi primeri testov spadajo v eno specifično ravno testov in njihova imena temeljijo na imenu te ravni testov. Definirane in dostopne so naslednje ravni testov:

- Address
- Basic
- Connectivity
- Consistency
- DNSSEC
- Delegation
- Nameserver
- Syntax
- Zone

Ime ravni testov ni občutljivo na velikost črk, vendar morajo biti uporabljene oblike, kot so definirane zgoraj, ko se sklicujete na ravni testov, to je samo prva črka velika, razen za akronime, za katere je uporabljena vsa velika črka. Na primer "Address" in niti "ADDRESS" niti "address".

Identifikator primerov testov v specifikaciji primerov testov (tako v glavnem naslovu kot v "Identifikator primerov testov" sekciji) uporablja ime ravni testov, kot je definirano zgoraj, in ima format: `{Ime ravni testov} + {Indeks}`

Ko se sklicujete na primer testov, mora biti za razberljivost uporabljena velikost črk, kot je definirana zgoraj za ime ravni testov.

`{Indeks}` je dvomestni priponk 01-99 in mora biti izbran tako, da je identifikator primerov testov edinstven. Običajno je izbran prvi prost indeks.

Primeri identifikatorjev primerov testov:

- Address03
- Basic04
- DNSSEC15
- Zone06
