---
question: Kuinka Zonemaster voi erottaa oikean ja väärän?
category: Yleistä tietoa
---

Zonemasterin arviointi perustuu ensisijaisesti DNS-standardeihin, jotka on määritelty RFC-dokumenteissa. Lisäksi arvioinnissa hyödynnetään DNS:n parhaita käytäntöjä (best practices), jotka voivat joissain tapauksissa olla vapaammin määriteltyjä kuin varsinaiset standardit.

Kaikki Zonemasterin testit on määritelty [Test Case Specification -dokumenteissa](https://github.com/zonemaster/zonemaster/tree/master/docs/public/specifications/tests#zonemaster-test-case-specifications), joissa on esitetty myös viittaukset kuhunkin testiin liittyviin standardidokumentteihin.

Viestiä _HUOMIO_, _VAROITUS_ ja _VIRHE_ koskevat kuvaukset löytyvät [Severity Level Definitions](https://github.com/zonemaster/zonemaster/blob/master/docs/public/specifications/tests/SeverityLevelDefinitions.md) -dokumentista.

Toisinaan standardien tulkinnat tai näkemykset parhaista käytännöistä voivat vaihdella, ja Zonemaster-tiimi ottaa aina mielellään vastaan palautetta. Jos epäilet, että analyysissa on tapahtunut virhe, voit lähettää meille sähköpostia osoitteeseen [zonemaster-users@lists.iis.se](mailto:zonemaster-users@lists.iis.se) (moderoitu postilista). Liitä viestiin linkki testitulokseesi sekä perustelu sille, miksi uskot tuloksen olevan virheellinen.
