---
question: What makes Zonemaster different from other DNS zone validating software?
category: General information
---

* Zonemaster saves all history from earlier tests based on the tested domain name, which means you can go back to a test you did some time ago and compare it to the test you ran just a moment ago.
* All tests that Zonemaster runs are defined in the Test Case Specification documents that can be found in the [Test Case Specification documents](https://github.com/zonemaster/zonemaster/tree/master/docs/public/specifications/tests#zonemaster-test-case-specifications).
* Zonemaster can be used to test [undelegated domain names](https://zonemaster.net/en/faq#what-is-an-undelegated-domain-test).
* Zonemaster can be used to test [DS records before their publication in the parent zone](https://zonemaster.net/en/faq#can-i-test-the-ds-records-before-they-are-published).
* This open source version of Zonemaster was built using modular code which basically means that you can integrate parts of it in your own systems, if you wish. For example, it is quite rare that you would want a complete program just to check for redelegations.

