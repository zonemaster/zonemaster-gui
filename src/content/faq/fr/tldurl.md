---
question: Qu’est-ce que le lien d’information sur le TLD ?
category: Utilisation de Zonemaster
---

Une fois le test terminé, Zonemaster fournit généralement un lien vers le site web du TLD (domaine de premier niveau) du nom de domaine testé, par exemple `.net` si le nom de domaine testé est zonemaster.net. Le lien se trouve dans le bouton `.net Info` (si .net est le TLD). En suivant ce lien, il est généralement possible de trouver des informations utiles sur le nom de domaine testé. La facilité avec laquelle ces informations peuvent être trouvées dépend du TLD concerné. Le lien est souvent un lien général vers le TLD trouvé dans la [base de données des TLD de l’IANA](https://www.iana.org/domains/root/db), mais il peut aussi s’agir d’un lien plus spécifique fourni par le TLD pour cette fonctionnalité. Dans ce cas, vous pouvez vous attendre à trouver facilement des informations sur le nom de domaine testé.

Si vous représentez un registre de TLD et souhaitez fournir un meilleur lien à vos titulaires, vous pouvez lire dans la [spécification d’URL TLD](https://doc.zonemaster.net/latest/configuration/tld-url-specification.html#txt-record) comment fournir un enregistrement TXT contenant l’URL préférée.

S’il n’existe pas de lien vers le site web du TLD, cela peut être dû à la politique du TLD ou à celle de l’installation Zonemaster, qui empêche l’affichage du lien. Si le nom de domaine testé est la zone racine ou un TLD, par exemple .net, aucun lien n’est affiché. Consultez la [spécification d’URL TLD](https://doc.zonemaster.net/latest/configuration/tld-url-specification.html#txt-record) pour plus de détails sur cette fonctionnalité.
