---
question: Qu'est-ce qui distingue Zonemaster des autres outils de validation de zone DNS ?
category: Informations générales
---

* Zonemaster conserve tout l'historique des tests réalisés sur un nom de domaine, ce qui signifie que vous pouvez revenir en arrière pour comparer les résultats d'un test remontant à un certain temps et ceux d'un test que vous avez lancé il y a un instant.
* Tous les tests qu'effectue Zonemaster sont définis dans des spécifications de cas de test, qui se trouvent dans les [documents de spécifications de cas de test](https://github.com/zonemaster/zonemaster/tree/master/docs/public/specifications/tests#zonemaster-test-case-specifications) (en anglais).
* Zonemaster peut être utilisé pour tester des [noms de domaines non délégués](https://zonemaster.net/en/faq#what-is-an-undelegated-domain-test).
* Zonemaster peut être utilisé pour tester des [enregistrements DS avant leur publication dans la zone parente](https://zonemaster.net/en/faq#can-i-test-the-ds-records-before-they-are-published).
* Cette version « open source » de Zonemaster a été écrite de manière modulaire, ce qui signifie en résumé qu'il est possible d'intégrer des parties de Zonemaster dans vos propres systèmes, si vous le souhaitez. Par exemple, on souhaite rarement utiliser un logiciel complet juste pour vérifier des redélégations.

