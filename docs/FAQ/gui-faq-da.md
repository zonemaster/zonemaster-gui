Zonemaster
==========

1. [Hvad er Zonemaster?](#q1)
2. [Hvem står bag Zonemaster?](#q2)
3. [Hvordan kan Zonemaster hjælpe mig?](#q3)
4. [Zonemaster rapporterer advarsler/fejl på mit domænenavn, hvad betyder det?](#q4)
5. [Hvordan kan Zonemaster afgøre hvad der er rigtigt og forkert?](#q5)
6. [Understøtter Zonemaster IPv6?](#q6)
7. [Understøtter Zonemaster DNSSEC?](#q7) 
8. [Hvad gør Zonemaster forkellig fra andre tilsvarende test-værktøjer?](#q8)
9. [Zonemaster og privatliv](#q9)
10. [Hvorfor kan jeg ikke teste mit domænenavn?](#q10)
11. [Hvilke typer af forespørgsler genererer Zonemaster?](#q11)
12. [Hvad er en "ikke-delegeret" test?](#undelegated)
13. [Hvordan tester jeg en "reverse" zone med Zonemaster?](#q13)

Zonemaster
----------
#### 1. Hvad er Zonemaster? <a name="q1"></a>
Zonemaster er et program, der er designet til at hjælpe med at tjekke, måle
og forhåbentlig også forstå DNS (Domain Name System).

Zonemaster består af tre grundlæggende moduler:

  - Motor (Koden der udfører alle DNS-tests)
  - Kommandolinjeinterface (CLI)
  - Webinterface 

Når et domænenavn (som eksempelvis "zonemaster.dk") afleveres til Zonemaster (CLI eller
Webinterface) vil Zonemaster undersøge domænenavnets generelle sundhed ved at gennemløbe
DNS fra roden (.) til TLD (Top Level Domæne, eksempelvis .dk) og navneservere, der indeholder
informationer om det specifikke domænenavn ("zonemaster.dk"). De forskellige sundhedstjek
foretaget af Zonemaster er dokumenteret i [Test Requirements document](https://github.com/dotse/zonemaster/blob/master/docs/requirements/TestRequirements.md)

#### 2. Hvem står bag Zonemaster? <a name="q2"></a>
Zonemaster er et fælles projekt mellem IIS (administrator af .se og .nu) og Afnic
(administrator af .fr samt oversøiske territorier som tilhører Frankrig).

#### 3. Hvordan kan Zonemaster hjælpe mig? <a name="q3"></a>
Zonemaster er orienteret mod to forskellige typer mennesker:

  - Mennesker som ved hvordan DNS fungerer og
  - Mennesker som gerne vil vide, om et givent domænenavn er konfigureret korrekt.

Den anden kategori kan med fordel kontakte den første kategori med spørgsmål til
resultater af testen (konfigurationen).

#### 4. Zonemaster rapporterer advarsler/fejl på mit domænenavn, hvad betyder det? <a name="q4"></a>
Det kommer naturligvis an på hvilke advarsler/fejl, der rapporteres. I de fleste
tilfælde kan du trykke på den aktuelle "advarsler/fejl"-besked og få detaljerede
informationer om problemet.

#### 5. Hvordan kan Zonemaster afgøre hvad der er rigtigt og forkert? <a name="q5"></a>
Der er ikke nogen endegyldig dom over et domænenavns sundhed. Folkene bag Zonemaster påstår ikke,
at værktøjet er korrekt i ethvert aspekt. Sommetider er meninger forskellige, især mellem lande,
men nogle gange også lokalt. Vi har gjort vores bedste for at skabe en standard (politik)
for fundne fejl inden dette projekt. Forhåbentlig har vi sørget for et godt kompromis mellem,
hvad der er en egentlig potentielt farlige fejl, og hvad der blot ses som en meddelelse eller
advarsel. Den ekstra fordel ved værktøjet er, at man kan tilføje sin egen politik og bede
Zonemaster om at bruge denne politik til at afvikle tests.
Men som alle andre ting udvikler DNS sig også, og det er sandsynligt, at en advarsel kan blive
til en fejl på et senere tidspunkt. Hvis du mener, at Vi har lavet en fejl, så tøv ikke med at
sende os en e-mail på adressen zonemaster-devel@lists.iis.se med et link til din test
og en forklaring på, hvorfor du mener, at resultatet viser noget, som du anser forkert.

#### 6. Understøtter Zonemaster IPv6? <a name="q6"></a>
Ja, den gør. Alle tests over IPv4 bliver også udført over IPv6, hvis Zonemaster
er konfigureret til at gøre det.

#### 7. Understøtter Zonemaster DNSSEC? <a name="q7"></a>
Ja. Hvis DNSSEC er tilgængeligt på et domænenavn, vil det automtisk blive testet.

#### 8. Hvad gør Zonemaster forkellig fra andre tilsvarende test-værktøjer? <a name="q8"></a>
Først og fremmest gemmer Zonemaster al historik fra tidligere tests, hvilket betyder, at du kan
gå tilbage til en tidligere test og sammenligne den med den test som du har udført for
et øjeblik siden.
Zonemaster vil også forsøge at forklare fejl eller advarsler på en sådan måde, at ikke-teknikere
også har en mulighed for at forstå årsagerne bag fejl/advarsler.
Der findes en "Avanceret" fane for teknikere, som ikke ønsker at bruge Zonemasters
standardinstilling "Simpel".
Zonemaster kan desuden udføre en såkaldt "ikke-delegeret" test af domænenavne (mere om dette
emne i spørgsmål 12).
Sidst, men ikke mindst, så er Zonemaster open source og opbygget af flere moduler, hvilket
betyder, at du kan bruge de dele, der er relevante i dit system. Det er sjældent, at du
ønsker den fulde installation, såfremt du eksempelvis blot ønsker at teste redelegeringer.

#### 9. Zonemaster og privatliv <a name="q9"></a>
Da Zonemaster er tilgængelig for allei, er det muligt for hvem som helst at tjekke dit
domænenavn samt læse tidligere testresultater. Men det er ikke muligt at se, hvem der
har udført de enkelte tests, da det udelukkende er tidspunktet for testen, der logges.

#### 10. Hvorfor kan jeg ikke teste mit domænenavn? <a name="q10"></a>
Bortset fra den situation, hvor domænenavnet ikke eksisterer, findes der 2 andre muligheder:

  - For at beskytte motoren mod flere samtidige tests (den samme IP-adresse tester
    samme domænenavn flere gange), er der indlagt en forsinkelse på 5 minutter mellem
    identiske tests. Hvis du prøver at teste det samme domænenavn igen indenfor 5 minutter,
    vises det seneste resultat igen.

  - Da Zonemaster er bygget til at tjekke domænenavne (eksempelvis zonemaster.dk) og ikke
    værtsnavne (som www.zonemaster.dk) udfører Zonemasters webinterface et pre-tjek af dit
    domænenavn, før det sendes videre til test-motoren.

Disse 2 grunde bør ikke påvirke størstedelen af domænenavne, men de kan gøre det. Såfremt
Zonemasters webinterface beslutter, at et domænenavn ikke eksisterer, vil domænenavnet
ikke blive testet. Dette sker heldigvis sjældent, og er indtil videre kun observeret i
tilfælde, hvor alle domænenavnets navneservere er registreret under domænenavnet, og disse
navneservere er ustabile.

#### 11. Hvilke typer af forespørgsler genererer Zonemaster? <a name="q11"></a>
Dette spørgsmål er meget svært at svare på, da Zonemaster genererer forskellige
forespørgsler afhængigt af de svar som den får fra navneserverne. Den eneste måde
at få et fuldt overblik over forespørgsler, er at afvikle kommandolinjeværktøjet
(CLI), der installeres som en separat pakke. Ved hjælp af kommandolinjeværktøjet
er det muligt at få indblik i samtlige forespørgsler, der sendes fra Zonemaster.
Bemærk venligst, at informationerne fra kommandolinjeværktøjet er meget tekniske,
og kræver en høj viden indenfor DNS.

#### 12. Hvad er en "ikke-delegeret" test? <a name="undelegated"></a>
En "ikke-delegeret" test af et domænenavn betyder, at testen udføres på et
domænenavn, der måske eller måske ikke er offentliggjort i DNS. Dette kan være
ganske nyttigt, såfremt man ønsker at udskifte navneservere bag et domænenavn
(redelegering af domænenavnet), og ønsker at teste opsætningen af den nye zone
inden redelegering. Såfremt Zonemasters testresultat er "grønt", er der stor
sandsynlighed for, at de nye navneservere er konfigureret korrekt, og en
redelegering vil kunne udføres med succes.

#### 13. Hvordan tester jeg en "reverse" zone med Zonemaster? <a name="q13"></a>
For at teste en "reverse" zone med Zonemaster, skal man kende netværksadressen
(IPv4 eller IPv6) samt netmasken bag netværket.

For IPv4:
  - Hvis netmasken er /24, og netværksadressen eksempelvis er 1.2.3.0 fjernes
    det sidste 0 (nul), resten "vendes om" og et suffiks ("in-addr.arpa") tilføjes.
    Resultatet er "3.2.1.in-addr.arpa".
  - Hvis netmasken er mindre end /24 såsom /28, og netværksadressen eksempelvis
    er "1.2.3.4", udledes den zone ("reverse zone") som skal testes ved at
    "vende" IP-adressen om og tilføje samme suffiks som tidligere ("in-addr.arpa").
    Resultatet er "4.3.2.1.in-addr.arpa".

Resultatet kan herefter indtastes under "Domænenavn" i Zonemaster og testes.

For IPv6:
  - Vend IPv6-adressen om og tilføj suffiks "ip6.arpa".
  - Brug for eksempel værktøjet "dig" til at "vende" IPv6-adressen om.
    Eksempel: "dig -x 2a01:630:0:80::53". Kopier herefter resultatet fra
    "AUTHORITY SECTION" til Zonemaster. I eksemplet er det
    "0.0.0.0.0.3.6.0.1.0.a.2.ip6.arpa".

Resultatet kan herefter indtastes under "Domænenavn" i Zonemaster og testes.
