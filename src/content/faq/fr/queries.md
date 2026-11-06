---
question: Quel genre de requêtes DNS Zonemaster génère-t-il ?
category: Informations générales
---

Zonemaster envoie plusieurs requêtes DNS aux serveurs de noms hébergeant le nom de domaine à tester ainsi qu'aux serveurs de noms hébergeant la zone parente du même nom de domaine.

L'interface Web de Zonemaster n'affiche pas les requêtes envoyées, seule l'interface en ligne de commande en est capable. Si vous souhaitez voir ces requêtes, vous devez installer localement une instance minimale et fonctionnelle de Zonemaster doté des composants Engine et CLI. Vous pouvez consulter le [document d'installation de la CLI (en anglais)](https://doc.zonemaster.net/latest/installation/zonemaster-cli.html) pour plus d'informations, ou, si vous préférez, une [image Docker](https://doc.zonemaster.net/latest/using/cli.html#Invoking-the-command-line-tool-using-Docker) est aussi disponible.

Les requêtes envoyées peuvent être affichées avec l'option de niveau de messages _DEBUG_. Attention, la quantité de données affichées par l'interface en ligne de commande peut être très volumineuse. Pour plus d'informations, consulter [la documentation d'utilisation de l'interface en ligne de commandes (en anglais)](https://doc.zonemaster.net/latest/using/cli.html).
