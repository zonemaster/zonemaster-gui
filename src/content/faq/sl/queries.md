---
question: Kateri vrsti DNS poizvedb generira Zonemaster?
category: Splošne informacije
---

Zonemaster pošlje več DNS poizvedb na strežnike imen, ki gostijo preverjeno ime domene, in tudi na strežnike imen, ki gostijo nadzorno cono tiste domene.

Vmesnik Zonemasterja ne prikazuje poizvedb, ki so bile poslane, le vmesnik CLI. Če želite videti takšne poizvedbe, boste morali lokalno namestiti delujočo instanco Zonemasterja z obema komponentama, Motorjem in CLI. Poglejte [dokument o namestitvi CLI](https://github.com/zonemaster/zonemaster/blob/master/docs/public/installation/zonemaster-cli.md) za več informacij ali, če radje uporabite [Docker sliko](https://github.com/zonemaster/zonemaster/blob/master/docs/public/using/cli.md#Invoking-the-command-line-tool-using-Docker), je tudi na voljo.

Poizvedbe, ki so bile poslane, je mogoče prikazati z možnostjo 'DEBUG'. Opomba: izhod iz CLI lahko zelo obremenjuje. Za več informacij glejte [dokument o uporabi CLI](https://github.com/zonemaster/zonemaster/blob/master/docs/public/using/cli.md).
