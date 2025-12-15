---
question: Kaj loči Zonemaster od drugih programov za preverjanje DNS con?
category: Splošne informacije
---

* Zonemaster shrani zgodovino prejšnjih testov na podlagi preverjenega imena domene, kar pomeni, da si lahko ogledate test, ki ste ga izvajali pred časom, in ga primerjate s testom, ki ste ga izvajali sedaj.
* Vsi testi, ki jih izvajaja Zonemaster, so definirani v dokumentih Specifikacij testov, ki jih najdete v [dokumentih Specifikacije testov](https://github.com/zonemaster/zonemaster/tree/master/docs/public/specifications/tests#zonemaster-test-case-specifications).
* Zonemaster se lahko uporablja za testiranje [nedelegiranih domen](https://zonemaster.net/sl/faq#kaj-je-test-nedelegirane-domene).
* Zonemaster se lahko uporablja za testiranje [DS zapisov pred njihovo objavo v starševski coni](https://zonemaster.net/sl/faq#ali-moram-testirati-ds-zapise-prej-kot-jih-objavijo).
* Ta odprtokodna različica Zonemaster je bila zgrajena modularno, kar pomeni, da lahko integrirate posamezne module v svoje sisteme.
