---
question: Zakaj moje ime domene ne more biti preverjeno?
category: Uporaba Zonemasterja
---

Obstajajo večje možnosti.

* Vaše ime domene še ni delegirano.
* Vaše ime domene ni dosegljivo iz javnega interneta.
* Zonemaster lahko preveri le tisto, kar je znano kot DNS zona, na primer 'zonemaster.net', in ne ime gostitelja, kot je 'www.zonemaster.net'.
* Obstaja 10-minutna zaščita med zaporednimi testi za določeno ime domene z istimi parametri testi. Izvajanje testa v tem času bo namesto tega prikazalo zadnji dostopni test za to ime domene in parametre.
* Ste napačno napisali svoje ime domene.