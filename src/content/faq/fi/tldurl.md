---
question: Mikä on TLD:n tietolinkki?
category: Zonemasterin käyttö
---

Kun testi on valmis, Zonemaster tarjoaa yleensä linkin testatun verkkotunnuksen TLD:n (ylätason verkkotunnuksen) verkkosivustolle, esimerkiksi `.net`, jos testattu verkkotunnus on zonemaster.net. Linkki löytyy `.net Info` -painikkeesta (jos .net on TLD). Linkin kautta on yleensä mahdollista löytää hyödyllistä tietoa testatusta verkkotunnuksesta. Tiedon löytämisen helppous riippuu kyseisestä TLD:stä. Usein linkki on yleinen TLD-linkki [IANA:n TLD-tietokannasta](https://www.iana.org/domains/root/db), mutta toisinaan se on TLD:n tätä toimintoa varten antama tarkempi linkki. Tällöin voit odottaa löytäväsi tietoa testatusta verkkotunnuksesta helposti.

Jos työskentelet TLD-rekisterissä ja haluat tarjota rekisteröijille paremman linkin, voit lukea [TLD URL Specification](https://doc.zonemaster.net/latest/configuration/tld-url-specification.html#txt-record) -määrityksestä, miten haluttu URL ilmoitetaan TXT-tietueella.

Jos TLD:n verkkosivustolle ei ole linkkiä, syynä voi olla TLD:n käytäntö tai Zonemaster-asennuksen käytäntö, joka estää linkin näyttämisen. Jos testattu verkkotunnus on juurivyöhyke tai TLD, esimerkiksi .net, linkkiä ei näytetä. Lisätietoja toiminnosta on [TLD URL Specification](https://doc.zonemaster.net/latest/configuration/tld-url-specification.html#txt-record) -määrityksessä.
