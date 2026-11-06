---
question: Hva er TLD-informasjonslenken?
category: Bruk av Zonemaster
---

Når en test er fullført, vil Zonemaster vanligvis vise en lenke til nettstedet for TLD-et (toppnivådomenet) til domenenavnet som er testet, for eksempel `.net` hvis det testede domenenavnet er zonemaster.net. Lenken finnes på knappen `.net Info` (hvis .net er TLD-et). Ved å følge lenken vil det vanligvis være mulig å finne nyttig informasjon om det testede domenenavnet. Hvor enkelt det er å finne informasjonen, avhenger av det aktuelle TLD-et. Ofte er lenken en generell lenke for TLD-et fra [IANA-databasen over TLD-er](https://www.iana.org/domains/root/db), men noen ganger er den en mer spesifikk lenke som TLD-et har oppgitt for denne funksjonen. I så fall kan du forvente å finne informasjon om det testede domenenavnet enkelt.

Hvis du kommer fra et TLD-register og ønsker å gi registrantene dine en bedre lenke, kan du lese i [TLD URL Specification](https://doc.zonemaster.net/latest/configuration/tld-url-specification.html#txt-record) hvordan du oppgir en TXT-post med den foretrukne URL-en.

Hvis det ikke finnes en lenke til nettstedet for TLD-et, kan det skyldes TLD-ets retningslinjer eller retningslinjene for Zonemaster-installasjonen, som hindrer at lenken vises. Hvis det testede domenenavnet er rotsonen eller et TLD, for eksempel .net, vises ingen lenke. Du kan lese [TLD URL Specification](https://doc.zonemaster.net/latest/configuration/tld-url-specification.html#txt-record) for flere detaljer om funksjonen.
