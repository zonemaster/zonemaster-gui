Zonemaster
==========

1. [Vad är Zonemaster?](#q1)
2. [Vem står bakom Zonemaster?](#q2)
3. [Hur kan Zonemaster hjälpa mig?](#q3)
4. [Zonemaster visar "Fel"/"Varning" när jag testar min domän, vad betyder det?](#q4)
5. [Hur kan Zonemaster bedömma vad som är rätt eller fel konfigurerat?](#q5)
6. [Kan Zonemaster hantera IPv6?](#q6)
7. [Kan Zonemaster hantera DNSSEC?](#q7)
8. [Vad skiljer Zonemaster från annan mjukvara som testar domäner?](#q8)
9. [Zonemaster och integritet](#q9)
10. [Varför kan jag inte testa min domän?](#q10)
11. [Vilken typ av DNS-frågor genererar Zonemaster?](#q11)
12. [Vad är ett odelegerat domäntest?](#q12)
13. [ Hur kan jag testa en domän som är en baklängesuppslagningsdomän?](#q13)

Zonemaster
----------

#### 1. Vad är Zonemaster? <a name="q1"></a>

Zonemaster är ett program som är framtaget för att hjälpa människor att kontrollera, mäta och förhoppningsvis också bättre förstå hur DNS, domain name system, fungerar. Zonemaster består av 3 huvuddelar: 
1. "Engine" - en testmotor som genomför alla DNS-tester. 
2. Kommandoradsgränssnitt (CLI) till testmotorn.
3. "Backend" - en tjänst som låter dig köra zonmastertester och spara resultat med ett JSON-RPC API och en databas.
4. Webbgränssnitt mot "backend" och testmotorn. 

När en domän (även kallad zon) skickas till Zonemaster så kommer programmet att undersöka domänens hälsotillstånd genom att gå igenom DNS från roten (.) till TLD:n (toppdomänen, till exempel .NET) och till slut de DNS-servrar som innehåller information om den specificerade domänen (till exempel zonemaster.net). Zonemaster utför även en hel del andra tester och alla dessa är dokumenterade här: [Test Requirements document](https://github.com/zonemaster/zonemaster/blob/master/docs/requirements/TestRequirements.md)

#### 2. Vem står bakom Zonemaster? <a name="q2"></a>

Zonemaster är ett samarbetsprojekt mellan [Internetstiftelsen](https://internetstiftelsen.se/)
(registry för .se och .nu)och [AFNIC](https://www.afnic.fr/en/)
(registry för .fr och andra TLD:er som .re, .pm, .tf, .wf, .yt and .paris).

#### 3. Hur kan Zonemaster hjälpa mig? <a name="q3"></a>

Zonemaster är framtaget för två kategorier av användare:

  - Användare med DNS-kunskap.
  - Användare som bara vill veta om domäner som hen äger eller använder
    har några problem eller inte.

Användare av den andra kategorin bör vända sig till sin DNS-operatör
så fort något inte lyser "grönt" vid en test.

#### 4. Zonemaster visar "Fel"/"Varning" när jag testar min domän, vad betyder det? <a name="q4"></a>

Det beror på vilket test det gäller.

#### 5. Hur kan Zonemaster bedömma vad som är rätt och fel? <a name="q5"></a>

Ingen kan ge ett definitivt, slutgiltigt utlåtande om en domäns hälsa. Detta är 
viktigt att poängtera. Vi som står bakom Zonemaster påstår inte 
att Zonemaster alltid har helt rätt. I vissa fall går åsikter isär, speciellt 
mellan olika länder, men ibland även lokalt. Vi har tillsammans inom samarbetsprojektet
gjort vårt allra bästa att ta fram en så bra som möjligt policy för hur dessa
olika fel bedöms innan de presenteras för dig som användare av verktyget.

En fördel för dig som användare är dock att det är enkelt att skapa en egen policy för hur
allvarliga vissa fel ska vara, via CLI-verktyget går det att direkt peka ut sin egen policy.

Men eftersom DNS utvecklas hela tiden kan situationer som idag bara kräver en 
varning räknas som allvarliga fel imorgon. Om du tror du hittat något som du tycker
vi felbedömt, tveka då inte att kontakta oss på zonemaster-devel@lists.iis.se med en 
länk till ditt test och en förklaring av varför du anser att resultatet inte är
korrekt. 

#### 6. Kan Zonemaster hantera IPv6? <a name="q6"></a>

Ja. Alla tester som körs över IPv4 kommer även köras över IPv6 om Zonemaster är konfigurerad att göra det.

#### 7. Kan Zonemaster hantera DNSSEC? <a name="q7"></a>

Ja. Om en domän som testas av Zonemaster har DNSSEC konfigurerat så kommer det testas automatiskt.

#### 8. Vad skiljer Zonemaster från annan mjukvara som testar domäner? <a name="q8"></a>
För det första så sparar Zonemaster all testhistoria. Det innebär att du kan gå tillbaka och titta på ett test du gjorde för en vecka sedan och jämföra det med ett test du nyss gjorde.

All test som Zonemaster kör är definierade i testfallsspecifikatione som
finns länkade från "[Test Requirements
document](https://github.com/zonemaster/zonemaster/blob/master/docs/requirements/TestRequirements.md)".

Zonemaster kan också testa icke-publiserade/odelegerade domäner (mer om detta i [fråga 12](#q12).

Zonemaster är dessutom öppen källkod och är modulärt uppbyggd. Du kan med andra ord återanvända
hela eller delar av koden i dina egna system om du vill.

#### 9. Zonemaster och integritet <a name="q9"></a>

Eftersom Zonemaster är tillgänglig för alla är det också möjligt för vem som helst att kontrollera din domän och också se testhistoria för din domän. Det finns dock inget sätt att se vem som har gjort ett test eftersom det enda som loggas är tidpunken då testet gjordes.

#### 10. Varför kan jag inte testa min domän? <a name="q10"></a>

Om vi utgår från att domänen du försöker testa faktiskt existerar så finns det två saker som kan orsaka detta:

1. För att förhindra att flera test görs samtidigt på samma zon från samma IP-adress finns det en påtvingad fördröjning på 5 minuter mellan identiska test. Detta innebär att du inte kan testa en domän oftare än var 5:e minut. Om du testar din domän igen innan 5 minuter förflutit så visas det senast sparade resultatet.

2. Eftersom Zonemaster är designad för att testa domäner (som zonemaster.net) och inte värdnamn i en domän
(som www.zonemaster.net) så kommer Zonemaster att rapportera det som ett misslyckande om man försöker
att testa ett domännamn som inte motsvarar en DNS-zon.

#### 11. Vilken typ av DNS-frågor genererar Zonemaster? <a name="q11"></a>

Det här är en svår fråga att svara på eftersom Zonemaster kommer att generera olika typer av anrop
beroende på hur dina DNS-servrar svarar.

Det enklaste sättet att se exakt vad Zonemaster testar är att köra ”zonemaster-cli”, CLI-kommandot
(och för att göra det så måste du ladda ner och installera det) och välja full utskrift.
Resultatet ger grundlig information om vad som händer under testet, men är också tekniskt utmanande.

#### 12. Vad är ett odelegerat domäntest? <a name="q12"></a>

Ett odelegerat domäntest är ett test som genomförs på en domän som kan (men inte måste) vara fullständigt publicerad i DNS. Detta kan vara mycket användbart om du tänker flytta din domän från en registrar till en annan. Låt oss ta som exempel att din domän example.se ska flyttas från namnservern ’ns.nic.se’ till namnservern ’ns.iis.se’. I detta fall skulle du kunna köra ett odelegerat domäntest på domänen (example.se) med den namnservern du ska flytta till (ns.iis.se) innan du genomför själva flytten. När testet visar grönt så kan du vara tämligen säker på att den nya hemvisten för din domän åtminstone vet att den ska svara på frågor om din domän. Det kan emellertid fortfarande finnas fel i zoninformationen som detta test inte känner till.

#### 13. Hur kan jag testa en domän som är en baklängesuppslagningsdomän? <a name="q13"></a>
För att kunna kontrolla en reverszon så måste du veta vilken den är. Om du vill kontrollera
en reverszon så matar du in det format som används i DNS, t.ex.:

  - 3.2.1.in-addr.arpa
  - 6.0.1.0.0.2.ip6.arpa

