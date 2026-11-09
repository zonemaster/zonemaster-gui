---
question: Vilken typ av DNS-förfrågningar genererar Zonemaster?
category: Allmän information
---

Zonemaster skickar ett flertal DNS-förfrågningar till de namnservrar som är värdar för domännamnet som testas, samt till namnservrarna för moderzonen till det domännamnet.

Webbgränssnittet för Zonemaster visar inte vilka förfrågningar som skickats – det gör endast CLI-programmet. Om du vill se alla förfrågningar måste du installera en minimalt fungerande Zonemaster-instans lokalt med både Engine- och CLI-komponenterna. Se [CLI installation document](https://doc.zonemaster.net/latest/installation/zonemaster-cli.html) för mer information, eller använd ett [Docker-paket](https://doc.zonemaster.net/latest/using/cli.html#Invoking-the-command-line-tool-using-Docker) om du föredrar det.

Förfrågningar som skickas kan visas genom att använda alternativet nivå "DEBUG". Observera att utskriften från CLI kan bli ganska omfattande. För mer information, se [CLI usage documentation](https://doc.zonemaster.net/latest/using/cli.html).
