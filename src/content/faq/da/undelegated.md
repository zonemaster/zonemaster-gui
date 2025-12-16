---
question: Hvad er en ikke-delegeret domænetest?
category: Brug af Zonemaster
---

En ikke-delegeret domænetest er en test, der udføres på et domænenavn, der måske er, eller måske ikke er, fuldt offentliggjort i DNS.

Dette kan være meget nyttigt, hvis man skal migrere sit domæne fra en registrator til en anden, for eksempel migrere zonen 'example.com' fra navneserveren 'ns.example.com' til navneserveren 'ns.example.org'. I dette scenarie kan man udføre en ikke-delegeret domænetest, der leverer zonen ('example.com') og navneserveren, man migrerer til ('ns.example.org'), før man migrerer sit domæne.

Når testresultaterne ikke viser nogen fejl eller advarsler, kan man være ret sikker på, at domænets nye placering fungerer godt. Der kan dog stadig være andre problemer i zonedataene selv, som denne test ikke er opmærksom på.
