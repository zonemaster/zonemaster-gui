---
question: Mitä tekee Zonemasterista erilaisen kuin muista DNS-vyöhykkeen validointiohjelmista?
category: Yleistä tietoa
---

* Zonemaster tallentaa testihistorian verkkotunnuskohtaisesti, joten voit palata aiemmin tehtyihin testeihin ja vertailla niitä uusimpiin testituloksiin.
* Kaikki testit, jotka Zonemaster suorittaa, on määritelty Test Case Specification -dokumenteissa, jotka löytyvät [Test Case Specification -dokumenteista](https://github.com/zonemaster/zonemaster/tree/master/docs/public/specifications/tests#zonemaster-test-case-specifications).
* Zonemasteria voidaan käyttää [ei-delegoitujen verkkotunnusten testaukseen](https://zonemaster.net/fi/faq#what-is-an-undelegated-domain-test).
* Zonemasteria voidaan käyttää [DS-tietueiden testaukseen ennen niiden julkaisua ylemmällä vyöhykkeellä](https://zonemaster.net/fi/faq#can-i-test-the-ds-records-before-they-are-published).
* Tämä avoimen lähdekoodin versio Zonemasterista on rakennettu modulaarisen koodirakenteen pohjalta, mikä mahdollistaa yksittäisten komponenttien integroinnin omaan järjestelmään tarpeen mukaan. Esimerkiksi harvoin on tarvetta käyttää koko ohjelmistoa pelkästään uudelleen-delegointien tarkistamiseen.
