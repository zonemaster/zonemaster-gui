---
question: Kaj so Identifikatorji primerov testov?
category: Uporaba Zonemasterja
---

Testi so razporejeni v različne skupine. Njihova imena temeljijo na imenu skupine. Definirane so naslednje skupine testov:

- Address
- Basic
- Connectivity
- Consistency
- DNSSEC
- Delegation
- Nameserver
- Syntax
- Zone

Ime skupine testov ni občutljivo na velikost črk, vendar morajo biti uporabljene oblike, kot so definirane zgoraj, ko se sklicujete na skupino testov, to je samo prva črka velika, razen za akronime, ki so pisani z velikimi črkami. 

Identifikator testa v specifikaciji testov uporablja ime skupine testov (definirano zgoraj) in ima format: `{Ime skupine testov} + {Indeks}`

Ko se sklicujete na test, mora biti za lažjo določitev uporabljena velikost črk, kot je definirana zgoraj za skupino testov.

`{Indeks}` je dvomestno število 01-99 in mora biti izbrano tako, da je identifikator testa enoličen. Običajno je izbran prvi prost indeks.

Primeri identifikatorjev testov:

- Address03
- Basic04
- DNSSEC15
- Zone06
