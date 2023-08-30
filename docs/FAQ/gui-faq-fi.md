Zonemaster
==========

1. [Mikä Zonemaster on?](#q1)
2. [Kuka on Zonemasterin takana?](#q2)
3. [Mitä hyötyä Zonemasterista on minulle?](#q3)
4. [Zonemaster näyttää virheilmoitusta tai varoitusta, kun testaan verkkotunnustani. Mitä se tarkoittaa?](#q4)
5. [Miten Zonemaster selvittää, mikä on oikein ja mikä väärin määritetty?](#q5)
6. [Pystyykö Zonemaster käsittelemään IPv6:ta?](#q6)
7. [Pystyykö Zonemaster käsittelemään DNSSEC:iä?](#q7)
8. [Miten Zonemaster eroaa muista verkkotunnusten toimintaa testaavista ohjelmista?](#q8)
9. [Zonemaster ja yksityisyys](#q9)
10. [Miksi en voi testata verkkotunnustani?](#q10)
11. [Millaisia DNS kyselyitä Zonemaster generoi?](#q11)
12. [Mikä on delegoimattoman verkkotunnuksen testi?](#q12)
13. [Voinko testata DS-tietueet ennen niiden julkaisua?](#q13)
14. [Kuinka voin testata "käänteistä" (reverse) nimipalvelua Zonemasterilla?](#q14)

Zonemaster
----------

#### <span id="q1"></span>1. Mikä Zonemaster on?

Zonemaster on ohjelma, jonka tarkoitus on auttaa ihmisiä hallitsemaan ja mittaamaan DNS:ää (domain name system) ja toivottavasti myös ymmärtämään paremmin, miten se toimii. Zonemasteriin kuuluu kolme osaa:

1. "Engine" – testimoottori, jolla suoritetaan kaikki DNS-testit.
2. "CLI" – testimoottorin komentorajapinta.
3. "Backend" – palvelu, jonka avulla voit tehdä Zonemaster-testejä ja tallentaa tulokset JSON-RPC API:lla ja tietokannalla.
4. GUI - "Backendin" ja testimoottorin verkkorajapinta, graafinen käyttöliittymä.

Kun verkkotunnus lähetetään Zonemasteriin, ohjelma tutkii verkkotunnuksen kunnon käymällä DNS:n läpi juuresta (.) ylätason verkkotunnukseen (esimerkiksi .NET) ja lopuksi DNS-palvelimiin, joissa on toisen asteen verkkotunnuksia (esimerkiksi zonemaster.net) koskeva informaatio. Zonemaster suorittaa myös muita testejä. Ne on kaikki dokumentoitu täällä: [Test Requirements document]

#### <span id="q2"></span>2. Kuka on Zonemasterin takana?

Zonemaster on yhteistyöprojekti, jonka takana ovat [Internetstiftelsen] (ylätason verkkotunnusten .se ja .nu hallinnoija) ja [AFNIC] (ylätason verkkotunnuksen .fr sekä muiden ylätason verkkotunnusten kuten .re, .pm, .tf, .wf, .yt ja .paris hallinnoija).

#### <span id="q3"></span>3. Mitä hyötyä Zonemasterista on minulle?

Zonemaster on kehitetty kahdenlaisia käyttäjiä varten:

  - DNS-taitoiset käyttäjät.
  - Käyttäjät, joiden tarvitsee vain tietää, onko heidän omistamissaan verkkotunnuksissa ongelmia vai ei.

Jälkimmäiseen ryhmään kuuluvien käyttäjien tulee kääntyä DNS-operaattorin puoleen, jos testissä jokin tulos ei näytä vihreää valoa.

#### <span id="q4"></span>4. Zonemaster näyttää virheilmoitusta tai varoitusta, kun testaan verkkotunnustani. Mitä se tarkoittaa?

Riippuu siitä, mikä testi on kyseessä. Jokaiseen testiin liittyy yksi tai useampi viesti, jossa kuvataan löydetyt ongelmat.
Voit myös saada lisätietoa jokaisesta testistä [Määritetyt testitapaukset][Defined Test Cases]-dokumentista.

#### <span id="q5"></span>5. Miten Zonemaster selvittää, mikä on oikein ja mikä väärin määritetty?

Kukaan ei voi antaa lopullista, kaikenkattavaa lausuntoa verkkotunnuksen kunnosta. Tämä on tärkeää pitää mielessä. Me Zonemasterin kehittäjät emme väitä, että Zonemaster on aina oikeassa. Joistakin asioista on olemassa erilaisia mielipiteitä varsinkin eri maissa mutta joskus myös paikallisella tasolla. Yhteistyöprojektissamme olemme pyrkineet yhdessä parhaamme mukaan kehittämään profiilin, jonka avulla erilaisia virheitä voidaan arvioida mahdollisimman tehokkaasti, ennen kuin työkalu esittää ne käyttäjälle.
Käyttäjänä voit helposti luoda oman profiilin, jonka avulla voit arvioida tiettyjen virheiden vakavuutta. Oman profiilin voi osoittaa suoraan CLI-työkalulla.
Koska DNS kuitenkin kehittyy koko ajan, tilanteet, jotka ovat normaaleja nyt, saattavat olla tulevaisuudessa vakavia virheitä. Jos uskot löytäneesi jotakin, jonka olemme arvioineet väärin, ota epäröimättä yhteyttä osoitteeseen [zonemaster-users@lists.iis.se] (moderated mailing list) ja lähetä linkki testiisi ja selitys siitä, miksi tulos ei ole mielestäsi oikein.

#### <span id="q6"></span>6. Pystyykö Zonemaster käsittelemään IPv6:ta?

Pystyy. Kaikki IPv4:llä tehtävät testit voidaan tehdä myös IPv6:lla, ellei IPv6:tta ole erikseen kytketty pois käytöstä.

#### <span id="q7"></span>7. Pystyykö Zonemaster käsittelemään DNSSEC:iä?

Pystyy. Jos Zonemasterilla testattavalla verkkotunnuksella on käytössä DNSSEC, se testataan automaattisesti.

#### <span id="q8"></span>8. Miten Zonemaster eroaa muista verkkotunnusten toimintaa testaavista ohjelmista?

Ensinnäkin Zonemaster tallentaa kaikki testitapahtumat. Niinpä voit palata katsomaan viikko sitten tekemäsi edellisen testin tuloksia ja verrata niitä uusimpiin.

Kaikki Zonemasterin tekemät testit määritellään testitapausspesifikaatioissa, joihin on linkki asiakirjassa "[Test Requirements document]".
Zonemasterilla voi testata myös julkaisemattomia/delegoimattomia verkkotunnuksia (aiheesta enemmän [kysymyksessä 12][Question 12]).

Lisäksi Zonemaster on avoimen lähdekoodin ohjelma, ja sen rakenne on modulaarinen. Voit siis halutessasi ottaa koko koodin tai osia siitä käyttöösi omissa järjestelmissäsi.

#### <span id="q9"></span>9. Zonemaster ja yksityisyys

Koska Zonemaster on kaikkien käytössä, kuka tahansa voi myös tarkastaa verkkotunnuksesi ja myös nähdä verkkotunnuksesi testihistorian. Testien tekijää ei kuitenkaan ole mahdollista selvittää, sillä ainoa kirjattava tieto on testin ajankohta.
Tietokantaan ei tallenneta evästeitä tai tietoja käyttäjän IP-osoitteesta.

#### <span id="q10"></span>10. Miksi en voi testata verkkotunnustani?

On useita mahdollisia syitä siihen ettei verkkotunnusta voi testata:

- Kaikista yleisin syy on se että olet kirjoittanut verkkotunnuksen väärin.
- Verkkotunnustasi ei ole vielä delegoitu, verkkotunnus ei esimerkiksi löydy vielä fi-juuresta.
- Verkkotunnuksesi ei ole tavoitettavissa julkisesta Internetistä.
- Samaa verkkotunnusta ei voi testata useita kertoja yhtä aikaa samasta IP-osoitteesta, joten identtisten testien välillä on oltava vähintään viiden minuutin tauko. Niinpä et voi testata verkkotunnusta useammin kuin viiden minuutin välein. Jos testaat verkkotunnuksen uudelleen ennen kuin viisi minuuttia on kulunut, näytetään viimeisin tallennettu tulos.
- Koska Zonemaster on tarkoitettu testaamaan verkkotunnuksia merkityksessä DNS:n verkkoalue (esim. zonemaster.net) eikä verkkoalueiden isäntänimiä (esim. [www.zonemaster.net]), se antaa virheilmoituksen, jos yrität testata tunnusta, joka ei vastaa DNS:n verkkoaluetta.

#### <span id="q11"></span>11. Millaisia DNS-kyselyitä Zonemaster generoi?

Zonemaster lähettää useita DNS-kyselyitä verkkotunnuksen nimipalvelimille sekä juurinimipalvelimille.

Zonemasterin graafinen käyttöliittymä ei näytä lähetettyjä kyselyjä, vain CLI rajapinta voi näyttää lähetetyt kyselyt.
Jos haluat nähdä tällaisia kyselyitä, sinun on asennettava paikallisesti toimiva minimaalinen Zonemaster-instanssi, jossa on sekä Engine- että CLI-komponentit (saatavilla on myös Docker image).
Lähetetyt kyselyt voidaan näyttää käyttämällä 'DEBUG'-tason vaihtoehtoa. Varoituksena, tulokset voivat olla aika raskaita.  Lisätietoja on kohdassa [CLI:n käyttäminen].
Tätä vaihtoehtoa voi suositella vain teknisesti edistyneille käyttäjille.

#### <span id="q12"></span>12. Mikä on delegoimattoman verkkotunnuksen testi?

Delegoimaton verkkotunnustesti tehdään verkkotunnukselle, jota ei tarvitse välttämättä olla julkaistu DNS:ssä. Se voi olla varsin hyödyllistä, jos aiot siirtää verkkotunnuksesi verkkotunnusvälittäjältä toiselle.
Jos esimerkiksi verkkotunnus esimerkki.se aiotaan siirtää nimipalvelimelta &#39;ns.nic.se&#39; nimipalvelimelle &#39;ns.iis.se&#39;, voit tehdä verkkotunnukselle (esimerkki.se) delegoimattoman
verkkotunnustestin sillä nimipalvelimella, johon aiot siirtää sen (ns.iis.se), ennen kuin toteutat siirron. Jos testi näyttää vihreää valoa, voit olla melko varma siitä, että verkkotunnuksesi uudessa
kodissa on kaikki kunnossa. Verkkotunnuksen määrityksissä voi kuitenkin olla virheitä, joita testi ei löydä.

#### <span id="q13"></span>13. Voinko testata DS-tietueet ennen niiden julkaisua?

Kyllä voit.
Käytä "Valinnat" painiketta ja lisää Delegation Signer (DS) tietueet testattaviksi.
Zonemaster käsittelee lisättyjä DS-tietueita samalla tavoin kuin ne olis jo lisätty verkkotunnuksen nimipalvelimille.

#### <span id="q14"></span>14. Kuinka voin testata "käänteistä" (reverse) nimipalvelua Zonemasterilla?

Jotta voisit testata käänteisverkkotunnuksen (reverse zone), sinun on tiedettävä, mikä verkkotunnus se on. Jos haluat testata käänteisverkkotunnuksen, syötä se DNS:ssä käytettävässä muodossa, esim.:

  - 3.2.1.in-addr.arpa
  - 6.0.1.0.0.2.ip6.arpa

[AFNIC]:                                 https://www.afnic.fr/en/
[Defined Test Cases]:                    https://github.com/zonemaster/zonemaster/tree/master/docs/public/specifications/tests#list-of-defined-test-cases
[Internetstiftelsen]:                    https://internetstiftelsen.se/
[Question 12]:                           #q12
[Question 13]:                           #q13
[Severity Level Definitions]:            https://github.com/zonemaster/zonemaster/blob/master/docs/public/specifications/tests/SeverityLevelDefinitions.md
[Test Requirements document]:            https://github.com/zonemaster/zonemaster/blob/master/docs/requirements/TestRequirements.md
[zonemaster-users@lists.iis.se]:         mailto:zonemaster-users@lists.iis.se
[www.zonemaster.net]:                    https://www.zonemaster.net/
