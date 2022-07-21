# API

The Zonemaster GUI provides a small API to access specific resource and perform
specific tasks.

The supported paths are the following:

* `domain_check`: the default path, access the input form
* `domain_check/<domain>`: populate the input form with `<domain>` and launch
  the test
* `result/<test-id>`: access the result page with results for the test with
  `<test-id>`
* `test/<test-id>`: same as `result/<test-id>`, kept for retrocompatibility
* `faq`: access the FAQ

