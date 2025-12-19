---
question: Hvorfor kan mit domænenavn ikke testes?
category: Brug af Zonemaster
---

Der er flere muligheder.

* Dit domænenavn er endnu ikke delegeret.
* Dit domænenavn er ikke tilgængeligt fra det offentlige internet.
* Zonemaster kan kun teste, hvad der kaldes en DNS-zone, for eksempel 'zonemaster.net', og ikke værtsnavne, som 'www.zonemaster.net'.
* Der er en 10 minutters beskyttelse mellem på hinanden følgende tests for et givet domænenavn, med samme testparametre. At køre en test inden for dette vindue vil i stedet vise den seneste tilgængelige test for det domænenavn og parametre.
* Du har stavet dit domænenavn forkert.
