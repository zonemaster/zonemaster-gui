---
question: Miksi verkkotunnustani ei voi testata?
category: Zonemasterin käyttö
---

Tähän voi olla useita syitä.

* Verkkotunnustasi ei ole vielä delegoitu nimipalvelimille.
* Verkkotunnus ei ole saavutettavissa julkisesta internetistä.
*Zonemaster voi testata vain DNS-vyöhykkeitä (verkkotunnuksia), kuten 'zonemaster.net', eikä yksittäisiä isäntänimiä, kuten 'www.zonemaster.net'.
* Samoilla testiparametreilla tehtävien peräkkäisten testien välillä on 10 minuutin suoja-aika. Tänä aikana uusi testaus näyttää viimeisimmän kyseiselle verkkotunnukselle ja parametreille suoritetun testin tuloksen.
* Verkkotunnus on voitu kirjoittaa väärin.
