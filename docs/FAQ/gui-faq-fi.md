Zonemaster
==========

1. [Mikä Zonemaster on?](#q1)
2. [Kuka on Zonemasterin takana?](#q2)
3. [Mitä hyötyä Zonemasterista on?](#q3)
4. [Zonemaster näyttää virheilmoitusta tai varoitusta, kun testaan verkkotunnustani. Mitä se tarkoittaa?](#q4)
5. [Miten Zonemaster selvittää, mikä on oikein ja mikä väärin määritetty?](#q5)
6. [Pystyykö Zonemaster käsittelemään IPv6:ta?](#q6)
7. [Pystyykö Zonemaster käsittelemään DNSSEC:iä?](#q7)
8. [Miten Zonemaster eroaa muista verkkotunnuksia testaavista ohjelmista?](#q8)
9. [Zonemaster ja yksityisyys](#q9)
10. [Miksen voi testata verkkotunnustani?](#q10)
11. [Millaisia DNS-kysymyksiä Zonemaster generoi?](#q11)
12. [Mikä on delegoimaton verkkotunnustesti?](#q12)
13. [Miten testaan käänteisnimipalvelun verkkotunnusta?](#q13)

Zonemaster
----------

#### 1. Mikä Zonemaster on? <a name="q1"></a>

Zonemaster on ohjelma, jonka tarkoitus on auttaa ihmisiä hallitsemaan ja mittaamaan DNS:ää (domain name system) ja toivottavasti myös ymmärtämään paremmin, miten se toimii. Zonemasteriin kuuluu kolme osaa:

1. "Engine" – testimoottori, jolla suoritetaan kaikki DNS-testit.
2. "CLI" – testimoottorin komentorajapinta.
3. "Backend" – palvelu, jonka avulla voit tehdä Zonemaster-testejä ja tallentaa tulokset JSON-RPC API:lla ja tietokannalla.
4. "Backendin" ja testimoottorin verkkorajapinta.

Kun verkkotunnus lähetetään Zonemasteriin, ohjelma tutkii verkkotunnuksen kunnon käymällä DNS:n läpi juuresta (.) ylätason verkkotunnukseen (esimerkiksi .NET) ja lopuksi DNS-palvelimiin, joissa on toisen asteen verkkotunnuksia (esimerkiksi zonemaster.net) koskeva informaatio. Zonemaster suorittaa myös muita testejä. Ne on kaikki dokumentoitu täällä: [Test Requirements document](https://github.com/zonemaster/zonemaster/blob/master/docs/requirements/TestRequirements.md)

#### 2. Kuka on Zonemasterin takana? <a name="q2"></a>

Zonemaster on yhteistyöprojekti, jonka takana ovat [Internetstiftelsen](https://internetstiftelsen.se/) (ylätason verkkotunnusten .se ja .nu hallinnoija) ja [AFNIC](https://www.afnic.fr/en/) (ylätason verkkotunnuksen .fr sekä muiden ylätason verkkotunnusten kuten .re, .pm, .tf, .wf, .yt ja .paris hallinnoija).

#### 3. Mitä hyötyä Zonemasterista on? <a name="q3"></a>

Zonemaster on kehitetty kahdenlaisia käyttäjiä varten:

  - DNS-taitoiset käyttäjät.
  - Käyttäjät, joiden tarvitsee vain tietää, onko heidän omistamissaan verkkotunnuksissa ongelmia vai ei.

Jälkimmäiseen ryhmään kuuluvien käyttäjien tulee kääntyä DNS-operaattorin puoleen, jos testissä jokin tulos ei näytä vihreää valoa.

#### 4. Zonemaster näyttää virheilmoitusta tai varoitusta, kun testaan verkkotunnustani. Mitä se tarkoittaa? <a name="q4"></a>

Riippuu siitä, mikä testi on kyseessä.

#### 5. Miten Zonemaster selvittää, mikä on oikein ja mikä väärin määritetty? <a name="q5"></a>

Kukaan ei voi antaa lopullista, kaikenkattavaa lausuntoa verkkotunnuksen kunnosta. Tämä on tärkeää pitää mielessä. Me Zonemasterin kehittäjät emme väitä, että Zonemaster on aina oikeassa. Joistakin asioista on olemassa erilaisia mielipiteitä varsinkin eri maissa mutta joskus myös paikallisella tasolla. Yhteistyöprojektissamme olemme pyrkineet yhdessä parhaamme mukaan kehittämään profiilin, jonka avulla erilaisia virheitä voidaan arvioida mahdollisimman tehokkaasti, ennen kuin työkalu esittää ne käyttäjälle.

Käyttäjänä voit helposti luoda oman profiilin, jonka avulla voit arvioida tiettyjen virheiden vakavuutta. Oman profiilin voi osoittaa suoraan CLI-työkalulla.

Koska DNS kuitenkin kehittyy koko ajan, tilanteet, jotka ovat normaaleja nyt, saattavat olla tulevaisuudessa vakavia virheitä. Jos uskot löytäneesi jotakin, jonka olemme arvioineet väärin, ota epäröimättä yhteyttä osoitteeseen [zonemaster-users@lists.iis.se](mailto:zonemaster-users@lists.iis.se) (moderated mailing list) ja lähetä linkki testiisi ja selitys siitä, miksi tulos ei ole mielestäsi oikein.

#### 6. Pystyykö Zonemaster käsittelemään IPv6:ta? <a name="q6"></a>

Pystyy. Kaikki IPv4:llä tehtävät testit voidaan tehdä myös IPv6:lla, jos Zonemaster on määritetty sitä varten.

#### 7. Pystyykö Zonemaster käsittelemään DNSSEC:iä? <a name="q7"></a>

Pystyy. Jos Zonemasterilla testattavalla verkkotunnuksella on käytössä DNSSEC, se testataan automaattisesti.

#### 8. Miten Zonemaster eroaa muista verkkotunnuksia testaavista ohjelmista? <a name="q8"></a>

Ensinnäkin Zonemaster tallentaa kaikki testitapahtumat. Niinpä voit palata katsomaan viikko sitten tekemäsi edellisen testin tuloksia ja verrata niitä uusimpiin.

Kaikki Zonemasterin tekemät testit määritellään testitapausspesifikaatioissa, joihin on linkki asiakirjassa "[Test Requirements document](https://github.com/zonemaster/zonemaster/blob/master/docs/requirements/TestRequirements.md)".

Zonemasterilla voi testata myös julkaisemattomia/delegoimattomia verkkotunnuksia (aiheesta enemmän [kysymyksessä 12](#q12)).

Lisäksi Zonemaster on avoimen lähdekoodin ohjelma, ja sen rakenne on modulaarinen. Voit siis halutessasi ottaa koko koodin tai osia siitä käyttöösi omissa järjestelmissäsi.

#### 9. Zonemaster ja yksityisyys <a name="q9"></a>

Koska Zonemaster on kaikkien käytössä, kuka tahansa voi myös tarkastaa verkkotunnuksesi ja myös nähdä verkkotunnuksesi testihistorian. Testien tekijää ei kuitenkaan ole mahdollista selvittää, sillä ainoa kirjattava tieto on testin ajankohta.

#### 10. Miksen voi testata verkkotunnustani? <a name="q10"></a>

Jos lähtöoletuksena on, että testattava verkkotunnus on olemassa, on kaksi mahdollista syytä siihen, ettei verkkotunnusta voi testata.

1. Samaa verkkotunnusta ei voi testata useita kertoja yhtä aikaa samasta IP-osoitteesta, joten identtisten testien välillä on oltava vähintään viiden minuutin tauko. Niinpä et voi testata verkkotunnusta useammin kuin viiden minuutin välein. Jos testaat verkkotunnuksen uudelleen ennen kuin viisi minuuttia on kulunut, näytetään viimeisin tallennettu tulos.
2. Koska Zonemaster on tarkoitettu testaamaan verkkotunnuksia merkityksessä DNS:n verkkoalue (esim. zonemaster.net) eikä verkkoalueiden isäntänimiä (esim. [www.zonemaster.net](http://www.zonemaster.net/)), se antaa virheilmoituksen, jos yrität testata tunnusta, joka ei vastaa DNS:n verkkoaluetta.

#### 11. Millaisia DNS-kysymyksiä Zonemaster generoi? <a name="q11"></a>

Tämä on hankala kysymys, sillä Zonemaster generoi erityyppisiä kutsuja DNS-palvelintesi vastausten perusteella.

Helpoiten pääset näkemään, mitä Zonemaster tarkkaan ottaen testaa, jos käytät "zonemaster-cli"-ohjelmaa eli CLI-ohjelmaa (joka sinun on ensin ladattava ja asennettava) ja valitset tulosten täyden tulostuksen. Ohjelman tulokset antavat tarkat tiedot siitä mitä testin aikana tapahtuu, mutta ne ovat teknisesti haastavia.

#### 12. Mikä on delegoimaton verkkotunnustesti? <a name="q12"></a>

Delegoimaton verkkotunnustesti tehdään verkkotunnukselle, jota ei tarvitse välttämättä olla julkaistu DNS:ssä. Se voi olla varsin hyödyllistä, jos aiot siirtää verkkotunnuksesi verkkotunnusvälittäjältä toiselle. Jos esimerkiksi verkkotunnus esimerkki.se aiotaan siirtää nimipalvelimelta &#39;ns.nic.se&#39; nimipalvelimelle &#39;ns.iis.se&#39;, voit tehdä verkkotunnukselle (esimerkki.se) delegoimattoman verkkotunnustestin sillä nimipalvelimella, johon aiot siirtää sen (ns.iis.se), ennen kuin toteutat siirron. Jos testi näyttää vihreää valoa, voit olla melko varma siitä, että verkkotunnuksesi uudessa kodissa on kaikki kunnossa. Verkkotunnuksen tiedoissa voi kuitenkin olla virheitä, joita testi ei löydä.

#### 13. Miten testaan käänteisnimipalvelun verkkotunnusta? <a name="q13"></a>

Jotta voisit testata käänteisverkkotunnuksen, sinun on tiedettävä, mikä verkkotunnus se on. Jos haluat testata käänteisverkkotunnuksen, syötä se DNS:ssä käytettävässä muodossa, esim.:

  - 3.2.1.in-addr.arpa
  - 6.0.1.0.0.2.ip6.arpa
