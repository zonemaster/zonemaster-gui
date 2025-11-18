---
question: Hvilke typer DNS-spørringer genererer Zonemaster?
category: Generell informasjon
---

Zonemaster sender flere DNS-spørringer til navneservere som vert for det testede domenenavnet og også til navneservere som vert for overordnet sone for det domenenavnet.

Webgrensesnittet til Zonemaster viser ikke de spørringene som ble sendt, bare CLI-grensesnittet kan. Hvis du vil se slike spørringer, må du installere en minimalt fungerende Zonemaster-instans lokalt med både Engine- og CLI-komponentene. Se [CLI-installasjonsdokumentet](https://github.com/zonemaster/zonemaster/blob/master/docs/public/installation/zonemaster-cli.md) for mer informasjon, eller hvis du foretrekker en [Docker-bilde](https://github.com/zonemaster/zonemaster/blob/master/docs/public/using/cli.md#Invoking-the-command-line-tool-using-Docker) er også tilgjengelig.

Sendte spørringer kan vises ved hjelp av 'DEBUG' nivåvalget. Advarsel, utdata fra CLI kan være ganske tung. For mer informasjon, se [CLI-brukerdokumentasjon](https://github.com/zonemaster/zonemaster/blob/master/docs/public/using/cli.md).
