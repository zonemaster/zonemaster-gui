---
question: Qu'est-ce qu'un test sur un nom de domaine non délégué ?
category: Utilisation de Zonemaster
---

Un test sur un nom de domaine non délégué est un test effectué sur un nom de domaine qui peut ne pas être entièrement publié dans le DNS.

Ce type de test peut être très utile lorsqu'on est en train de migrer un domaine d'un bureau d'enregistrement vers un autre, par exemple lorsque l'on migre la zone "example.com" du serveur de noms "ns.example.com" vers le serveur de noms "ns.example.org". Dans ce cas de figure, on pourrait effectuer un test sur un nom de domaine non délégué, en fournissant la zone ("example.com") et le serveur de noms vers lequel on migre ("ns.example.org") avant de migrer le domaine.

Si le résultat du test ne comporte aucune erreur ni avertissement, on peut être relativement certain que le nouvel emplacement du domaine fonctionne bien. Mais cela n'exclut pas l'existence d'autres problèmes dans les données elles-mêmes de la zone que ce test n'aurait pas décelés.
