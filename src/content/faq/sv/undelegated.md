---
question: Vad är ett odelegerat domäntest?
category: Använda Zonemaster
---

Ett odelegerat domännamnstest är ett test som utförs på ett domännamn som kanske, eller kanske inte, är fullt publicerat i DNS.

Detta kan vara mycket användbart om man ska flytta sitt domännamn från en registrar till en annan, till exempel flytta zonen 'example.com' från namnservern 'ns.example.com' till namnservern 'ns.example.org'. I detta scenario kan man utföra ett odelegerat domäntest genom att ange zonen ('example.com') och den namnserver man migrerar till ('ns.example.org') innan själva migreringen av domänen sker.

När testresultaten inte visar några fel eller varningar kan man vara relativt säker på att domänens nya placering fungerar väl. Det kan dock fortfarande finnas andra problem i zondatan som detta test inte känner till.
