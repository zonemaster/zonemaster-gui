---
question: Mitä tyyppisiä DNS-kyselyjä Zonemaster generoi?
category: Yleistä tietoa
---

Zonemaster lähettää useita DNS-kyselyjä nimipalvelimille, jotka isännöivät testattavaa verkkotunnusta, sekä niille nimipalvelimille, jotka isännöivät verkkotunnuksen ylävyöhykettä (parent zone).

Zonemasterin verkkokäyttöliittymä ei näytä lähetettyjä DNS-kyselyjä, vaan ainoastaan komentorivikäyttöliittymä (CLI) mahdollistaa niiden tarkastelun. Jos haluat nähdä yksittäiset kyselyt, sinun on asennettava paikallisesti toimiva Zonemaster-instanssi, jossa on sekä Engine- että CLI-komponentit. Lisätietoja löytyy [CLI-asennusdokumentista](https://github.com/zonemaster/zonemaster/blob/master/docs/public/installation/zonemaster-cli.md).
Vaihtoehtoisesti voit käyttää myös valmista [Docker-kuvaa](https://github.com/zonemaster/zonemaster/blob/master/docs/public/using/cli.md#Invoking-the-command-line-tool-using-Docker).

Lähetetyt DNS-kyselyt voidaan tulostaa käyttämällä 'DEBUG'-tasoa. Huomioithan, että CLI:n tuloste voi tällöin olla erittäin laaja. Lisätietoja on saatavilla [CLI-käyttöohjeista](https://github.com/zonemaster/zonemaster/blob/master/docs/public/using/cli.md).
