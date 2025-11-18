---
question: Mikä on Zonemaster?
category: Yleistä tietoa
---

Zonemaster on ohjelmistopaketti, joka validoi DNS-delegoinnin laadun.

Zonemaster-projektin tavoitteena on kehittää ja ylläpitää avoimen lähdekoodin DNS-validointityökalua, joka tarjoaa parannettua suorituskykyä olemassa olevien työkalujen suhteen ja tarjoaa laajan dokumentaation, joka voidaan tulevaisuudessa käyttää samankaltaisten projektien uudelleen.

Zonemaster koostuu useista moduuleista tai komponenteista:

- Engine, testauskehys, joka tukee kaikkia toimintoja DNS-testien suorittamiseen;
- CLI, komentorivikäyttöliittymä Engineen;
- Backend, palvelin, joka mahdollistaa Zonemaster-testien suorittamisen ja tulosten tallentamisen JSON-RPC API:n ja tietokannan avulla;
- GUI, verkkokäyttöliittymä Backendiin.

Komponentit auttavat erilaisia käyttäjiä tarkistamaan verkkotunnuksen nimipalvelimet konfiguraatiovirheistä ja tuottamaan raportin, joka auttaa virheiden korjaamisessa.
