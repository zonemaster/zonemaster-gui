---
question: Mikä on Zonemaster?
category: Yleistä tietoa
---

Zonemaster on ohjelmistokokonaisuus, joka analysoi ja validoi DNS-vyöhykkeiden delegoinnin oikeellisuuden, standardienmukaisuuden ja toimivuuden.

Zonemaster-projektin tavoitteena on kehittää ja ylläpitää avoimen lähdekoodin DNS-validointityökalua, joka tarjoaa paremman suorituskyvyn verrattuna olemassa oleviin työkaluihin sekä kattavan dokumentaation, jota voidaan tulevaisuudessa hyödyntää myös muissa vastaavissa projekteissa.

Zonemaster koostuu useista moduuleista tai komponenteista:

- Engine, testauskehys, joka tukee kaikkia DNS-testien suorittamiseen tarvittavia toimintoja;
- CLI, komentorivikäyttöliittymä Engineen;
- Backend, palvelin, joka mahdollistaa Zonemaster-testien suorittamisen ja tulosten tallentamisen JSON-RPC API:n ja tietokannan avulla;
- GUI, verkkokäyttöliittymä Backendiin.

Komponentit tukevat verkkotunnusten nimipalvelinasetusten tarkistamista, mahdollisten konfiguraatiovirheiden tunnistamista sekä yksityiskohtaisen raportin tuottamista virheiden korjaamisen tueksi.
