---
question: Kaj loči Zonemaster od drugih programov za preverjanje DNS con?
category: Splošne informacije
---

* Zonemaster shrani vse zgodovino prejšnjih testov na podlagi preverjenega imena domene, kar pomeni, da lahko grete nazaj na test, ki ste ga izvajali pred nekim časom, in ga primerjate z testom, ki ste ga izvajali pred trenutkom.
* Vsi testi, ki jih izvajajo Zonemaster, so definirani v dokumentih Specifikacij primerov testov, ki jih najdete v [dokumentih Specifikacij primerov testov](https://github.com/zonemaster/zonemaster/tree/master/docs/public/specifications/tests#zonemaster-test-case-specifications).
* Zonemaster se lahko uporablja za testiranje [neposrednih imen domen](https://zonemaster.net/sl/faq#kaj-je-neposredni-test-domene).
* Zonemaster se lahko uporablja za testiranje [DS zapisov pred njihovo objavo v nadzorni coni](https://zonemaster.net/sl/faq#ali-moram-testirati-ds-zapise-prej-kot-jih-objavijo).
* Ta odprtokodna različica Zonemaster je bila zgrajena z uporabo modulnega koda, kar pomeni, da lahko integrirate dele v svoje sisteme, če želite. Na primer, je zelo redko, da bi želeli popolni program samo za preverjanje ponovne delegacije.
