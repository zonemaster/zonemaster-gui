---
question: Mitä on ei-delegoitu verkkotunnustesti?
category: Zonemasterin käyttö
---

Ei-delegoitu verkkotunnustesti tarkoittaa testiä, joka suoritetaan verkkotunnukselle, jota ei ole vielä delegoitu nimipalvelimille tai joka ei ole vielä täysin julkaistu DNS:ssä.

Tämä on erityisen hyödyllistä tilanteissa, joissa olet siirtämässä verkkotunnusta yhdeltä nimipalvelimelta toiselle. Esimerkiksi jos aiot siirtää vyöhykkeen 'example.com' nimipalvelimelta 'ns.example.com' nimipalvelimelle 'ns.example.org', voit suorittaa ei-delegoidun testin jo etukäteen syöttämällä vyöhykkeen ('example.com') ja tulevan nimipalvelimen ('ns.example.org') ennen varsinaista siirtoa.

Jos testin tulokset eivät sisällä virheitä tai varoituksia, voit olla melko varma siitä, että verkkotunnuksen uusi nimipalvelinympäristö toimii teknisesti oikein. On kuitenkin hyvä huomioida, että vyöhykkeen tiedoissa voi silti olla sellaisia ongelmia, joita tämä testi ei havaitse.
