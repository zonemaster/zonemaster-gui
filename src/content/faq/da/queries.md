---
question: Hvilken type DNS-forespørgsler genererer Zonemaster?
category: Generel information
---

Zonemaster sender flere DNS-forespørgsler til navneserverne, der værter det domænenavn, der testes, og også til navneserverne, der værter forældrezonen for det domænenavn.

Webgrænsefladen for Zonemaster viser ikke de forespørgsler, der blev sendt, kun CLI-grænsefladen gør det. Hvis du vil se sådanne forespørgsler, skal du installere en lokalt fungerende Zonemaster-instans med både Engine- og CLI-komponenterne. Se [CLI-installationsdokumentet](https://github.com/zonemaster/zonemaster/blob/master/docs/public/installation/zonemaster-cli.md) for mere information, eller hvis du foretrækker et [Docker-billede](https://github.com/zonemaster/zonemaster/blob/master/docs/public/using/cli.md#Invoking-the-command-line-tool-using-Docker) er også tilgængeligt.

De sendte forespørgsler kan vises ved hjælp af 'DEBUG'-niveauindstillingen. Advarsel, uddata fra CLI kan være ret omfattende. For mere information, se [CLI-brugsdokumentation](https://github.com/zonemaster/zonemaster/blob/master/docs/public/using/cli.md).
