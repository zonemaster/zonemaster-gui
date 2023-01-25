Zonemaster
==========

1. [Vad är Zonemaster?](#q1)
2. [Vem står bakom Zonemaster?](#q2)
3. [Hur kan Zonemaster hjälpa till?](#q3)
4. [Zonemaster visar "Fel" eller "Varning" när jag testar min domän, vad betyder det?](#q4)
5. [Hur kan Zonemaster bedömma vad som är rätt och fel?](#q5)
6. [Kan Zonemaster hantera IPv6?](#q6)
7. [Kan Zonemaster kontrollera DNSSEC?](#q7)
8. [Vad skiljer Zonemaster från andra program som testar domäner?](#q8)
9. [Zonemaster och integritet](#q9)
10. [Varför kan jag inte testa min domän?](#q10)
11. [Vilken typ av DNS-frågor ställer Zonemaster?](#q11)
12. [Vad är ett odelegerat domäntest?](#q12)
13. [Går det att testa DS-poster innan de publiceras?](#q13)
14. [Hur kan jag testa en "baklängeszon" med Zonemaster?](#q14)


Zonemaster
----------

<a name="q1"></a>
#### 1. Vad är Zonemaster?
Zonemaster är ett program som är framtaget för att hjälpa användare att
kontrollera, mäta och förhoppningsvis också bättre förstå hur DNS, "Domain Name
System", fungerar.

Den består av flera delar:

1. *Engine* - ett testramverk med stöd för att utföra DNS-test.
2. *CLI* - ett kommandoradsgränssnitt till "Engine".
3. *Backend* - en tjänst som låter dig köra zonmastertest och spara resultat med
   hjälp av ett JSON-RPC-API och en databas.
4. *GUI* - ett Webbgränssnitt mot "backend".

När Zonemaster startar en test av ett domännamn, som "zonemaster.net" (genom
"CLI" eller "GUI") så kommer det att verifiera domännamnets allmänna tillstånd
med hjälp av en serie av test. Testen som utförs av Zonemaster finns listade i
dokumentet "[Defined Test Cases]" (*Definierade testfall*).

<a name="q2"></a>
#### 2. Vem står bakom Zonemaster?
Zonemaster är ett samarbetsprojekt mellan [Internetstiftelsen](https://internetstiftelsen.se/)
(registry för .se och .nu) och [AFNIC](https://www.afnic.fr/en/)
(registry för .fr och andra TLD:er som .re, .pm, .tf, .wf, .yt och .paris).

<a name="q3"></a>
#### 3. Hur kan Zonemaster hjälpa till?

Zonemaster är framtaget för två kategorier av användare:

  - Användare med kunskap om DNS-standarden.
  - Användare som bara vill veta om domäner som hen äger eller använder
    har några problem eller inte.

Användare av den andra kategorin bör vända sig till sin DNS-operatör
ifall det finns fel eller varningar för någon av testen av deras domännamn.

<a name="q4"></a>
#### 4. Zonemaster visar "Fel" eller "Varning" när jag testar min domän, vad betyder det?

Det beror på vilken test det gäller. Varje testfall kommer med ett eller flera
meddelanden som beskriver det problem som har funnits. Mera detaljer om varje
testfall kan hittas via dokumentet "[Defined Test Cases]"
(*Definierade testfall*).

<a name="q5"></a>
#### 5. Hur kan Zonemaster bedömma vad som är rätt och fel?
Zonemasters bedömning är i första hand baserat på DNS-standarden som den är
definierad i [RFC:er][RFCs] (text på engelska; det finns även en
[beskrivning av RFC i engelskspråkiga Wikipedia][Wikipedia#Engelska#RFC]).
Zonemaster baserar också sin bedömning på rekommenderade inställningar av DNS,
vilka är mera löst definierade. Alla zonemastertest är definierade och finns som
"[Test Case Specifications][Defined Test Cases]" (*testfallsspecifikationer*) i
vilka det återfinns referenser till dokument med relevant del av DNS-standarden.
En beskrivning av felnivåerna som används, som *notice* ("varsel"), *warning*
("varning") och *error* ("fel") finns i dokumentet "[Severity Level Definitions]"
(*Defintion av felnivåer*).

Ibland finns det olika tolkningar av standarden eller synpunkter på vad som är
den rekommenderade inställningen. Zonemastergruppen välkomnar alltid synpunkter
och kommentarer på detta. Om du tror du hittat något som du tycker att vi har
felbedömt, tveka inte att kontakta oss på
[zonemaster-users@lists.iis.se](mailto:zonemaster-users@lists.iis.se) (modererad
e-postlista) med en länk till ditt test och en förklaring av varför du anser att
resultatet inte är korrekt.

<a name="q6"></a>
#### 6. Kan Zonemaster hantera IPv6?

Ja. Zonemaster kommer att skicka DNS frågor till namnservrarna över både IPv4
och IPv6 om inte Zonemaster har konfigurerats på annat sätt. Under knappen
"alternativ" så går det att ställa in detta.

<a name="q7"></a>
#### 7. Kan Zonemaster kontrollera DNSSEC?

Ja. Om en domän som testas av Zonemaster har DNSSEC konfigurerat så kommer det testas automatiskt.

<a name="q8"></a>
#### 8. Vad skiljer Zonemaster från andra program som testar domäner?
För det första så sparar Zonemaster all testhistorik utifrån den testade
domänen, vilket innebär att man kan gå tillbaka till ett tidigare test och
jämföra med ett test som just har körts.

För det andra så är alla test som Zonemaster kör specificerade i
"[Test Case Specifications][Defined Test Cases]" (*testfallsspecifikationer*).

För det tredje så kan Zonemaster också testa icke-publicerade eller odelegerade
domäner (se [fråga 12][Question 12]).

För det fjärde så kan Zonemaster användas för att testa DS-posterna innan de
läggs in i moderzonen, vilket är nödvändigt för att aktivera DNSSEC för en
signerad zon (se [fråga 13][Question 13]).

Och till sist, Zonemaster är öppen källkod och är modulärt uppbyggt, vilket
betyder att man kan integrera delar av Zonemaster i sitt eget system om man
vill. Till exempel så är det ovanligt att man vill ha ett komplett program bara
för att kontrollera omdelegeringar.

<a name="q9"></a>
#### 9. Zonemaster och integritet
Eftersom [Zonemaster.net] är tillgänglig för vem som helst, så kan vem som helst
kontrollera din domän och se dess testhistorik. Å andra sidan så finns det inget
sett att ta reda på vem som har kört ett test eftersom det bara är testparametrar
och testresultat som sparas. Specifikt så sparas inga cookies eller annan
information om användarens IP-adress i databasen. Användaren som initierade
testet kan inte spåras från informationen i databasen.

<a name="q10"></a>
#### 10. Varför kan jag inte testa min domän?
Det kan finnas flera olika anledningar till detta:

- Domännamnet är ännu inte delegerat.
- Domännamnet är inte nåbart från det publika Internet.
- Zonemaster kan bara testa det som kallas DNS-zoner (t.ex. "zonemaster.net") och
  inte enskilda datornamn (t.ex. "www.zonemaster.net").
- Det finns ett skydd mot att start upprepade test på samma domännamn (och med
  samma testparametrar) oftare än var tionde minut. Om man försöker att starta
  ett test innan perioden har löpt ut så får man resultatet från föregående
  test för samma domännamn (och testparametrar).
- Domännamnet har stavats fel.

<a name="q11"></a>
#### 11. Vilken typ av DNS-frågor ställer Zonemaster?
Zonemaster skickar flera DNS-frågor till namnservrarna som är hostingservrar för
domänen som testas, men även till namnservrarna som är hostingservrar för den
överliggande zonen till domänen som testas.

Webbgränssnittet till Zonemaster visar inte vilka DNS-frågon som skickar. Det är
endast CLI-gränssnittet som kan visa det. Om man vill se DNS-frågorna så måste
man göra en lokal installation av både Zonemaster-Engine och Zonemaster-CLI,
alternativt installera den Docker-image som också finns tillgänglig. DNS-frågorna
kan visas genom att välja DEBUG-nivån "--level DEBUG". Det ska poängteras att det
blir mycket som visas från CLI-gränssnittet i det fallet. För mera information se
"[Using The CLI]" (*användardokumentet för CLI*).

<a name="q12"></a>
#### 12. Vad är ett odelegerat domäntest?
Ett odelegerat domäntest är ett test som genomförs på en domän som inte
nödvändigtvis är publicerad i DNS. Detta kan vara mycket användbart om man tänker
flytta sin domän från en registrar till en annan, t.ex. flytta "example.se" från
namnservern "ns1.example.com" till namnserver "dns2.example.net". I detta fall
skulle du kunna köra ett odelegerat domäntest på domänen ("example.se") med den
namnservern du ska flytta till ("dns2.example.net") innan du genomför själva
flytten. När resultatet på testet inte visare några fel ("error") eller varningar
("warning") så kan vara rätt säker på att domännamnets nya plats fungerar väl.
Det kan emellertid fortfarande finnas fel i zoninformationen som dessa test inte
känner till.

<a name="q13"></a>
#### 13. Går det att testa DS-poster innan de publiceras?
Ja. Använd kanppen "alternativ" och lägg sedan till DS-posterna ("Delegation
Signer") som ska testas. Zonemaster kommer att använda dessa på samma sätt som
de redan fanns i moderzonen.

<a name="q14"></a>
#### 14. Hur kan jag testa en "baklängeszon" med Zonemaster?
För att kunna kontrolla en "baklängeszon" (också kallad "reverszon" så måste man
veta vilken zon det är och testa det format det har i DNS. En baklängeszon får
man genom att vända IP-adressen och lägga på ett suffix. För IPv4-adresser
används suffixet "in-addr.arpa" medans för IPv6-adresser används "ip6.arpa".

Exempel:
  - För IPv4-prefix "198.51.100.0/24": 100.51.198.in-addr.arpa
  - För IPv6-prefix "2001:db8::/32": 8.b.d.0.1.0.0.2.ip6.arpa


[AFNIC]:                                 https://www.afnic.fr/en/
[Defined Test Cases]:                    https://github.com/zonemaster/zonemaster/tree/master/docs/specifications/tests#list-of-defined-test-cases
[Question 12]:                           #q12
[Question 13]:                           #q13
[RFCs]:                                  https://www.ietf.org/standards/rfcs/
[Severity Level Definitions]:            https://github.com/zonemaster/zonemaster/blob/master/docs/specifications/tests/SeverityLevelDefinitions.md
[The Swedish Internet Foundation]:       https://internetstiftelsen.se/en/
[Using The CLI]:                         https://github.com/zonemaster/zonemaster-cli/blob/master/USING.md
[Zonemaster.net]:                        https://zonemaster.net/
[zonemaster-users@lists.iis.se]:         mailto:zonemaster-users@lists.iis.se
[Wikipedia#Engelska#RFC]:                https://en.wikipedia.org/wiki/Request_for_Comments

