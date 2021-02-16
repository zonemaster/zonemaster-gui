Zonemaster
==========

1. [Hva er Zonemaster?](#q1)
2. [Hvem har utviklet Zonemaster?](#q2)
3. [Hvem er verktøyet laget for?](#q3)
4. [Zonemaster returnerer "Error" eller "Warning" på mitt domene. Hva betyr det?](#q4)
5. [Hvordan avgjør Zonemaster hva som er rett eller feil?](#q5)
6. [Håndterer Zonemaster IPv6?](#q6)
7. [Håndterer Zonemaster DNSSEC?](#q7)
8. [Hva er det for forskjell på Zonemaster og andre DNS-testverktøy?](#q8)
9. [Zonemaster og personvern](#q9)
10. [Hvorfor kan jeg ikke teste mitt domene?](#q10)
11. [Hvilke DNS-spørringer gjør Zonemaster?](#q11)
12. [Hva er et udelegert test?](#q12)
13. [Hvordan kan jeg teste revers-soner med Zonemaster?](#q13)

Zonemaster
----------

#### 1. Hva er Zonemaster? <a name="q1"></a>
Zonemaster er et verktøy for å overvåke, måle og forstå hvordan domenenavnsystemet (DNS) virker. Zonemaster består av fire hoveddeler:

  1. Motoren (kode som utfører testene)
  2. Et kommandolinje-grensesnitt mot motoren (CLI)
  3. Backend med JSON-API
  4. Webgrensesnittet

Når et domene, også kalt en sone, blir testet, vil verktøyet ta en helsesjekk på domenet ved å gå gjennom DNS fra rota (.) til toppnivået, for eksempel .no, og til slutt DNS-serverne som inneholder informasjon om det spesifikke domenet, for eksempel eksempel.no.

Zonemaster utfører også flere andre tester. Disse er dokumentert her, [Test Requirements document](https://github.com/zonemaster/zonemaster/blob/master/docs/requirements/TestRequirements.md).

Zonemaster kan teste både publiserte og upubliserte (ikke delegerte) domener.

#### 2. Hvem har utviklet Zonemaster? <a name="q2"></a>
Verktøyet er utviklet i et samarbeid mellom registreringstjenestene
[Afnic](https://www.afnic.fr/en/)
(.fr TLD og flere andre TLDs, f.eks. .re, .pm, .tf, .wf, .yt og .paris) og
[The Swedish Internet Foundation](https://internetstiftelsen.se/en/)
(.se og .nu TLDs).

#### 3. Hvem er verktøyet laget for? <a name="q3"></a>
Zonemaster er beregnet på profesjonelle brukere som vet hvordan DNS-protokollen fungerer. En vanlig domeneabonnent anbefales å kontakte sin domeneforhandler eller internettleverandør for å få tatt en helsesjekk på sine domener.

Zonemaster er basert på åpen kildekode og er modulær. Som bruker kan du gjenbruke deler av koden i dine egne systemer hvis du ønsker det.

#### 4. Zonemaster returnerer "Error" eller "Warning" på mitt domene. Hva betyr det? <a name="q4"></a>
Det beror på hvilket test som gikk galt for domenet.

#### 5. Hvordan avgjør Zonemaster hva som er rett eller feil? <a name="q5"></a>
Det er viktig å understreke at ingen kan gi en endelig uttalelse om helsen til et domene. Zonemaster er ikke alltid fullstendig korrekt, og resultatene kan gi rom for tolkning. De som står bak testen understreker at de har gjort sitt aller beste for å utvikle en best mulig policy for vurdering av ulike feil før de blir presentert for deg som bruker verktøyet.

Hvis du syns at et testresultat er feil så oppfordrer vi til å sende en e-post til zonemaster-devel@lists.iis.se med en lenke til testresultatet og forklar hvorfor du synes testen er feil.

#### 6. Håndterer Zonemaster IPv6? <a name="q6"></a>
Ja, alle tester kjøres på både IPv4 og IPv6.

#### 7. Håndterer Zonemaster DNSSEC? <a name="q7"></a>
Ja, hvis DNSSEC er konfigurert for et domene blir det automatiskt testet av Zonemaster.

#### 8. Hva er det for forskjell på Zonemaster og andre DNS-testverktøy? <a name="q8"></a>
For det første lagrer Zonemaster all historikk fra tidligere tester basert på det testede domenet. Det betyr at du kan gå tilbake til en test du gjorde for en uke siden og sammenligne den med testen du kjørte for et øyeblikk siden.

Alle tester som Zonemaster kjører er definert i test-spesifikasjoner som
er koblet til [Kravdokument for test] (https://github.com/zonemaster/zonemaster/blob/master/docs/requirements/TestRequirements.md)

Zonemaster kan brukes til å teste udelegerte domener. Mer om udelegert
domener i [Spørsmål 12] (# q12).

Til slutt ble denne open source-versjonen av Zonemaster bygget ved hjelp av modulkode som i utgangspunktet betyr at du kan bruke deler av den i systemene dine hvis du ønsker det. Det er ganske sjelden at du har et komplett program bare for å sjekke for eksempel omlegeringer.

#### 9. Zonemaster og personvern <a name="q9"></a>
Zonemaster lagrer all historikk. Det betyr at du kan gå tilbake og se på en test du gjorde for en uke siden og sammenligne med en test du nettopp har gjort.

Zonemaster er tilgjengelig for alle, dermed er det også mulig for alle å teste ditt domene og også se historikk for domenet. Det er imidlertid ingen som kan se hvem som har gjort en test. Det eneste som er logget, er tidspunktet da testen ble utført.

#### 10. Hvorfor kan jeg ikke teste mitt domene? <a name="q10"></a>
Hvis vi ser bort fra situasjonen der domenet ikke eksisterer er det to andre muligheter:
  - For å beskytte motoren mot flere identiske tester på samme domene fra en og
    samme IP-adresse er det en forsinkelse på 5 minutter mellom
    identiske påfølgende tester. Dette betyr at du bare kan teste
    samme domene en gang hvert 5. minutt, hvis du prøver å teste det igjen
    innen 5 minutter vil det forrige resultatet vises i stedet.
  - Fordi Zonemaster ble laget for å sjekke domener eller DNS-soner, som zonemaster.net, og
    ikke vertsnavn i et domene (sone), som www.zonemaster.net, vil Zonemaster gjøre det
    rapporter en feil hvis du prøver å teste et vertsnavn i stedet for et domene som samsvarer med en DNS-sone.

#### 11. What kind of queries does Zonemaster generate? <a name="q11"></a>
Zonemaster vil generere forskjellige typer spørringer avhengig av hvordan DNS-serverne svarer.

For å få en full visning av hvilke spørsmål og resultater som genereres, kan du kjøre CLI-grensesnittet og velg full utdata. For å kunne kjøre CLI-grensesnittet må du laste ned pakke og installer den.
Resultatet fra CLI-verktøyet er ganske tungt teknisk så med mindre du er interessert i bit og byte, vil du kanskje hoppe over dette trinnet.

#### 12. Hva er et udelegert test? <a name="q12"></a>
Du kan sjekke domener og navnetjenere som ikke er publisert i DNS, eller endringer av navnetjenere for et domene før endringen er publisert. Hvis testen er feilfri, kan du regne med at navnetjeneren vil svare på spørringer om domenet. Det kan imidlertid fortsatt være feil i soneinformasjonen som denne testen ikke kjenner til.

#### 13. Hvordan kan jeg teste revers-soner med Zonemaster? <a name="q13"></a>
Et reversoppslag kan brukes til å finne ut hvilket domenenavn som er knyttet til en IP-adresse.

For en IPv4-adresse må du først finne nettverksadressen til systemet. Denne ender oftest med en 0 (null). Du sletter siste 0 (null), deretter endrer du rekkefølgen på sifrene du har mottatt og legger til suffikset in-addr.arpa. Du gjør det samme med en IPv6-adresse, men legger til suffikset ip6.arpa.

Eksempel 1 - reversoppslag for et IPv4-nett:
Nettadressen er 194.98.30.0 og gir reversoppslagssonen 30.98.194.in-addr.arpa.

Eksempel 2 -reversoppslag for et IPv6-nett:
Nettadressen er 2001:660:3003::0 og gir reversoppslagssonen 3.0.0.3.0.6.6.0.1.0.0.2.ip6.arpa.
