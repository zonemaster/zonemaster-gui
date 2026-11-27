---
question: What is the TLD information link?
category: Using Zonemaster
---

After a test is complete, Zonemaster will usually provide a link to the web site of the TLD (top-level domain) of the tested domain name, e.g. `.net` if the tested domain name is zonemaster.net. The link is available through the `.net Info` button (if .net is the TLD). By following the link, it will usually be possible to find useful information about the tested domain name. How easy it is to find the information depends on the TLD in question. The link is often a general link for the TLD found in the [IANA database of TLDs](https://www.iana.org/domains/root/db), but it can also be a more specific link provided by the TLD for this function. If that is the case, then you can expect to easily find information about the tested domain name.

If there is no link to the web site of the TLD, it may be because the policies of the TLD or the Zonemaster installation prevent the link from being shown. If the tested domain name is the root zone or a TLD, e.g. .net, no link is shown. See the [TLD URL Specification](https://doc.zonemaster.net/latest/configuration/tld-url-specification.html#txt-record) for more details.

If you work at a TLD registry and want to provide a better link for your registrants, you can read the [TLD URL Specification](https://doc.zonemaster.net/latest/configuration/tld-url-specification.html#txt-record) for information on how to provide a TXT record with the preferred URL.
