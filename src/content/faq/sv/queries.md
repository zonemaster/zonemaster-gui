---
question: Vilken typ av DNS-förfrågningar genererar Zonemaster?
category: Generell information
---

Zonemaster skickar flera DNS-förfrågningar till namnservrarna som är värdar för det domännamn som testas, samt till namnservrarna för föräldrazonen till det domännamnet.

Webbgränssnittet för Zonemaster visar inte vilka förfrågningar som skickats – det gör endast CLI-gränssnittet. Om du vill se dessa förfrågningar måste du installera en minimalt fungerande Zonemaster-instans lokalt med både Engine- och CLI-komponenterna. Se [CLI installation document](https://github.com/zonemaster/zonemaster/blob/master/docs/public/installation/zonemaster-cli.md) för mer information, eller använd en [Docker image](https://github.com/zonemaster/zonemaster/blob/master/docs/public/using/cli.md#Invoking-the-command-line-tool-using-Docker) om du föredrar det.

Förfrågningar som skickas kan visas genom att använda alternativet 'DEBUG'-nivå. Varning – utskriften från CLI kan bli ganska omfattande. För mer information, se [CLI usage documentation](https://github.com/zonemaster/zonemaster/blob/master/docs/public/using/cli.md).
