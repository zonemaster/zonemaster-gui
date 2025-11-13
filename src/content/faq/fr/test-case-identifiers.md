---
question: Qu'est ce qu'un identifiant de cas de test ?
category: Utilisation de Zonemaster
---

Tous les cas de test appartiennent à un niveau de test spécifique et leurs noms sont basés sur le nom de ce niveau de test. Les niveaux de test suivants sont définis :

- Address
- Basic
- Connectivity
- Consistency
- DNSSEC
- Delegation
- Nameserver
- Syntax
- Zone

Le nom du niveau de test n'est pas sensible à la casse, mais les formes définies ci-dessus doivent être utilisées lors de la référence aux niveaux de test, c'est-à-dire seulement la première lettre en majuscule, sauf pour les acronymes pour lesquels toutes les lettres sont en majuscules. Par exemple "Address" et non "ADDRESS" ni "adresse".

L'identifiant de cas de test dans la spécification de cas de test (à la fois dans le titre principal et dans la section "Identifiant de cas de test") utilise le nom du niveau de test, comme défini ci-dessus, et a le format : `{Nom du niveau de test} + {Index}`

Lors de la référence à un cas de test, pour la lisibilité, la casse des lettres définie ci-dessus doit être utilisée pour le nom du niveau de test.

L'{Index}' est un suffixe à deux chiffres 01-99, et doit être sélectionné de manière à ce que l'identifiant de cas de test soit unique. Normalement, le premier index libre est sélectionné.

Exemples d'identifiants de cas de test :

- Address03
- Basic04
- DNSSEC15
- Zone06
