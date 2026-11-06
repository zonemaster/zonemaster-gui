---
question: Kaj je povezava z informacijami o TLD?
category: Uporaba Zonemasterja
---

Ko je preizkus končan, Zonemaster običajno ponudi povezavo do spletnega mesta TLD-ja (vrhnje domene) preizkušenega domenskega imena, na primer `.net`, če je preizkušeno domensko ime zonemaster.net. Povezavo najdete pri gumbu `.net Info` (če je .net TLD). S povezavo je običajno mogoče najti uporabne informacije o preizkušenem domenskem imenu. Kako preprosto je najti informacije, je odvisno od zadevnega TLD-ja. Pogosto je povezava splošna povezava za TLD, ki jo najdete v [podatkovni zbirki TLD-jev IANA](https://www.iana.org/domains/root/db), včasih pa je bolj posebna povezava, ki jo je TLD zagotovil za to funkcijo. V tem primeru lahko pričakujete, da boste informacije o preizkušenem domenskem imenu našli zlahka.

Če prihajate iz registra TLD in želite svojim registrantom zagotoviti boljšo povezavo, lahko v [specifikaciji URL-ja za TLD](https://doc.zonemaster.net/latest/configuration/tld-url-specification.html#txt-record) preberete, kako z zapisom TXT določite želeni URL.

Če povezave do spletnega mesta TLD ni, je to lahko posledica pravilnika TLD-ja ali pravilnika namestitve Zonemaster, ki preprečuje prikaz povezave. Če je preizkušeno domensko ime korensko območje ali TLD, na primer .net, povezava ni prikazana. Za več podrobnosti o funkciji preberite [specifikacijo URL-ja za TLD](https://doc.zonemaster.net/latest/configuration/tld-url-specification.html#txt-record).
