---
question: Hva er Zonemaster?
category: Generell informasjon
---

Zonemaster er et programvarepakke som validerer kvaliteten på en DNS-delegering.

Ambisjonen til Zonemaster-prosjektet er å utvikle og vedlikeholde et åpent kildekode DNS-valideringsverktøy, som tilbyr forbedret ytelse sammenlignet med eksisterende verktøy og gir omfattende dokumentasjon som kan gjenbrukes av lignende prosjekter i fremtiden.

Zonemaster består av flere moduler eller komponenter:

- Engine, et testrammeverk som støtter all funksjonalitet for å utføre DNS-tester;
- CLI, et kommandolinjesnitt til Engine;
- Backend, en server som lar deg kjøre Zonemaster-tester og lagre resultater ved hjelp av en JSON-RPC API og en database;
- GUI, et webgrensesnitt til Backend.

Komponentene vil hjelpe forskjellige typer brukere til å sjekke en domenes navneservere for konfigurasjonsfeil og generere en rapport som vil hjelpe til med å rette opp feilene.
