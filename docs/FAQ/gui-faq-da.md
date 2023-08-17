Zonemaster
==========

1. [Hvad er Zonemaster?](#q1)
2. [Hvem står bag Zonemaster?](#q2)
3. [Hvordan kan Zonemaster hjælpe mig?](#q3)
4. [Zonemaster rapporterer advarsler/fejl på mit domænenavn, hvad betyder det?](#q4)
5. [Hvordan kan Zonemaster skelne mellem, hvad der er rigtigt og forkert?](#q5)
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
#### <span id="q1"></span>1. Hvad er Zonemaster?
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
[Defined Test Cases].

#### <span id="q2"></span>2. Hvem står bag Zonemaster?
Zonemaster er et fælles projekt mellem [AFNIC] (administrator af .fr samt mange andre TLD'er,
herunder .re, .pm, .tf, .yt og .paris) og [The Swedish Internet Foundation] (administrator af .se og .nu).

#### <span id="q3"></span>3. Hvordan kan Zonemaster hjælpe mig?
Zonemaster er orienteret mod to forskellige brugere:

  - Brugere som ved hvordan DNS fungerer.
  - Brugere som gerne vil vide, om et givent domænenavn er konfigureret korrekt.

Den anden kategori kan med fordel kontakte deres DNS-udbyder med spørgsmål til
testresultater, der ikke "lyser grønt" på egne domænenavne.

#### <span id="q4"></span>4. Zonemaster rapporterer advarsler/fejl på mit domænenavn, hvad betyder det?
Det kommer an på hvilke advarsler/fejl, der rapporteres.
Hver test er ledsaget af en eller flere meddelelser, der beskriver de fundne problemer.
Du kan også få yderligere indsigt om hver test fra dokumentet [Defined Test Cases]

#### <span id="q5"></span>5. Hvordan kan Zonemaster skelne mellem, hvad der er rigtigt og forkert?
Zonemasters vurdering er primært baseret på DNS-standarderne som defineret i [RFCs].
Den baserer også sin vurdering på DNS best practices, som kan defineres mere løst.
Alle Zonemaster-tests er defineret i [Test Case Specifications][Defined Test Cases]
hvori referencerne til standarddokumenterne for den pågældende testcase findes.

Beskrivelserne af meddelelsesniveauer såsom *notice*, *warning* og *error*  findes
i [Severity Level Definitions].

Nogle gange er der forskellige fortolkninger af standarderne eller meninger om, hvad der er bedste praksis,
og Zonemaster-teamet er altid åbent for input.
Hvis du mener, at vi har lavet en fejl i vores vurdering, så tøv ikke med at sende os en e-mail
på [zonemaster-users@lists.iis.se] (modereret mailingliste) med et link til dit testresultat
og en forklaring på, hvorfor du mener, det viser noget, som du anser for forkert.

#### <span id="q6"></span>6. Understøtter Zonemaster IPv6?
Ja. Som udgangspunkt vil Zonemaster forespørge navneservere over IPv4 og IPv6, medmindre andet
er konfigureret under "Valgmuligheder".

#### <span id="q7"></span>7. Understøtter Zonemaster DNSSEC?
Ja. Hvis DNSSEC er tilgængeligt på et domænenavn, vil det automtisk blive testet.

#### <span id="q8"></span>8. Hvad gør Zonemaster forkellig fra andre tilsvarende test-værktøjer?
For det første gemmer Zonemaster al historik fra tidligere test baseret på de testede
domænenavn, hvilket betyder, at du kan gå tilbage til en test, du lavede for noget tid siden, og sammenligne den
til den test, du kørte for et øjeblik siden.

For det andet er alle test, som Zonemaster kører, defineret i Test Case specifikationer
kan findes i dokumentet [Defined Test Cases].

For det tredje kan Zonemaster bruges til at teste ikke-delegerede domænenavne.
Se [spørgsmål 12].

For det fjerde kan Zonemaster bruges til at teste DS-records, før de offentliggøres i den overordnede zone
(som er påkrævet for at aktivere DNSSEC for en signeret zone).
Se [spørgsmål 13].

Endelig blev denne open source-version af Zonemaster bygget ved hjælp af modulær kode
hvilket i bund og grund betyder, at du kan integrere dele af det i dine egne systemer, hvis du ønsker det.
For eksempel er det ret sjældent, at du vil have et komplet program bare for at tjekke efter
redelegationer.

#### <span id="q9"></span>9. Zonemaster og privatliv
Da [Zonemaster.net] er åbent for alle, er det muligt for alle at tjekke dit
domæne og dets testhistorie.
Der er dog ingen måde at sige, hvem der har kørt en specifik test, da intet andet end testen
parametre og resultater gemmes.
Konkret gemmes ingen cookies eller oplysninger om brugerens IP-adresse i databasen.
Den bruger, der påbegyndte testen, kan ikke spores tilbage fra oplysningerne i databasen.

#### <span id="q10"></span>10. Hvorfor kan jeg ikke teste mit domænenavn?
Der er flere muligheder:

- Dit domænenavn er endnu ikke delegeret.
- Dit domænenavn er ikke tilgængeligt fra det offentlige internet.
- Zonemaster kan kun teste det, der kaldes en DNS-zone (f.eks. 'zonemaster.net') og ikke hostnavne (f.eks. 'www.zonemaster.net')
- Der er 10 minutters beskyttelse mellem på hinanden følgende tests for et givet domænenavn (med samme testparametre).
  Kørsel af en test i det vindue vil i stedet vise den sidste tilgængelige test for det pågældende domænenavn (og parametre).
- Du har stavet dit domænenavn forkert.

#### <span id="q11"></span>11. Hvilke typer af forespørgsler genererer Zonemaster?
Zonemaster sender flere DNS-forespørgsler til de navneservere, der hoster domænenavnet, der testes og
også til de navneservere, der er vært for det pågældende domænenavns overordnede zone.

Zonemasters GUI-grænseflade viser ingen sendte forespørgsler, det kan kun CLI-grænsefladen.
Hvis du vil se sådanne forespørgsler, skal du installere lokalt
en minimalt fungerende Zonemaster-instans med både Engine- og CLI-komponenterne (et Docker-image er også tilgængeligt).
Sendte forespørgsler kan vises ved at bruge indstillingen 'DEBUG' niveau.
Advarsel: Output fra CLI kan være ret omfattende.
For mere information se [Using The CLI].


#### <span id="q12"></span>12. Hvad er en "ikke-delegeret" test?
En "ikke-delegeret" test af et domænenavn betyder, at testen udføres på et
domænenavn, der måske eller måske ikke er offentliggjort i DNS. Dette kan være
ganske nyttigt, såfremt man ønsker at udskifte navneservere bag et domænenavn
(redelegering af domænenavnet), og ønsker at teste opsætningen af den nye zone
inden redelegering. Såfremt Zonemasters testresultat er "grønt", er der stor
sandsynlighed for, at de nye navneservere er konfigureret korrekt, og en
redelegering vil kunne udføres med succes.

#### <span id="q13"></span>13. Kan jeg test DS-records før de offentliggøres??
Ja.
Brug knappen "Valgmuligheder", og tilføj de DS-records, der skal testes.
Zonemaster vil derefter bruge dem på samme måde, som hvis de allerede var tilføjet i den overordnede zone.

#### <span id="q14"></span>14. Hvordan tester jeg en "reverse" zone med Zonemaster?
For at kontrollere en "reverse" zone med Zonemaster, skal man først vide,
hvad en "reverse" zone er. Hvis du vil kontrollere en "reverse" zone,
skal du indtaste den i det format, den har i DNS, f.eks.:

  - 3.2.1.in-addr.arpa
  - 6.0.1.0.0.2.ip6.arpa

[AFNIC]:                                 https://www.afnic.fr/en/
[Defined Test Cases]:                    https://github.com/zonemaster/zonemaster/tree/master/docs/public/specifications/tests#list-of-defined-test-cases
[spørgsmål 12]:                          #q12
[spørgsmål 13]:                          #q13
[RFCs]:                                  https://www.ietf.org/standards/rfcs/
[Severity Level Definitions]:            https://github.com/zonemaster/zonemaster/blob/master/docs/public/specifications/tests/SeverityLevelDefinitions.md
[The Swedish Internet Foundation]:       https://internetstiftelsen.se/en/
[Using The CLI]:                         https://github.com/zonemaster/zonemaster/blob/master/docs/public/using/cli.md
[Zonemaster.net]:                        https://zonemaster.net/
[zonemaster-users@lists.iis.se]:         mailto:zonemaster-users@lists.iis.se
