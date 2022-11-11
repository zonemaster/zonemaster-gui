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
13. [Kan jeg teste DS-poster innen de er publisert?](#q13)
14. [Hvordan kan jeg teste revers-soner med Zonemaster?](#q14)

Zonemaster
----------

<a name="q1"></a>
#### 1. Hva er Zonemaster?
Zonemaster er et verktøy for å overvåke, måle og forstå hvordan domenenavnsystemet (DNS) virker. Zonemaster består av flere deler:

  1. Motoren (kode som utfører testene).
  2. CLI - et kommandolinje-grensesnitt mot motoren.
  3. Backend - en tjener som kjører Zonemaster tester og lagrer resultater i en database.
  4. GUI - et webgrensesnitt mot Backend.

Når et domene, også kalt en sone, blir testet, vil verktøyet ta en helsesjekk på domenet ved å gå gjennom DNS fra rota (.) til toppnivået, for eksempel .no, og til slutt DNS-serverne som inneholder informasjon om det spesifikke domenet, for eksempel eksempel.no.

Zonemaster utfører også flere andre tester. Disse er dokumentert her, [Definierte tester].

Zonemaster kan teste både publiserte og upubliserte (ikke delegerte) domener.

<a name="q2"></a>
#### 2. Hvem har utviklet Zonemaster?
Verktøyet er utviklet i et samarbeid mellom registreringstjenestene
[AFNIC] (.fr TLD og flere andre TLDs, f.eks. .re, .pm, .tf, .wf, .yt og .paris) og
[Internetstiftelsen] (.se og .nu TLDs).

<a name="q3"></a>
#### 3. Hvem er verktøyet laget for?
Zonemaster er beregnet på profesjonelle brukere som vet hvordan DNS-protokollen fungerer. En vanlig domeneabonnent anbefales å kontakte sin domeneforhandler eller internettleverandør for å få tatt en helsesjekk på sine domener.

Zonemaster er basert på åpen kildekode og er modulær. Som bruker kan du gjenbruke deler av koden i dine egne systemer hvis du ønsker det.

<a name="q4"></a>
#### 4. Zonemaster returnerer "Error" eller "Warning" på mitt domene. Hva betyr det?
Det beror på hvilket test som gikk galt for domenet.
Hvert testsvar innholder informasjon om hva som gikk galt med testen.
Mer informasjon om hva som testes finnes i dokumentet [Definierte tester].

<a name="q5"></a>
#### 5. Hvordan avgjør Zonemaster hva som er rett eller feil?
Det er viktig å understreke at ingen kan gi en endelig uttalelse om helsen til et domene. Zonemaster er ikke alltid fullstendig korrekt, og resultatene kan gi rom for tolkning. De som står bak testen understreker at de har gjort sitt aller beste for å utvikle en best mulig policy for vurdering av ulike feil før de blir presentert for deg som bruker verktøyet. Denne policy er basert på DNS-standarder som er definiert i ulike [RFCs].
Alle tester er definiert i [Definierte tester]. Der er også alle referanser til forskjelling RFCer dokumentert.

Beskrivelse av de ulike nivåene på feilmeldinger, *notice*, *warning*, og *error*, er beskrevet i [Definisjoner av alvorlighetsgrad].

Hvis du syns at et testresultat er feil så oppfordrer vi til å sende en e-post til [zonemaster-users@lists.iis.se] (moderert e-postliste) med en lenke til testresultatet og forklar hvorfor du synes testen er feil.

<a name="q6"></a>
#### 6. Håndterer Zonemaster IPv6?
Ja, alle tester kjøres på både IPv4 og IPv6. Man kan endre på dette ved å slå på "Avansert sjekk".

<a name="q7"></a>
#### 7. Håndterer Zonemaster DNSSEC?
Ja, hvis DNSSEC er konfigurert for et domene blir det automatiskt testet av Zonemaster.

<a name="q8"></a>
#### 8. Hva er det for forskjell på Zonemaster og andre DNS-testverktøy?
For det første lagrer Zonemaster all historikk fra tidligere tester basert på det testede domenet. Det betyr at du kan gå tilbake til en test du gjorde for en uke siden og sammenligne den med testen du kjørte for et øyeblikk siden.

Alle tester som Zonemaster kjører er definert i test-spesifikasjoner som
er koblet til [Kravdokument for test](https://github.com/zonemaster/zonemaster/blob/master/docs/requirements/TestRequirements.md)

Zonemaster kan brukes til å teste udelegerte domener. Mer om udelegert
domener i [Spørsmål 12](#q12).

Zonemaster kan brukes til å teste DS-poster innen de er publisert i foreldresonen. Dette trengs da man skal slå på DNSSEC for en signert sone. Se [Spørsmål 13](#q13).

Til slutt ble denne open source-versjonen av Zonemaster bygget ved hjelp av modulkode som i utgangspunktet betyr at du kan bruke deler av den i systemene dine hvis du ønsker det. Det er ganske sjelden at du har et komplett program bare for å sjekke for eksempel omlegeringer.

<a name="q9"></a>
#### 9. Zonemaster og personvern
Zonemaster lagrer all historikk. Det betyr at du kan gå tilbake og se på en test du gjorde for en uke siden og sammenligne med en test du nettopp har gjort.

Zonemaster er tilgjengelig for alle, dermed er det også mulig for alle å teste ditt domene og også se testhistorikk for domenet. Det er imidlertid ingen som kan se hvem som har gjort en test. Det eneste som er logget, er tidspunktet da testen ble utført. Hverken IP-adresse eller informasjonskapsler (cookies) blir lagret.

<a name="q10"></a>
#### 10. Hvorfor kan jeg ikke teste mitt domene?
Det er flere muligheter:
  - Ditt domene er ikke delegert.
  - Ditt domene er ikke tilgjengelig fra internett.
  - Zonemaster kan bare sjekke domener eller DNS-soner, som zonemaster.net, og
    ikke vertsnavn i et domene (sone), som www.zonemaster.net.
  - Det er en periode på 10 minutter mellom hver gang man kan sjekke et domene med samme testparametere.
    His du prøver å teste det igjen innen 10 minutter vil det forrige resultatet vises i stedet.
  - Du har feilstavet ditt domene.

<a name="q11"></a>
#### 11. Hvilke typer spørringer genererer Zonemaster?
Zonemaster vil generere forskjellige typer spørringer avhengig av hvordan DNS-serverne svarer.

For å få en full visning av hvilke spørsmål og resultater som genereres, kan du kjøre CLI-grensesnittet og velg full utdata. For å kunne kjøre CLI-grensesnittet må du laste ned pakke og installer både CLI- og Engine-komponenten. Det finnes også en Docker image.
Resultatet fra CLI-verktøyet er ganske tungt teknisk så med mindre du er interessert i bit og byte, vil du kanskje hoppe over dette trinnet. For mer informasjon se [Bruk av CLI].

<a name="q12"></a>
#### 12. Hva er et udelegert test?
Du kan sjekke domener og navnetjenere som ikke er publisert i DNS, eller endringer av navnetjenere for et domene før endringen er publisert. Hvis testen er feilfri, kan du regne med at navnetjeneren vil svare på spørringer om domenet. Det kan imidlertid fortsatt være feil i soneinformasjonen som denne testen ikke kjenner til.

<a name="q13"></a>
#### 13. Kan jeg teste DS-poster innen de er publisert?
Ja, bruk valget "Avansert sjekk" for å kunne legge inn DS-poster du vil sjekke. Zonemaster bruker da de i steden for å hendte dem fra foreldresonen.

<a name="q14"></a>
#### 14. Hvordan kan jeg teste revers-soner med Zonemaster?
Et reversoppslag kan brukes til å finne ut hvilket domenenavn som er knyttet til en IP-adresse.

For en IPv4-adresse må du først finne nettverksadressen til systemet. Denne ender oftest med en 0 (null). Du sletter siste 0 (null), deretter endrer du rekkefølgen på sifrene du har mottatt og legger til suffikset in-addr.arpa. Du gjør det samme med en IPv6-adresse, men legger til suffikset ip6.arpa.

Eksempel 1 - reversoppslag for et IPv4-nett: Nettadressen er 194.98.30.0 og gir reversoppslagssonen 30.98.194.in-addr.arpa.

Eksempel 2 - reversoppslag for et IPv6-nett: Nettadressen er 2001:660:3003::0 og gir reversoppslagssonen 3.0.0.3.0.6.6.0.1.0.0.2.ip6.arpa.

[AFNIC]                                  https://www.afnic.fr/en/
[Definierte tester]:                     https://github.com/zonemaster/zonemaster/tree/master/docs/specifications/tests#list-of-defined-test-cases
[Spørsmål 12]:                         #q12
[Spørsmål 13]:                         #q13
[RFCs]:                                  https://www.ietf.org/standards/rfcs/
[Definisjoner av alvorlighetsgrad]:      https://github.com/zonemaster/zonemaster/blob/master/docs/specifications/tests/SeverityLevelDefinitions.md
[Internetstiftelsen]:                    https://internetstiftelsen.se/en/
[Bruk av CLI]:                           https://github.com/zonemaster/zonemaster-cli/blob/master/USING.md
[Zonemaster.net]:                        https://zonemaster.net/
[zonemaster-users@lists.iis.se]:         mailto:zonemaster-users@lists.iis.se
