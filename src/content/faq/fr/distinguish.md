---
question: Comment Zonemaster discerne-t-il le bon du mauvais ?
category: Informations générales
---

Le jugement de Zonemaster repose principalement sur les normes techniques du DNS telles qu'elles sont définies dans les RFC. Le jugement est également fondé sur les bonnes pratiques du DNS, dont la définition est plus souple.

Tous les tests de Zonemaster sont définis dans les [documents de spécifications de cas de test (en anglais)](https://github.com/zonemaster/zonemaster/tree/master/docs/public/specifications/tests#zonemaster-test-case-specifications), dans lesquels se trouvent les références aux documents normatifs pour chaque cas de test.

Les descriptions de niveaux de messages comme _NOTE_, _AVERTISSEMENT_ et _ERREUR_ se trouvent dans [le document de définition des niveaux de sévérités (en anglais)](https://github.com/zonemaster/zonemaster/blob/master/docs/public/specifications/tests/SeverityLevelDefinitions.md).

Parfois, les normes techniques ou les opinions de ce qui constitue une bonne pratique peuvent faire l'objet d'interprétations multiples ; l'équipe de Zonemaster est toujours ouverte aux commentaires. Si vous pensez que nous avons fait une erreur dans notre jugement, n'hésitez pas à nous envoyer un courriel à [zonemaster-users@lists.iis.se](mailto:zonemaster-users@lists.iis.se) (liste de diffusion modérée) avec un lien vers le résultat de votre test et en expliquant pourquoi vous pensez que Zonemaster affiche quelque chose que vous considérez comme incorrect.