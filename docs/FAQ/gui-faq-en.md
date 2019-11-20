Zonemaster
==========

1. [What is Zonemaster?](#q1)
2. [Who is behind Zonemaster?](#q2)
3. [How can Zonemaster help me?](#q3)
4. [Zonemaster returns "Error" or "Warning" on my domain. What does it mean?](#q4)
5. [How can Zonemaster judge what is right and wrong?](#q5)
6. [Does Zonemaster handle IPv6?](#q6)
7. [Does Zonemaster handle DNSSEC?](#q7)
8. [What makes Zonemaster differ from other DNS zone validating software?](#q8)
9. [Zonemaster and privacy](#q9)
10. [How come I cannot test my domain?](#q10)
11. [What kind of queries does Zonemaster generate?](#q11)
12. [What is an undelegated domain test?](#q12)
13. [How can I test a reverse zone with Zonemaster?](#q13)

Zonemaster
----------
#### 1. What is Zonemaster? <a name="q1"></a>
Zonemaster is a program that was designed to help people check, measure and
hopefully also understand how DNS (Domain Name System) works.

It consists of four basic parts:

  1. Engine - a test framework that supports all functionality to perform DNS tests.
  2. The CLI interface to the Engine.
  3. Backend, a server that allows you to run Zonemaster tests and save results using
     a JSON-RPC API and a database.
  4. GUI - a web interface to the backend.

When a domain (such as "zonemaster.net") is submitted to Zonemaster (CLI or
GUI) it will investigate the domain’s general health by traversing the DNS from root
(.) via the TLD (Top Level Domain, like .net) to the nameserver(s) that hosts
the information about the specific domain (zonemaster.net). The different sanity checks
conducted by the Zonemaster tool is documented in the [Test Requirements
document](https://github.com/zonemaster/zonemaster/blob/master/docs/requirements/TestRequirements.md).

#### 2. Who is behind Zonemaster? <a name="q2"></a>
Zonemaster is a joint project between [Afnic](https://www.afnic.fr/en/)
(registry operator of .fr TLD and several other
TLDs, e.g. .re, .pm, .tf, .wf, .yt and .paris) and
[The Swedish Internet Foundation](https://internetstiftelsen.se/en/)
(registry
operator of .se and .nu TLDs).

#### 3. How can Zonemaster help me? <a name="q3"></a>
The Zonemaster tool is oriented towards two user categories:

  - Users who are knowledgable about the DNS protocol.
  - Users who just want to know whether the the domains owned or used by them
    have any issues or not.

Users of the second category should contact their DNS operator
as soon as they get the results other than "green" for any
test of their domain name.

#### 4. Zonemaster returns "Error" or "Warning" for my domain. What does it mean? <a name="q4"></a>
It depends on which test failed for your domain.

#### 5. How can Zonemaster judge what is right and wrong? <a name="q5"></a>
There is no final judgement of the health of a domain that can be bestowed by
anyone. The people behind Zonemaster do not claim that the tool is correct in
every aspect. Sometimes opinions differ. We have done our very best to create a
default policy for found errors within
this project. Hopefully this is a good compromise between what is an actual
potentially dangerous error and what could be merely seen as a notice or warning.
The added advantage of the tool is that one can add a policy file suited to
one's necessity to a specified directory and ask the tool to use that policy
file when running the tests.
But as with all things as evolving as DNS the situation is most likely
changing, what is a notice today could be an error tomorrow. If you really think
we have made a mistake in our judgement please do not hesitate to drop us an email
at zonemaster-devel@lists.iis.se with a link to your test and an explanation why you think it
shows something that you consider incorrect.

#### 6. Does Zonemaster handle IPv6? <a name="q6"></a>
Yes, it does. All tests run over IPv4 will also be run over IPv6 if Zonemaster
is configured to do so.

#### 7. Does Zonemaster handle DNSSEC? <a name="q7"></a>
Yes, if DNSSEC is available for a domain that is tested by Zonemaster, it will be
checked automatically.

#### 8. What makes Zonemaster differ from other DNS zone validating software? <a name="q8"></a>
Firstly, Zonemaster saves all history from earlier tests based on the tested
domain, which means you can go back to a test you did a week ago and compare it
to the test you ran a moment ago.

All tests that Zonemaster runs are defined in test case specifications that
are linked from [Test Requirements
document](https://github.com/zonemaster/zonemaster/blob/master/docs/requirements/TestRequirements.md)

Zonemaster could be used to test undelegated domains. More about undelegated
domains in [Question 12](#q12).

Lastly, this open source version of Zonemaster was built using modular code
which, basically, means you can use parts of it in your systems, if you would want
to. It is quite rare that you'd want a complete program just to check for example
redelegations.

#### 9. Zonemaster and privacy <a name="q9"></a>
Since Zonemaster is open to everyone it is possible for anyone to check your
domain and also see previous tests, however there is no way to tell
who has run a specific test since nothing is logged except the time of the test.

#### 10. How come I cannot test my domain? <a name="q10"></a>
If we disregard the situation where the domain does not exist, as in when you input a
non-existing domain to Zonemaster, there are 2 other possibilites:
  - To protect the engine from multiple identical inputs, that is the same IP
    checking the same zone several times, there is a delay of 5 minutes between
    identical subsequent tests. This means that you can only test the
    same domain once every 5 minutes, if you try and test it again within 5 minutes
    the last results will be displayed instead.
  - Because Zonemaster was made to check domains or DNS zones, like zonemaster.net, and
    not hostnames in a domain (zone), like www.zonemaster.net, the Zonemaster will
    report a failure if you try to test a host name instead of a domain matching a
    DNS zone.

#### 11. What kind of queries does Zonemaster generate? <a name="q11"></a>
Zonemaster send multiple DNS queries to the name servers hosting the domain name and
also to the name servers hosting the parent zone of the domain name.

To get a full
view of what queries and results are generated you can run the
CLI interface (and in order to run the CLI interface you need to download the
complete package and install it) and select full output.
The output from the CLI tool is quite heavily technical
so unless you are into bits and bytes you might want to skip this step.

#### 12. What is an undelegated domain test? <a name="q12"></a>
An undelegated domain test is a test performed on a domain that may, or may not,
be fully published in the DNS. This can be quite useful if one is going to move
one's domain from one registrar to another,
e.g., move zone example.com from the nameserver
"ns.example.com" to the nameserver "ns.example.org". In this scenario one could perform
an undelegated domain test providing the zone (example.com) and the nameserver you are moving to
(ns.example.org) *before* you move your domain.
When the results of the test are colour coded in green one can be fairly certain
that the domain's new location is working well. However there
might still be other problems in the zone data itself that this test is unaware of.

#### 13. How can I test a "reverse" zone with Zonemaster? <a name="q13"></a>
To check a reverse zone with Zonemaster one need to first know what the
reverse zone is. If you want to check the reverse zone, you have to enter
it in the format that it has in DNS, e.g.:

  - 3.2.1.in-addr.arpa
  - 6.0.1.0.0.2.ip6.arpa


