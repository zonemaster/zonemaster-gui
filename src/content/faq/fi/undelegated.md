---
question: Mitä on ei-delegoitu verkkotunnustesti?
category: Zonemasterin käyttö
---

Ei-delegoitu verkkotunnustesti on testi, joka suoritetaan verkkotunnukselle, joka voi olla tai ei ole täysin julkaistu DNS:ssä.

Tämä voi olla erittäin hyödyllistä, jos aiot siirtää verkkotunnuksesi yhdestä rekisteröijästä toiseen, esimerkiksi siirtää vyöhyke 'example.com' nimipalvelimelta 'ns.example.com' nimipalvelimelle 'ns.example.org'. Tässä tilanteessa voit suorittaa ei-delegoidun verkkotunnustestin antamalla vyöhykkeen ('example.com') ja nimipalvelimen, johon siirryt ('ns.example.org'), ennen kuin siirrät verkkotunnuksesi.

Kun testin tulokset eivät näytä virheitä tai varoituksia, voit olla melko varma, että verkkotunnuksen uusi sijainti toimii hyvin. Kuitenkin vyöhykkeen tietoihin saattaa silti olla muita ongelmia, joista tämä testi ei ole tietoinen.
