---
question: Mitä tekee Zonemasterista erilaisen muista DNS-vyöhykkeen validointiohjelmista?
category: Yleistä tietoa
---

* Zonemaster tallentaa kaiken historian aikaisemmista testeistä testatun verkkotunnuksen perusteella, mikä tarkoittaa, että voit palata testiin, jonka teit jonkin aikaa sitten, ja vertailla sitä testiin, jonka juuri suoritit.
* Kaikki testit, jotka Zonemaster suorittaa, on määritelty Test Case Specification -dokumenteissa, jotka löytyvät [Test Case Specification -dokumenteista](https://github.com/zonemaster/zonemaster/tree/master/docs/public/specifications/tests#zonemaster-test-case-specifications).
* Zonemasteria voidaan käyttää [ei-delegoitujen verkkotunnusten testaukseen](https://zonemaster.net/fi/faq#what-is-an-undelegated-domain-test).
* Zonemasteria voidaan käyttää [DS-tietueiden testaukseen ennen niiden julkaisua vanhemmassa vyöhykkeessä](https://zonemaster.net/fi/faq#can-i-test-the-ds-records-before-they-are-published).
* Tämä avoimen lähdekoodin versio Zonemasterista on rakennettu modulaariseen koodiin, mikä tarkoittaa, että voit integroida osia siitä omaan järjestelmään, jos haluat. Esimerkiksi on melko harvinaista, että haluaisit täydellisen ohjelman vain uudelleen-delegointien tarkistamiseen.
