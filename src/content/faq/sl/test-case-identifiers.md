---
question: Kaj so Identifikatorji primerov testov?
category: Uporaba Zonemasterja
---

### Specifikacija identifikatorja primerov testov

Vsi primeri testov spadajo v eno specifično ravno testov in njihova imena temeljijo na imenu te ravni testov. Definirane in dostopne so naslednje ravni testov:

- Naslov
- Osnovno
- Povezovanje
- Sklicnost
- DNSSEC
- Delegacija
- Strežnik imen
- Sintaksa
- Zona

Ime ravni testov ni občutljivo na velikost črk, vendar morajo biti uporabljene oblike, kot so definirane zgoraj, ko se sklicujete na ravni testov, to je samo prva črka velika, razen za akronime, za katere je uporabljena vsa velika črka. Na primer "Naslov" in niti "ADDRESS" niti "naslov".

Identifikator primerov testov v specifikaciji primerov testov (tako v glavnem naslovu kot v "Identifikator primerov testov" sekciji) uporablja ime ravni testov, kot je definirano zgoraj, in ima format: `{Ime ravni testov} + {Indeks}`

Ko se sklicujete na primer testov, mora biti za razberljivost uporabljena velikost črk, kot je definirana zgoraj za ime ravni testov.

`{Indeks}` je dvomestni priponk 01-99 in mora biti izbran tako, da je identifikator primerov testov edinstven. Običajno je izbran prvi prost indeks.

Primeri identifikatorjev primerov testov:

- Naslov03
- Osnovno04
- DNSSEC15
- Zona06
