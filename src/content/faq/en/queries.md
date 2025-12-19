---
question: What kind of DNS queries does Zonemaster generate?
category: General information
---

Zonemaster sends multiple DNS queries to the name servers hosting the domain name being tested and also to the name servers hosting the parent zone of that domain name.

The web interface of Zonemaster does not show the queries that were sent, only the CLI interface can. If you want to see such queries, you will have to locally install a minimally working Zonemaster instance with both the Engine and CLI components. See the [CLI installation document](https://github.com/zonemaster/zonemaster/blob/master/docs/public/installation/zonemaster-cli.md) for more information, or if you prefer a [Docker image](https://github.com/zonemaster/zonemaster/blob/master/docs/public/using/cli.md#Invoking-the-command-line-tool-using-Docker) is also available.

Queries sent can be shown using the 'DEBUG' level option. Fair warning, the output from the CLI can be quite heavy. For more information see [CLI usage documentation](https://github.com/zonemaster/zonemaster/blob/master/docs/public/using/cli.md).
