Zonemaster
==========

1. [Qu'est-ce que Zonemaster ?](#q1)
2. [Qui se cache derrière Zonemaster ?](#q2)
3. [Qu'est-ce que Zonemaster peut faire pour moi?](#q3)
4. [Zonemaster indique des « Erreurs » ou « Avertissements » sur mon nom de domaine. Qu'est-ce que cela signifie ?](#q4)
5. [Comment Zonemaster discerne-t-il le bon du mauvais ?](#q5)
6. [Zonemaster prend-il en charge IPv6 ?](#q6)
7. [Zonemaster vérifie-t-il DNSSEC ?](#q7)
8. [Qu'est-ce qui distingue Zonemaster des autres outils existants ?](#q8)
9. [Zonemaster et le respect de la vie privée](#q9)
10. [Pourquoi mon nom de domaine n'a-t-il pas pu être testé ?](#q10)
11. [Quel genre de requêtes Zonemaster génère-t-il ?](#q11)
12. [Qu'est-ce qu'un test sur un domaine non délégué ?](#q12)
13. [Peut-on tester des enregistrements DS avant leur publication ?](#q13)
14. [Comment tester une zone inverse avec Zonemaster ?](#q14)

Zonemaster
----------
#### <span id="q1"></span>1. Qu'est-ce que Zonemaster ?

Zonemaster est un programme conçu pour aider à vérifier, mesurer et peut-être
aussi aider à la compréhension du fonctionnement du DNS (_Domain Name
System_).

Il est constitué de plusieurs composants :

 1. *Engine* (moteur) - un cadriciel de tests prenant en charge toutes les
    fonctionnalités pour les tests DNS ;
 2. *CLI* - une interface en ligne de commande pour le moteur ;
 3. *Backend* - un serveur permettant l'exécution de tests et la sauvegarde de
    résultats au moyen d'une API JSON-RPC et d'une base de données ;
 4. *GUI* - une interface graphique (Web) pour le Backend.

Lorsqu'un nom de domaine (comme « zonemaster.net ») est soumis à Zonemaster
(par l'interface en ligne de commande ou l'interface graphique), ce dernier
vérifie l'état de santé général du nom de domaine à l'aide d'une série de
tests. L'ensemble des tests réalisés par Zonemaster est décrit dans le
document intitulé [Defined Test Cases] (« cas de tests définis », document
rédigé en anglais).

#### <span id="q2"></span>2. Qui se cache derrière Zonemaster ?

Zonemaster est un projet conjoint entre l'[Afnic], registre du TLD « .fr »
ainsi que d'autres TLD, comme « .re », « .pm », « .tf », « .wf », « .yt » et
« .paris » et [The Swedish Internet Foundation], registre suédois des TLD
« .se » et « .nu ».

#### <span id="q3"></span>3. Qu'est-ce que Zonemaster peut faire pour moi ?

Zonemaster a été conçu pour deux types de publics :

 - Les utilisateurs ayant une bonne connaissance du protocole DNS ;
 - Les utilisateurs souhaitant simplement savoir si les noms de domaine qu'ils
   possèdent ou utilisent ont des problèmes.

Les utilisateurs de la seconde catégorie devraient contacter leur opérateur
DNS si le moindre test de leur nom de domaine rapporte une erreur ou un
avertissement.

#### <span id="q4"></span>4. Zonemaster indique des « Erreurs » ou « Avertissements » sur mon nom de domaine. Qu'est-ce que cela signifie ?

Cela dépend du test ayant échoué pour votre nom de domaine. Chaque test est
accompagné d'un ou plusieurs messages décrivant les problèmes qui ont été
trouvés. Vous pouvez également trouver des détails supplémentaires sur chaque
test dans le document intitulé [Defined Test Cases].

#### <span id="q5"></span>5. Comment Zonemaster discerne-t-il le bon du mauvais ?

Le jugement de Zonemaster repose principalement sur les normes techniques du
DNS telles qu'elles sont définies dans les [RFC]. Le jugement est également
fondé sur les bonnes pratiques du DNS, dont la définition est moins stricte.
Tous les tests de Zonemaster sont définis dans des [spécifications de cas de
test][Defined Test Cases], dans lesquels vous pourrez trouver les références
aux documents normatifs pour un cas de test donné.

Les descriptions de niveaux de messages comme *notice*, *avertissement* et
*erreur* se trouvent dans le document intitulé [Severity Level Definitions]
(en anglais).

Parfois, les normes techniques ou les opinions de ce qui constitue une bonne
pratique peuvent faire l'objet d'interprétations multiples ; l'équipe de
Zonemaster est toujours ouverte aux commentaires. Si vous pensez que nous
avons fait une erreur dans notre jugement, n'hésitez pas à nous envoyer un
e-mail à [zonemaster-users@lists.iis.se] (liste de diffusion modérée) avec un
lien vers le résultat de votre test et en expliquant pourquoi vous pensez que
Zonemaster affiche quelque chose que vous considérez comme incorrect.

#### <span id="q6"></span>6. Zonemaster prend-il en charge IPv6 ?

Oui.
Par défaut, Zonemaster interroge les serveurs de noms aussi bien en IPv4 qu'en
IPv6, sauf si un paramètre de configuration prescrit le contraire.
De tels paramètres de configuration sont accessibles à travers le bouton « Options ».


#### <span id="q7"></span>7. Zonemaster vérifie-t-il DNSSEC ?

Oui.
Si DNSSEC est disponible pour un domaine testé par Zonemaster, des tests
DNSSEC seront effectués automatiquement.

#### <span id="q8"></span>8. Qu'est-ce qui distingue Zonemaster des autres outils existants ?

Premièrement, Zonemaster conserve tout l'historique des tests réalisés sur un
nom de domaine, ce qui signifie que vous pouvez revenir en arrière pour
comparer les résultats d'un test remontant à un certain temps et ceux d'un
test que vous avez lancé il y a un instant.

Deuxièmement, tous les tests qu'effectue Zonemaster sont définis dans des
spécifications de cas de test, qui se trouvent dans le document intitulé
[Defined Test Cases].

Troisièmement, Zonemaster peut être utilisé pour tester des zones non
déléguées. Voir [Question 12].

Quatrièmement, Zonemaster peut être utilisé pour tester des enregistrements DS
avant leur publication dans la zone parente (un prérequis pour l'activation de
DNSSEC dans une zone signée). Voir [Question 13].

Enfin, cette version « open source » de Zonemaster a été écrite de manière
modulaire, ce qui signifie en résumé qu'il est possible d'intégrer des parties
de Zonemaster dans vos propres systèmes, si vous le souhaitez. Par exemple, on
souhaite rarement utiliser un logiciel complet juste pour vérifier des
redélégations.

#### <span id="q9"></span>9. Zonemaster et le respect de la vie privée

Puisque Zonemaster est accessible à tous, n'importe qui peut vérifier votre
nom de domaine et consulter son historique de tests.
Toutefois, il n'est pas possible de savoir qui a réalisé ces tests, car seuls
les paramètres et les résultats du test sont conservés.
En particulier, aucun cookie et aucune information sur l'adresse IP de
l'utilisateur ne sont conservés dans la base de données. L'initiateur d'un
test ne peut pas être retrouvé à partir des informations dans la base de
données.

#### <span id="q10"></span>10. Pourquoi mon nom de domaine n'a-t-il pas pu être testé ?

Il y a plusieurs possibilités :

- Votre domaine n'est pas encore délégué ;
- Votre domaine n'est pas joignable publiquement depuis Internet ;
- Zonemaster peut seulement tester ce qu'on appelle une zone DNS (par exemple
  « zonemaster.net ») et non pas les noms d'hôte (comme
  « www.zonemaster.net ») ;
- Il y a une temporisation de dix minutes entre deux tests consécutifs d'un
  même nom de domaine (avec les mêmes paramètres de test). Lancer un second
  test dans cette fenêtre de temps donnera les résultats du dernier test
  effectué pour ce nom de domaine (et ces paramètres) au lieu d'un nouveau
  test ;
- Vous avez fait une faute de frappe dans le nom de domaine.

#### <span id="q11"></span>11. Quel genre de requêtes Zonemaster génère-t-il ?

Zonemaster envoie plusieurs requêtes DNS aux serveurs de noms hébergeant le
nom de domaine à tester ainsi qu'aux serveurs de noms hébergant la zone
parente du même nom de domaine.

L'interface graphique de Zonemaster n'affiche pas les requêtes envoyées, seule
l'interface en ligne de commande en est capable. Si vous souhaitez voir ces
requêtes, vous devez installer localement une instance minimale et
fonctionnelle de Zonemaster doté des composants Engine et CLI (une image
Docker est également disponible). Les requêtes envoyées peuvent être affichées
avec l'option de niveau de messages 'DEBUG'. Attention, la quantité de données
affichées par l'interface en ligne de commande peut être très volumineuse.
Pour plus d'informations, voir [Utilisation de l'interface en ligne de
commandes] (document rédigé en anglais).

#### <span id="q12"></span>12. Qu'est-ce qu'un test sur un nom de domaine non délégué ?

Un test sur un nom de domaine non délégué est un test effectué sur un nom de
domaine qui peut ne pas être entièrement publié dans le DNS. Ce type de test
peut être très utile lorsqu'on est en train de migrer un domaine d'un bureau
d'enregistrement vers un autre, par exemple lorsqu'on migre la zone
« example.com » du serveur de noms « ns.example.com » vers le serveur de noms
« ns.example.org ». Dans ce cas de figure, on pourrait effectuer un test sur
un nom de domaine non délégué, en fournissant la zone (« example.com ») et le
serveur de noms vers lequel on migre (« ns.example.org ») *avant* de migrer le
domaine. Si le résultat du test ne comporte aucune erreur ni avertissement, on
peut être relativement certain que le nouvel emplacement du domaine fonctionne
bien. Mais cela n'exclut pas l'existence d'autres problèmes dans les données
elles-mêmes de la zone que ce test n'aurait pas décelés.

#### <span id="q13"></span>13. Peut-on tester des enregistrements DS avant leur publication ?

Oui.
Pour cela, utilisez le bouton « Options » et ajoutez-y les entrées *Delegation Signer* (DS) à tester.
Zonemaster utilisera ces entrées-là comme si elles avaient déjà été ajoutées dans la zone parent.

#### <span id="q14"></span>14. Comment tester une zone inverse avec Zonemaster ?

Pour tester une zone inverse, il faut d'abord déterminer le nom de la zone
inverse, puis la saisir dans le format qu'elle a dans le DNS. Une zone inverse
s'obtient en inversant une adresse IP et en ajoutant un suffixe. Les adresses
IPv4 utilisent le suffixe « in-addr.arpa » tandis que les adresses IPv6
utilisent « ip6.arpa ».

Exemples :

  - Pour le préfixe IPv4 « 198.51.100.0/24 » : 100.51.198.in-addr.arpa ;
  - Pour le préfixe IPv6 « 2001:db8::/32 » : 8.b.d.0.1.0.0.2.ip6.arpa.

[Afnic]:                                 https://www.afnic.fr/fr/
[Defined Test Cases]:                    https://github.com/zonemaster/zonemaster/tree/master/docs/public/specifications/tests#list-of-defined-test-cases
[Question 12]:                           #q12
[Question 13]:                           #q13
[RFC]:                                   https://www.ietf.org/standards/rfcs/
[Severity Level Definitions]:            https://github.com/zonemaster/zonemaster/blob/master/docs/public/specifications/tests/SeverityLevelDefinitions.md
[The Swedish Internet Foundation]:       https://internetstiftelsen.se/en/
[Utilisation de l'interface en ligne de commandes]: https://github.com/zonemaster/zonemaster/blob/master/docs/public/using/cli.md
[Zonemaster.net]:                        https://zonemaster.net/
[zonemaster-users@lists.iis.se]:         mailto:zonemaster-users@lists.iis.se
