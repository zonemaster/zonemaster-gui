---
question: Pourquoi mon nom de domaine n'a-t-il pas pu être testé ?
category: Utilisation de Zonemaster
---

Il y a plusieurs possibilités :

* Votre domaine n'est pas encore délégué.
* Votre domaine n'est pas joignable publiquement depuis Internet.
* Zonemaster peut seulement tester ce qu'on appelle une zone DNS, par exemple "zonemaster.net", et non pas les noms d'hôte, comme "www.zonemaster.net".
* Il y a une temporisation de dix minutes entre deux tests consécutifs d'un même nom de domaine, avec les mêmes paramètres de test. Lancer un second test dans cette fenêtre de temps donnera les résultats du dernier test effectué pour ce nom de domaine et ces paramètres, au lieu d'un nouveau test.
* Il y a une faute de frappe dans le nom de domaine.
