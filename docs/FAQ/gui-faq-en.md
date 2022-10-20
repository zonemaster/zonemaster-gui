Zonemaster
==========

1. [What is Zonemaster?](#q1)
2. [Who is behind Zonemaster?](#q2)
3. [How can Zonemaster help me?](#q3)
4. [Zonemaster returns "Error" or "Warning" on my domain. What does it mean?](#q4)
5. [How can Zonemaster distinguish between what is right and wrong?](#q5)
6. [Does Zonemaster support IPv6?](#q6)
7. [Does Zonemaster verify DNSSEC?](#q7)
8. [What makes Zonemaster differ from other DNS zone validating software?](#q8)
9. [Zonemaster and privacy](#q9)
10. [How come my domain cannot be tested?](#q10)
11. [What kind of queries does Zonemaster generate?](#q11)
12. [What is an undelegated domain test?](#q12)
13. [How can I test a reverse zone with Zonemaster?](#q13)

Zonemaster
----------

<a name="q1"></a>
#### 1. What is Zonemaster?
Zonemaster is a program designed to help people check, measure and
hopefully also understand how the DNS (Domain Name System) works.

It consists of four components:

  1. Engine - a test framework that supports all functionality to perform DNS tests.
  2. CLI - a command-line interface to the Engine.
  3. Backend - a server that allows you to run Zonemaster tests and save results using
     a JSON-RPC API and a database.
  4. GUI - a web interface to the Backend.

When a domain (such as 'zonemaster.net') is submitted to Zonemaster (CLI or
GUI) it will verify the domain name’s general health with a series of tests.
The different sanity checks and corresponding tests conducted by Zonemaster can be
found in the [Test Requirements] document.

<a name="q2"></a>
#### 2. Who is behind Zonemaster?
Zonemaster is a joint project between [AFNIC] (registry of '.fr' TLD and several other
TLDs, e.g. '.re', '.pm', '.tf', '.wf', '.yt' and '.paris') and the [Swedish Internet Foundation]
(registry of '.se' and '.nu' TLDs).

<a name="q3"></a>
#### 3. How can Zonemaster help me?
The Zonemaster tool is oriented towards two user categories:

  - Users who are knowledgable about the DNS protocol.
  - Users who just want to know whether the domain name(s) they own or use
    have any issues or not.

Users of the second category should contact their DNS operator
in case they get results other than color-coded "green" for any
test of their domain name(s).

<a name="q4"></a>
#### 4. Zonemaster returns "Error" or "Warning" for my domain. What does it mean?
It depends on which test failed for your domain. Each test are accompanied with one or several message(s)
describing the issue(s) found.
You can also get further insight about each test from the [Implemented Test Cases] document.

<a name="q5"></a>
#### 5. How can Zonemaster distinguish between what is right and wrong?
The judgement of Zonemaster is primarily based on the DNS standards as defined in [RFCs].
It also bases its judgement on DNS best practices, which can be more loosely defined.
All Zonemaster tests are defined in [Test Case Specifications][Implemented Test Cases]
in which the references to the standard documents for that test case are found.

The descriptions of message levels such as *notice*, *warning* and *error* are found 
in [Severity Level Definitions].

Sometimes there are different interpretations of the standards or opinions on what is best practice,
and the Zonemaster team is always open to input.
If you think we have made a mistake in our judgement please do not hesitate to send us an email
at [zonemaster-users@lists.iis.se] (moderated mailing list) with a link to your test result
and an explanation as to why you think it shows something that you consider incorrect.

<a name="q6"></a>
#### 6. Does Zonemaster support IPv6?
Yes. By default Zonemaster will query name servers both over IPv4 and IPv6, unless explicitly
configured otherwise.
Such configuration is accessible through the "Options" button.

<a name="q7"></a>
#### 7. Does Zonemaster verify DNSSEC?
Yes. If DNSSEC is available for a domain that is tested by Zonemaster, it will be
checked automatically.
Note that you can also explicitly provide Delegation Signers (DS) records using the
"Options" button.

<a name="q8"></a>
#### 8. What makes Zonemaster differ from other DNS zone validating software?
Firstly, Zonemaster saves all history from earlier tests based on the tested
domain, which means you can go back to a test you did some time ago and compare it
to the test you ran just a moment ago.

Secondly, all tests that Zonemaster runs are defined in Test Case specifications that
can be found in the [Defined Test Cases] document.

Thirdly, Zonemaster can be used to test undelegated domains. Find more about undelegated
domains in [Question 12].

Lastly, this open source version of Zonemaster was built using modular code
which basically means that you can integrate parts of it in your own systems, if you wish.
For example, it is quite rare that you would want a complete program just to check for
redelegations.

<a name="q9"></a>
#### 9. Zonemaster and privacy
Since Zonemaster is open to everyone it is possible for anyone to check your
domain and its history of tests.
However there is no way to tell who has run a specific test since nothing is
logged except the start time of the test.

<a name="q10"></a>
#### 10. How come my domain cannot be tested?
There are four possibilities:

- Your domain name is not yet delegated.
- Your domain name is not reachable from public Internet.
- Zonemaster can only test what is called a DNS zone (e.g. 'zonemaster.net') and not host names (e.g. 'www.zonemaster.net')
- There is a 10 minutes protection, per IP address, between consecutive tests for a given domain name.
  Running a test within that window will instead show the last available test for that domain name.
- You have misspelled your domain name.

<a name="q11"></a>
#### 11. What kind of queries does Zonemaster generate?
Zonemaster send multiple DNS queries to the name servers hosting the domain being tested and
also to the name servers hosting the parent zone of that domain.

The GUI interface of Zonemaster does not show any queries sent.
Only the CLI interface can. If you want to see such queries, you will have to locally install
a minimally working Zonemaster instance with both the Engine and CLI components.
Queries sent can be shown using the 'DEBUG' level option.
Fair warning, the output from the CLI can be quite heavy.

<a name="q12"></a>
#### 12. What is an undelegated domain test?
An undelegated domain test is a test performed on a domain that may, or may not,
be fully published in the DNS.
This can be quite useful if one is going to migrate one's domain from one registrar to another,
e.g., migrate zone 'example.com' from the name server 'ns.example.com' to the name server 'ns.example.org'.
In this scenario one could perform an undelegated domain test providing the zone ('example.com')
and the name server you are migrating to ('ns.example.org') *before* you migrate your domain.
When the results of the test are color-coded "green" one can be fairly certain that the
domain's new location is working well.
However there might still be other problems in the zone data itself that this test is unaware of.

<a name="q13"></a>
#### 13. How can I test a "reverse" zone with Zonemaster?
To check a reverse zone with Zonemaster, one first needs to know what the
reverse zone is. If you want to check the reverse zone, you have to enter
it in the format that it has in the DNS, e.g.:

  - 100.51.198.in-addr.arpa
  - 8.b.d.0.1.0.0.2.ip6.arpa

[AFNIC]:                                 https://www.afnic.fr/en/
[Defined Test Cases]:                    https://github.com/zonemaster/zonemaster/tree/master/docs/specifications/tests#list-of-defined-test-cases
[Implemented Test Cases]:                https://github.com/zonemaster/zonemaster/blob/master/docs/specifications/tests/ImplementedTestCases.md
[Question 12]:                           #q12
[RFCs]:                                  https://www.ietf.org/standards/rfcs/
[Severity Level Definitions]:            https://github.com/zonemaster/zonemaster/blob/master/docs/specifications/tests/SeverityLevelDefinitions.md
[Swedish Internet Foundation]:           https://internetstiftelsen.se/en/
[Test Requirements]:                     https://github.com/zonemaster/zonemaster/blob/master/docs/requirements/TestRequirements.md
[zonemaster-users@lists.iis.se]:         mailto:zonemaster-users@lists.iis.se