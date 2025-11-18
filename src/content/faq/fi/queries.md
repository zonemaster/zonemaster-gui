---
question: Mitä tyyppisiä DNS-kyselyjä Zonemaster generoi?
category: Yleistä tietoa
---

Zonemaster lähettää useita DNS-kyselyjä nimipalvelimille, jotka isännöivät testattavaa verkkotunnusta, sekä nimipalvelimille, jotka isännöivät sitä verkkotunnuksen vanhempaa vyöhykettä.

Zonemasterin verkkokäyttöliittymä ei näytä lähetettyjä kyselyjä, vain CLI-käyttöliittymä voi. Jos haluat nähdä tällaisia kyselyjä, sinun on paikallisesti asennettava toimiva Zonemaster-instanssi, jossa on sekä Engine- että CLI-komponentit. Katso lisätietoja [CLI-asennusdokumentista](https://github.com/zonemaster/zonemaster/blob/master/docs/public/installation/zonemaster-cli.md) tai jos haluat, myös [Docker-kuva](https://github.com/zonemaster/zonemaster/blob/master/docs/public/using/cli.md#Invoking-the-command-line-tool-using-Docker) on saatavilla.

Lähetetyt kyselyt voidaan näyttää käyttämällä 'DEBUG'-tasoa. Huomioithan, että CLI:n tuotos voi olla melko raskas. Lisätietoja katso [CLI-käyttöohjeista](https://github.com/zonemaster/zonemaster/blob/master/docs/public/using/cli.md).
