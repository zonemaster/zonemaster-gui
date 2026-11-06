---
question: Kateri vrsti DNS poizvedb generira Zonemaster?
category: Splošne informacije
---

Zonemaster pošlje več DNS poizvedb na imenske strežnike, ki gostijo domeno. ki se preverja, in tudi na imenske strežnike, ki gostijo nadrejeno cono domene, ki se preverja.

Vmesnik Zonemasterja ne prikazuje poizvedb, ki so bile poslane, le vmesnik CLI. Če želite videti takšne poizvedbe, boste morali lokalno namestiti delujočo instanco Zonemasterja z obema komponentama, engine in CLI. Poglejte [dokument o namestitvi CLI](https://doc.zonemaster.net/latest/installation/zonemaster-cli.html) za več informacij ali, če radje uporabite [Docker sliko](https://doc.zonemaster.net/latest/using/cli.html#Invoking-the-command-line-tool-using-Docker), je tudi na voljo.

Poizvedbe, ki so bile poslane, je mogoče prikazati z možnostjo 'DEBUG'. Opomba: izpisi lahko zelo obremenjujejo CLI. Za več informacij glejte [dokument o uporabi CLI](https://doc.zonemaster.net/latest/using/cli.html).
