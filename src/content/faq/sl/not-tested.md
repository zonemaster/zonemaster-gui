---
question: Zakaj moja domena ne more biti preverjena?
category: Uporaba Zonemasterja
---

Obstajajo večje možnosti.

* Vaša domena še ni delegirana.
* Vaša domena ni dosegljiva iz javnega interneta.
* Zonemaster lahko preveri le tisto, kar je znano kot DNS zona, na primer 'zonemaster.net', in ne ime gostitelja, kot je 'www.zonemaster.net'.
* Obstaja 10-minutna zaščita med zaporednimi testi za določeno ime domene z istimi parametri testi. Izvajanje testa v tem času bo namesto tega prikazalo zadnji dostopni test za to ime domene in parametre.
* Ste napačno napisali ime domene.