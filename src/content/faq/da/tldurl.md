---
question: Hvad er TLD-informationslinket?
category: Brug af Zonemaster
---

Når en test er gennemført, viser Zonemaster som regel et link til TLD'ets (topdomænets) websted for det testede domænenavn, f.eks. `.net`, hvis det testede domænenavn er zonemaster.net. Linket findes på knappen `.net Info` (hvis .net er TLD'et). Via linket vil det som regel være muligt at finde nyttige oplysninger om det testede domænenavn. Hvor let oplysningerne er at finde, afhænger af det pågældende TLD. Ofte er linket et generelt link til TLD'et fra [IANA's database over TLD'er](https://www.iana.org/domains/root/db), men nogle gange er det et mere specifikt link, som TLD'et har angivet til denne funktion. I så fald kan du forvente let at finde oplysninger om det testede domænenavn.

Hvis du kommer fra et TLD-register og vil give dine registranter et bedre link, kan du i [TLD URL Specification](https://doc.zonemaster.net/latest/configuration/tld-url-specification.html#txt-record) læse, hvordan du angiver en TXT-record med den foretrukne URL.

Hvis der ikke er et link til TLD'ets websted, kan det skyldes TLD'ets politik eller politikken for Zonemaster-installationen, som forhindrer, at linket vises. Hvis det testede domænenavn er rod-zonen eller et TLD, f.eks. .net, vises der ikke noget link. Du kan læse mere om funktionen i [TLD URL Specification](https://doc.zonemaster.net/latest/configuration/tld-url-specification.html#txt-record).
