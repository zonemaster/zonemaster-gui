---
question: Hvilke typer DNS-spørringer genererer Zonemaster?
category: Generell informasjon
---

Zonemaster sender flere DNS-spørringer til navnetjenere som vert for det testede domenenavnet og også til navnetjenere som vert for overordnet sone for det domenenavnet.

Webgrensesnittet til Zonemaster viser ikke de spørringene som ble sendt, bare CLI-grensesnittet kan. Hvis du vil se slike spørringer, må du installere en minimalt fungerende Zonemaster-instans lokalt med både Engine- og CLI-komponentene. Se [CLI-installasjonsdokumentet](https://doc.zonemaster.net/latest/installation/zonemaster-cli.html) for mer informasjon, eller hvis du foretrekker en [Docker-bilde](https://doc.zonemaster.net/latest/using/cli.html#Invoking-the-command-line-tool-using-Docker) er også tilgjengelig.

Sendte spørringer kan vises ved hjelp av 'DEBUG' nivåvalget. Advarsel, utdata fra CLI kan være ganske tung. For mer informasjon, se [CLI-brukerdokumentasjon](https://doc.zonemaster.net/latest/using/cli.html).
