---
question: Vad skiljer Zonemaster från annan programvara för validering av DNS-zoner?
category: Generell information
---

* Zonemaster sparar all historik från tidigare tester baserat på det testade domännamnet, vilket innebär att du kan gå tillbaka till ett test du gjorde för en tid sedan och jämföra det med testet du körde alldeles nyss.
* Alla tester som Zonemaster kör är definierade i dokumenten för testfallspecifikationer som finns i [Test Case Specification documents](https://github.com/zonemaster/zonemaster/tree/master/docs/public/specifications/tests#zonemaster-test-case-specifications).
* Zonemaster kan användas för att testa [odelegerade domännamn](https://zonemaster.net/sv/faq#what-is-an-undelegated-domain-test).
* Zonemaster kan användas för att testa [DS-poster innan de publiceras i föräldrazonen](https://zonemaster.net/sv/faq#can-i-test-the-ds-records-before-they-are-published).
* Denna open source-version av Zonemaster är byggd med modulär kod, vilket i praktiken innebär att du kan integrera delar av den i dina egna system, om du vill. Det är till exempel ganska ovanligt att du skulle vilja ha ett komplett program enbart för att kontrollera redelegeringar.
