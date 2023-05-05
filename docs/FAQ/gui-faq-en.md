Zonemaster
==========

1. [What is Zonemaster?](#q1)
2. [Who is behind Zonemaster?](#q2)
3. [How can Zonemaster help me?](#q3)
4. [Zonemaster returns "Error" or "Warning" on my domain name. What does it mean?](#q4)
5. [How can Zonemaster distinguish between what is right and wrong?](#q5)
6. [Does Zonemaster support IPv6?](#q6)
7. [Does Zonemaster verify DNSSEC?](#q7)
8. [What makes Zonemaster differ from other DNS zone validating software?](#q8)
9. [Zonemaster and privacy](#q9)
10. [How come my domain name cannot be tested?](#q10)
11. [What kind of queries does Zonemaster generate?](#q11)
12. [What is an undelegated domain test?](#q12)
13. [Can I test the DS records before they are published?](#q13)
14. [How can I test a reverse zone with Zonemaster?](#q14)

Zonemaster
----------

#### <span id="q1"></span>1. What is Zonemaster?
Zonemaster is a program designed to help people check, measure and
hopefully also understand how the DNS (Domain Name System) works.

It consists of several components:

  1. Engine - a test framework that supports all functionality to perform DNS tests.
  2. CLI - a command-line interface to the Engine.
  3. Backend - a server that allows you to run Zonemaster tests and save results using
     a JSON-RPC API and a database.
  4. GUI - a web interface to the Backend.

When a domain name (such as 'zonemaster.net') is submitted to Zonemaster (using CLI or
GUI), it will verify the domain name’s general health with a series of tests.
The tests conducted by Zonemaster can be found in the [Defined Test Cases] document.

#### <span id="q2"></span>2. Who is behind Zonemaster?
Zonemaster is a joint project between [AFNIC] (registry of '.fr' TLD and several other
TLDs, e.g. '.re', '.pm', '.tf', '.wf', '.yt' and '.paris') and [The Swedish Internet Foundation]
(registry of '.se' and '.nu' TLDs).

#### <span id="q3"></span>3. How can Zonemaster help me?
The Zonemaster tool is oriented towards two user categories:

  - Users who are knowledgable about the DNS protocol.
  - Users who just want to know whether the domain name they own or use
    have any issues or not.

Users of the second category should contact their DNS operator
in case there are errors or warnings for any test of their domain name.

#### <span id="q4"></span>4. Zonemaster returns "Error" or "Warning" for my domain name. What does it mean?
It depends on which test failed for your domain name.
Each test are accompanied with one or several messages describing the issues found.
You can also get further insight about each test from the [Defined Test Cases] document.

#### <span id="q5"></span>5. How can Zonemaster distinguish between what is right and wrong?
The judgement of Zonemaster is primarily based on the DNS standards as defined in [RFCs].
It also bases its judgement on DNS best practices, which can be more loosely defined.
All Zonemaster tests are defined in [Test Case Specifications][Defined Test Cases]
in which the references to the standard documents for that test case are found.

The descriptions of message levels such as *notice*, *warning* and *error* are found 
in [Severity Level Definitions].

Sometimes there are different interpretations of the standards or opinions on what is best practice,
and the Zonemaster team is always open to input.
If you think we have made a mistake in our judgement please do not hesitate to send us an email
at [zonemaster-users@lists.iis.se] (moderated mailing list) with a link to your test result
and an explanation as to why you think it shows something that you consider incorrect.

#### <span id="q6"></span>6. Does Zonemaster support IPv6?
Yes.
By default Zonemaster will query name servers both over IPv4 and IPv6, unless explicitly
configured otherwise.
Such configuration is accessible through the "Options" button.

#### <span id="q7"></span>7. Does Zonemaster verify DNSSEC?
Yes.
If DNSSEC is available for a domain name that is tested by Zonemaster, it will be
checked automatically.

#### <span id="q8"></span>8. What makes Zonemaster differ from other DNS zone validating software?
Firstly, Zonemaster saves all history from earlier tests based on the tested
domain name, which means you can go back to a test you did some time ago and compare it
to the test you ran just a moment ago.

Secondly, all tests that Zonemaster runs are defined in Test Case specifications that
can be found in the [Defined Test Cases] document.

Thirdly, Zonemaster can be used to test undelegated domain names.
See [Question 12].

Fourthly, Zonemaster can be used to test DS records before their publication in the parent zone
(which is required to enable DNSSEC for a signed zone).
See [Question 13].

Lastly, this open source version of Zonemaster was built using modular code
which basically means that you can integrate parts of it in your own systems, if you wish.
For example, it is quite rare that you would want a complete program just to check for
redelegations.

#### <span id="q9"></span>9. Zonemaster and privacy
Since [Zonemaster.net] is open to everyone it is possible for anyone to check your
domain and its history of tests.
However there is no way to tell who has run a specific test since nothing more than the test
parameters and results are stored.
Specifically, no cookies or information on the user's IP address is stored in the database.
The user who initiated the test cannot be traced back from the information in the database.

#### <span id="q10"></span>10. How come my domain name cannot be tested?
There are several possibilities:

- Your domain name is not yet delegated.
- Your domain name is not reachable from public Internet.
- Zonemaster can only test what is called a DNS zone (e.g. 'zonemaster.net') and not host names (e.g. 'www.zonemaster.net')
- There is a 10 minutes protection between consecutive tests for a given domain name (with same test parameters).
  Running a test within that window will instead show the last available test for that domain name (and parameters).
- You have misspelled your domain name.

#### <span id="q11"></span>11. What kind of queries does Zonemaster generate?
Zonemaster send multiple DNS queries to the name servers hosting the domain name being tested and
also to the name servers hosting the parent zone of that domain name.

The GUI interface of Zonemaster does not show any queries sent, only the CLI interface can.
If you want to see such queries, you will have to locally install
a minimally working Zonemaster instance with both the Engine and CLI components (a Docker image is also available).
Queries sent can be shown using the 'DEBUG' level option.
Fair warning, the output from the CLI can be quite heavy.
For more information see [Using The CLI].

#### <span id="q12"></span>12. What is an undelegated domain test?
An undelegated domain test is a test performed on a domain name that may, or may not,
be fully published in the DNS.
This can be quite useful if one is going to migrate one's domain from one registrar to another,
e.g., migrate zone 'example.com' from the name server 'ns.example.com' to the name server 'ns.example.org'.
In this scenario one could perform an undelegated domain test providing the zone ('example.com')
and the name server you are migrating to ('ns.example.org') *before* you migrate your domain.
When the results of the test doesn't show any errors or warnings one can be fairly certain that the
domain's new location is working well.
However there might still be other problems in the zone data itself that this test is unaware of.

#### <span id="q13"></span>13. Can I test the DS records before they are published?
Yes.
Use the "Options" button and there add the Delegation Signer (DS) records to be tested.
Zonemaster will then use those in the same way as if they were already added in the parent zone.

#### <span id="q14"></span>14. How can I test a "reverse" zone with Zonemaster?
To check a reverse zone with Zonemaster, one first needs to know what the
reverse zone is, and enter it in the format it has in the DNS.
A reserve zone is obtained by reversing an IP address and adding a suffix.
IPv4 addresses use the suffix "in-addr.arpa" while IPv6 addresses
use "ip6.arpa".

Examples:
  - For IPv4 prefix '198.51.100.0/24': 100.51.198.in-addr.arpa
  - For IPv6 prefix '2001:db8::/32': 8.b.d.0.1.0.0.2.ip6.arpa

[AFNIC]:                                 https://www.afnic.fr/en/
[Defined Test Cases]:                    https://github.com/zonemaster/zonemaster/tree/master/docs/specifications/tests#list-of-defined-test-cases
[Question 12]:                           #q12
[Question 13]:                           #q13
[RFCs]:                                  https://www.ietf.org/standards/rfcs/
[Severity Level Definitions]:            https://github.com/zonemaster/zonemaster/blob/master/docs/specifications/tests/SeverityLevelDefinitions.md
[The Swedish Internet Foundation]:       https://internetstiftelsen.se/en/
[Using The CLI]:                         https://github.com/zonemaster/zonemaster-cli/blob/master/USING.md
[Zonemaster.net]:                        https://zonemaster.net/
[zonemaster-users@lists.iis.se]:         mailto:zonemaster-users@lists.iis.se
