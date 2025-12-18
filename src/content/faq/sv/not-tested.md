---
question: Varför kan mitt domännamn inte testas?
category: Använda Zonemaster
---

Det finns flera möjliga orsaker.

* Ditt domännamn är ännu inte delegerat.
* Ditt domännamn är inte nåbart från det publika Internet.
* Zonemaster kan endast testa det som kallas en DNS-zon, till exempel 'zonemaster.net', och inte ett värdnamn som 'www.zonemaster.net'.
* Det finns en spärr på 10 minuter mellan två test av ett visst domännamn med samma testparametrar. Om ett test körs inom det tidsfönstret visas istället det senaste tillgängliga testet för det domännamnet och parametrarna.
* Du har stavat fel på domännamnet.
