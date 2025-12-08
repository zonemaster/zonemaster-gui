---
question: Mitä Test Case -tunnisteet ovat?
category: Zonemasterin käyttö
---

Kaikki testitapaukset kuuluvat yhteen tiettyyn testitasoon, ja niiden nimet perustuvat
tämän testitasoon nimeen. Seuraavat testitasot on määritelty ja saatavilla:

- Address
- Basic
- Connectivity
- Consistency
- DNSSEC
- Delegation
- Nameserver
- Syntax
- Zone

Testitasojen nimet eivät ole kirjainkohtaisia, mutta yllä määritellyt muodot
tulee käyttää viittaamalla testitasoihin, eli vain ensimmäinen kirjain
iso, paitsi akronyymit, joille käytetään kaikkia isoja kirjaimia.
Esimerkiksi "Address" eikä "ADDRESS" eikä "address".

Testitapauksen tunniste testitapauksen määrittelyssä (sekä pääotsikossa että "Testitapauksen tunniste" -osiossa) käyttää testitasojen nimeä,
kuin yllä määritelty, ja sillä on muoto: `{Testitaso nimi} + {Indeksi}`

Viittaamalla testitapaukseen, luettavuuden vuoksi, yllä määritelty kirjainkohtaisuus
tulee käyttää testitasojen nimille.

`{Indeksi}` on kaksi-numeroinen pääte 01-99, ja se tulee valita niin, että
testitapauksen tunniste on yksilöllinen. Yleensä ensimmäinen vapaa indeksi valitaan.

Esimerkkejä testitapauksen tunnisteista:

- Address03
- Basic04
- DNSSEC15
- Zone06
