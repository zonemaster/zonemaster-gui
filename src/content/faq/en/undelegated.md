---
question: What is an undelegated domain test?
category: Using Zonemaster
---

An undelegated domain test is a test performed on a domain name that may, or may not, be fully published in the DNS.

This can be quite useful if one is going to migrate one's domain from one registrar to another, for example, migrate zone 'example.com' from the name server 'ns.example.com' to the name server 'ns.example.org'. In this scenario one could perform an undelegated domain test providing the zone ('example.com') and the name server you are migrating to ('ns.example.org') before you migrate your domain.

When the results of the test doesn't show any errors or warnings one can be fairly certain that the domain's new location is working well. However there might still be other problems in the zone data itself that this test is unaware of.
