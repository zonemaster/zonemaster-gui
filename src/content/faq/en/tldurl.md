---
question: What is the TLD information link?
category: Using Zonemaster
---

After a test is complete Zonemaster will usually provide a link to the web site of the TLD (top-level domain) of the tested domain name, i.e. `.net` if the tested domain name is zonemaster.net. The link will be found from the `.net Info` button (if .net is the TLD). Following the link it will usually be possible to find useful information of tested domain name. How easy it is to find the information depends on the TLD in question. In many times the link is a general link for the TLD found in the [IANA database of TLDs](https://www.iana.org/domains/root/db), but other times it is a more specific link provided by the TLD for this function. If that is the case then you can expect to easily find information about the tested domain name.

If you come from a TLD registry an wants to provide a better link for your registrants, you can read in the [TLD URL Specification](https://doc.zonemaster.net/latest/configuration/tld-url-specification.html#txt-record) how to provide a TXT record with the preferred URL.

If there is no link to the web site of the TLD, it can be because TLD policy or policy of the Zonemaster installation prevents the link to be shown. If the tested domain name is the root zone or a TLD, e.g. .net, no link is shown. You can read in the [TLD URL Specification](https://doc.zonemaster.net/latest/configuration/tld-url-specification.html#txt-record) for more details of the function.
