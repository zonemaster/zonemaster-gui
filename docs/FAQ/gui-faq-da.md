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
12. [Hvad er en "ikke-delegeret" test?](#q12)
13. [Hvordan tester jeg en "reverse" zone med Zonemaster?](#q13)

Zonemaster
----------
<a name="q1"></a>
#### 1. Hvad er Zonemaster?
Zonemaster er et program designet til at hjælpe med at tjekke, måle
og forhåbentlig også forstå DNS (Domain Name System).

Zonemaster består af tre grundlæggende moduler:

  1. Motor (Koden der udfører alle DNS-tests),
  2. Kommandolinjeinterface (CLI),
  3. En server, der giver dig mulighed for at køre zonemaster-test og 
  gemme resultater ved hjælp af en JSON-RPC API,
  4. Webinterface.

Når et domænenavn (som eksempelvis zonemaster.dk) afleveres til Zonemaster (CLI eller
Webinterface) vil Zonemaster undersøge domænenavnets generelle sundhed på baggrund af
en serie test. De forskellige sundhedstjek foretaget af Zonemaster er dokumenteret i
[Test Requirements].

<a name="q2"></a>
#### 2. Hvem står bag Zonemaster?
Zonemaster er et fælles projekt mellem [AFNIC] (administrator af .fr samt mange andre TLD'er,
herunder .re, .pm, .tf, .yt og .paris) og [IIS] (administrator af .se og .nu).

<a name="q3"></a>
#### 3. Hvordan kan Zonemaster hjælpe mig?
Zonemaster er orienteret mod to forskellige brugere:

  - Brugere som ved hvordan DNS fungerer.
  - Brugere som gerne vil vide, om et givent domænenavn er konfigureret korrekt.

Den anden kategori kan med fordel kontakte deres DNS-udbyder med spørgsmål til
testresultater, der ikke "lyser grønt" på egne domænenavne.

<a name="q4"></a>
#### 4. Zonemaster rapporterer advarsler/fejl på mit domænenavn, hvad betyder det?
Det kommer an på hvilke advarsler/fejl, der rapporteres. I de fleste tilfælde kan
du trykke på den aktuelle "advarsler/fejl"-besked og få detaljerede
informationer om problemet.

<a name="q5"></a>
#### 5. Hvordan kan Zonemaster skelne mellem, hvad der er rigtigt og forkert?
Der er ikke nogen endegyldig dom over et domænenavns sundhed. Folkene bag Zonemaster påstår ikke,
at værktøjet er korrekt i ethvert aspekt. Sommetider er meninger forskellige, især mellem lande,
men nogle gange også lokalt. Vi har gjort vores bedste for at skabe en standard ([RFCs]).
for fundne fejl inden dette projekt. Forhåbentlig har vi sørget for et godt kompromis mellem,
hvad der er en egentlig potentielt farlige fejl, og hvad der blot ses som en meddelelse eller
advarsel. Den ekstra fordel ved værktøjet er, at man kan tilføje sin egen politik og bede
Zonemaster om at bruge denne politik til at afvikle tests.
Men som alle andre ting udvikler DNS sig også, og det er sandsynligt, at en advarsel kan blive
til en fejl på et senere tidspunkt. Hvis du mener, at Vi har lavet en fejl, så tøv ikke med at
sende os en e-mail på adressen [zonemaster-users@lists.iis.se] (moderated mailing list) med et
link til din test og en forklaring på, hvorfor du mener, at resultatet viser noget,
som du anser forkert.

<a name="q6"></a>
#### 6. Understøtter Zonemaster IPv6?
Ja. Som udgangspunkt vil Zonemaster forespørge navneservere over IPv4 og IPv6, medmindre andet
er konfigureret under "Valgmuligheder".

<a name="q7"></a>
#### 7. Understøtter Zonemaster DNSSEC?
Ja. Hvis DNSSEC er tilgængeligt på et domænenavn, vil det automtisk blive testet.

<a name="q8"></a>
#### 8. Hvad gør Zonemaster forkellig fra andre tilsvarende test-værktøjer?
Først og fremmest gemmer Zonemaster al historik fra tidligere tests, hvilket betyder, at du kan
gå tilbage til en tidligere test og sammenligne den med den test som du har udført for
et øjeblik siden.
For det andet vil Zonemaster også forsøge at forklare fejl eller advarsler på en sådan måde,
at ikke-teknikere også har en mulighed for at forstå årsagerne bag fejl/advarsler.
Der findes en "Avanceret" fane for teknikere, som ikke ønsker at bruge Zonemasters
standardinstilling "Simpel".
For det tredie kan Zonemaster udføre en såkaldt "ikke-delegeret" test af domænenavne
(mere om dette emne i [spørgsmål 12]).
Sidst, men ikke mindst, så er Zonemaster open source og opbygget af flere moduler, hvilket
betyder, at du kan bruge de dele, der er relevante i dit system. Det er sjældent, at du
ønsker den fulde installation, såfremt du eksempelvis blot ønsker at teste redelegeringer.

<a name="q9"></a>
#### 9. Zonemaster og privatliv
Da Zonemaster er tilgængelig for alle, er det muligt for hvem som helst at tjekke dit
domænenavn samt læse tidligere testresultater. Det er ikke muligt at se, hvem der
har udført de enkelte tests, da det udelukkende er tidspunktet for testen, der logges.

<a name="q10"></a>
#### 10. Hvorfor kan jeg ikke teste mit domænenavn?
Bortset fra den situation, hvor domænenavnet ikke eksisterer, findes der 2 andre muligheder:

  - For at beskytte motoren mod flere samtidige tests (den samme IP-adresse tester
    samme domænenavn flere gange), er der indlagt en forsinkelse på 5 minutter mellem
    identiske tests. Hvis du prøver at teste det samme domænenavn igen indenfor 5 minutter,
    vises det seneste resultat igen.

  - Da Zonemaster er bygget til at tjekke domænenavne (eksempelvis zonemaster.dk) og ikke
    værtsnavne (som www.zonemaster.dk) udfører Zonemasters webinterface et pre-tjek af dit
    domænenavn, før det sendes videre til test-motoren.

<a name="q11"></a>
#### 11. Hvilke typer af forespørgsler genererer Zonemaster?
Dette spørgsmål er meget svært at svare på, da Zonemaster genererer forskellige
forespørgsler afhængigt af de svar som den får fra navneserverne. Den eneste måde
at få et fuldt overblik over forespørgsler, er at afvikle kommandolinjeværktøjet
(CLI), der installeres som en separat pakke. Ved hjælp af kommandolinjeværktøjet
er det muligt at få indblik i samtlige forespørgsler, der sendes fra Zonemaster.
Bemærk venligst, at informationerne fra kommandolinjeværktøjet er meget tekniske,
og kræver en høj viden indenfor DNS.

<a name="q12"></a>
#### 12. Hvad er en "ikke-delegeret" test?
En "ikke-delegeret" test af et domænenavn betyder, at testen udføres på et
domænenavn, der måske eller måske ikke er offentliggjort i DNS. Dette kan være
ganske nyttigt, såfremt man ønsker at udskifte navneservere bag et domænenavn
(redelegering af domænenavnet), og ønsker at teste opsætningen af den nye zone
inden redelegering. Såfremt Zonemasters testresultat er "grønt", er der stor
sandsynlighed for, at de nye navneservere er konfigureret korrekt, og en
redelegering vil kunne udføres med succes.

<a name="q13"></a>
#### 13. Hvordan tester jeg en "reverse" zone med Zonemaster?
For at kontrollere en "reverse" zone med Zonemaster, skal man først vide,
hvad en "reverse" zone er. Hvis du vil kontrollere en "reverse" zone,
skal du indtaste den i det format, den har i DNS, f.eks.:

  - 3.2.1.in-addr.arpa
  - 6.0.1.0.0.2.ip6.arpa
  
[AFNIC]:                                 https://www.afnic.fr/en/
[Implemented Test Cases document]:       https://github.com/zonemaster/zonemaster/blob/master/docs/specifications/tests/ImplementedTestCases.md
[spørgsmål 12]:                          #q12
[RFCs]:                                  https://www.ietf.org/standards/rfcs/
[Severity Level Definitions document]:   https://github.com/zonemaster/zonemaster/blob/master/docs/specifications/tests/SeverityLevelDefinitions.md
[IIS]:                                   https://internetstiftelsen.se/en/
[Test Requirements]:                     https://github.com/zonemaster/zonemaster/blob/master/docs/requirements/TestRequirements.md
[zonemaster-users@lists.iis.se]:         mailto:zonemaster-users@lists.iis.se
