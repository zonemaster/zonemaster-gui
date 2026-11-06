---
question: Vad är TLD-informationslänken?
category: Använda Zonemaster
---

När ett test är klart visar Zonemaster vanligtvis en länk till webbplatsen för toppdomänen (TLD) för det testade domännamnet, till exempel `.net` om det testade domännamnet är zonemaster.net. Länken finns vid knappen `.net Info` (om .net är toppdomänen). Genom att följa länken går det vanligtvis att hitta användbar information om det testade domännamnet. Hur lätt informationen är att hitta beror på den aktuella toppdomänen. Ofta är länken en allmän länk för toppdomänen från [IANA:s databas över toppdomäner](https://www.iana.org/domains/root/db), men ibland är den en mer specifik länk som toppdomänen har angett för den här funktionen. I så fall kan du förvänta dig att enkelt hitta information om det testade domännamnet.

Om du arbetar för ett TLD-register och vill ge dina registranter en bättre länk kan du läsa i [TLD URL Specification](https://doc.zonemaster.net/latest/configuration/tld-url-specification.html#txt-record) hur du anger en TXT-post med den önskade URL:en.

Om det inte finns någon länk till toppdomänens webbplats kan det bero på toppdomänens policy eller policy för Zonemaster-installationen, som förhindrar att länken visas. Om det testade domännamnet är rotzonen eller en toppdomän, till exempel .net, visas ingen länk. Du kan läsa mer om funktionen i [TLD URL Specification](https://doc.zonemaster.net/latest/configuration/tld-url-specification.html#txt-record).
