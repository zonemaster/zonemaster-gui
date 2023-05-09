import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const urls = [
  // Version info
  {
    url: 'https://zonemaster.net/api',
    body: {jsonrpc: '2.0', id: 1643203570632, method:'version_info', params: {}},
    method: 'POST',
    json: {jsonrpc: '2.0', id: 1643203570632, result: {zonemaster_engine: 'e2e-test', zonemaster_backend: 'e2e-test', zonemaster_ldns: 'e2e-test'}}
  },

  // Profile list in option
  {
    url: 'https://zonemaster.net/api',
    body: {jsonrpc: '2.0', id:1643203351479, method: 'profile_names', params: {}},
    method: 'POST',
    json: {jsonrpc: '2.0', id: 1643203351479, result: ["default", "test_profile"]}
  },

  // FR18 - Should display progress bar
  // FR26 - Should display progress bar
  {
    url: 'https://zonemaster.net/api',
    body: {'jsonrpc': '2.0', 'id': 1572254767685, 'method': 'start_domain_test', 'params':
      {
        'language':'en', 'domain': 'progress.afNiC.Fr', 'profile': 'default',
        'nameservers': [], 'ds_info': []
      }
    },
    method: 'POST',
    json: {'jsonrpc': '2.0', 'id': 1572254767685, 'result': '2005cf23e9fb24b6'}
  },

  // FR19 - Should display progress bar when we add a NS name
  {
    url: 'https://zonemaster.net/api',
    body: {'jsonrpc': '2.0', 'id': 1572254767685, 'method': 'start_domain_test', 'params':
      {
        'language':'en', 'domain': 'progress.afNiC.Fr', 'profile': 'default',
        'nameservers': [{"ns": "ns1.nic.fr"}], 'ds_info': []
      }
    },
    method: 'POST',
    json: {'jsonrpc': '2.0', 'id': 1572254767685, 'result': '2005cf23e9fb24b6'}
  },

  // FR19 - should NOT display progress bar when we add a NS ip
  {
    url: 'https://zonemaster.net/api',
    body: {'jsonrpc': '2.0', 'id': 1572254767685, 'method': 'start_domain_test', 'params':
      {
        'language':'en', 'domain': 'progress.afNiC.Fr', 'profile': 'default',
        'nameservers': [{"ns":"", "ip": "192.134.4.1"}], 'ds_info': []
      }
    },
    method: 'POST',
    json: {
      "jsonrpc": "2.0",
      "error": {
        "message": "Invalid method parameter(s).",
        "code": "-32602",
        "data": [
          {
            "path": "/nameservers/0/ns",
            "message": "The domain name character(s) are not supported"
          }
        ]
      },
      "id": 1572254767685
    }
  },

  // FR20 - should display progress bar when we add a DS entry and launch a test
  {
    url: 'https://zonemaster.net/api',
    body:{'jsonrpc': '2.0', 'id': 1572277567967, 'method': 'start_domain_test', 'params':
      {
        'language':'en', 'domain': 'progress.afNiC.Fr', 'profile': 'default',
        'nameservers': [], 'ds_info': [{
          "keytag": 37610,
          "algorithm":8,
          "digtype":2,
          "digest":"d2681e301f632bd76544e6d5b6631a12d97b5479ff07cd24efecd19203c77db3"
        }]
      }
    },
    method: 'POST',
    json: {'jsonrpc': '2.0', 'id': 1572277567967, 'result': '2005cf23e9fb24b6'}
  },

  // FR18 - Should display progress bar
  // FR19 - Should display progress bar when we add a NS name
  // FR20 - should display progress bar when we add a DS entry and launch a test
  // FR26 - Should display progress bar
  {
    url: 'https://zonemaster.net/api',
    body: {'jsonrpc': '2.0', 'id': 1572254972236, 'method': 'test_progress', 'params': {'test_id': '2005cf23e9fb24b6'}},
    method: 'POST',
    json: {'jsonrpc': '2.0', 'id': 1572254972236, 'result': 50}
  },


  // FR21 - Should display summary
  // FR22 - Should display full messages
  {
    url: 'https://zonemaster.net/api',
    body: {'jsonrpc': '2.0', 'id': 1572254767685, 'method': 'start_domain_test', 'params':
      {
        'language':'en', 'domain': 'results.afNiC.Fr', 'profile': 'default',
        'nameservers': [], 'ds_info': []
      }
    },
    method: 'POST',
    json: {'jsonrpc': '2.0', 'id': 1572254767685, 'result': '226f6d4f44ae3f80'}
  },

  {
    url: 'https://zonemaster.net/api',
    body: {'jsonrpc': '2.0', 'id': 1572254767685, 'method': 'start_domain_test', 'params':
      {
        'language':'en', 'domain': 'empty-results.afNiC.Fr', 'profile': 'default',
        'nameservers': [], 'ds_info': []
      }
    },
    method: 'POST',
    json: {'jsonrpc': '2.0', 'id': 1572254767685, 'result': 'a0fbcbf6c5ff5842'}
  },

  // FR21 - Should display summary
  // FR22 - Should display full messages
  {
    url: 'https://zonemaster.net/api',
    body: {'jsonrpc': '2.0', 'id': 1572254972236, 'method': 'test_progress', 'params': {'test_id': '226f6d4f44ae3f80'}},
    method: 'POST',
    json: {'jsonrpc': '2.0', 'id': 1572254972236, 'result': 100}
  },


  {
    url: 'https://zonemaster.net/api',
    body: {'jsonrpc': '2.0', 'id': 1572254972236, 'method': 'test_progress', 'params': {'test_id': 'a0fbcbf6c5ff5842'}},
    method: 'POST',
    json: {'jsonrpc': '2.0', 'id': 1572254972236, 'result': 100}
  },


  {
    url: 'https://zonemaster.net/api',
    body: {'jsonrpc': '2.0', 'id': 1572254972327, 'method': 'get_test_results', 'params': {'id': 'a0fbcbf6c5ff5842', 'language': 'en'}},
    method: 'POST',
    json: {'jsonrpc': '2.0', 'id': 1572254972327, 'result': {
        'params': {'profile' : 'default', 'priority': 10, 'ipv6': true, 'ipv4': true, 'client_id': 'Zonemaster GUI',
          'nameservers': [], 'ds_info': [], 'domain': 'empty-results.afNiC.Fr', 'queue': 0, 'client_version': '3.1.0'
        }, 'hash_id': 'a0fbcbf6c5ff5842', 'created_at': '2019-10-28T09:29:26Z', 'creation_time': '2019-10-28 09:29:26.288692', 'id': 49640, 'results':[]
      }
    }
  },


  // FR21 - Should display summary
  // FR22 - Should display full messages

  // FR23 - Should display previous tests
  // FR24 - Should display previous run link
  // FR25 - Should have an export button
  // FR25 - Should open a modal that contains four export possibilities
  {
    url: 'https://zonemaster.net/api',
    body: {'jsonrpc': '2.0', 'id': 1572254972327, 'method': 'get_test_results', 'params': {'id': '226f6d4f44ae3f80', 'language': 'en'}},
    method: 'POST',
    json: {'jsonrpc': '2.0', 'id': 1572254972327, 'result': {
        'params': {
          'profile' : 'default',
          'priority': 10,
          'ipv6': true,
          'ipv4': true,
          'client_id': 'Zonemaster GUI',
          'nameservers': [],
          'ds_info': [],
          'domain': 'results.afNiC.Fr',
          'queue': 0,
          'client_version': '3.6.1'
        },
        'hash_id': 'efd1dedc98d456bf',
        'created_at': '2022-11-23T16:38:17Z',
        'creation_time': '2022-11-23 16:38:17',
        'id': 49640,
        "testcase_descriptions": {
          "CONSISTENCY04": "Name server NS consistency",
          "ZONE08": "MX is not an alias",
          "DNSSEC10": "Zone contains NSEC or NSEC3 records",
          "NAMESERVER07": "To check whether authoritative name servers return an upward referral",
          "UNSPECIFIED": "UNSPECIFIED",
          "CONSISTENCY06": "SOA MNAME consistency",
          "NAMESERVER04": "Same source address",
          "ZONE10": "No multiple SOA records",
          "SYNTAX08": "MX name must have a valid hostname",
          "SYNTAX05": "Misuse of '@' character in the SOA RNAME field",
          "ZONE05": "SOA 'expire' minimum value",
          "NAMESERVER08": "Testing QNAME case insensitivity",
          "CONNECTIVITY03": "AS Diversity",
          "NAMESERVER02": "Test of EDNS0 support",
          "NAMESERVER05": "Behaviour against AAAA query",
          "BASIC01": "The domain must have a parent domain",
          "SYNTAX01": "No illegal characters in the domain name",
          "CONSISTENCY01": "SOA serial number consistency",
          "DELEGATION06": "Existence of SOA",
          "SYNTAX02": "No hyphen ('-') at the start or end of the domain name",
          "SYNTAX04": "The NS name must have a valid domain/hostname",
          "DELEGATION01": "Minimum number of name servers",
          "ZONE04": "SOA 'retry' at least 1 hour",
          "CONSISTENCY02": "SOA RNAME consistency",
          "NAMESERVER03": "Test availability of zone transfer (AXFR)",
          "ADDRESS01": "Name server address must be globally routable",
          "CONSISTENCY03": "SOA timers consistency",
          "DNSSEC15": "Existence of CDS and CDNSKEY",
          "ADDRESS03": "Reverse DNS entry matches name server name",
          "NAMESERVER09": "Testing QNAME case sensitivity",
          "DNSSEC04": "Check for too short or too long RRSIG lifetimes",
          "DELEGATION02": "Name servers must have distinct IP addresses",
          "ADDRESS02": "Reverse DNS entry exists for name server IP address",
          "DELEGATION05": "Name server must not point at CNAME alias",
          "CONSISTENCY05": "Consistency between glue and authoritative data",
          "SYNTAX03": "There must be no double hyphen ('--') in position 3 and 4 of the domain name",
          "ZONE01": "Fully qualified master nameserver in SOA",
          "ZONE03": "SOA 'retry' lower than 'refresh'",
          "ZONE09": "MX record present",
          "ZONE07": "SOA master is not an alias",
          "DELEGATION07": "Parent glue name records present in child",
          "SYNTAX07": "No illegal characters in the SOA MNAME field",
          "DELEGATION04": "Name server is authoritative",
          "SYNTAX06": "No illegal characters in the SOA RNAME field",
          "NAMESERVER01": "A name server should not be a recursor",
          "DELEGATION03": "No truncation of referrals",
          "DNSSEC05": "Check for invalid DNSKEY algorithms",
          "ZONE06": "SOA 'minimum' maximum value",
          "ZONE02": "SOA 'refresh' minimum value",
          "BASIC02": "The domain must have at least one working name server",
          "NAMESERVER06": "NS can be resolved"
        },
        'results': [
          {
            "message": "Using version v4.5.1 of the Zonemaster engine.\n",
            "module": "SYSTEM",
            "testcase": "UNSPECIFIED",
            "level": "INFO"
          },
          {
            "testcase": "BASIC01",
            "level": "INFO",
            "module": "BASIC",
            "message": "Parent domain 'fr' was found for the tested domain.\n"
          },
          {
            "level": "INFO",
            "testcase": "BASIC02",
            "message": "Nameserver ns1.nic.fr/192.134.4.1 listed these servers as glue: ns1.nic.fr., ns2.nic.fr., ns3.nic.fr..\n",
            "module": "BASIC"
          },
          {
            "level": "INFO",
            "testcase": "BASIC02",
            "module": "BASIC",
            "message": "Nameserver ns1.nic.fr/2001:67c:2218:2::4:1 listed these servers as glue: ns1.nic.fr., ns2.nic.fr., ns3.nic.fr..\n"
          },
          {
            "module": "BASIC",
            "message": "Nameserver ns2.nic.fr/192.93.0.4 listed these servers as glue: ns1.nic.fr., ns2.nic.fr., ns3.nic.fr..\n",
            "testcase": "BASIC02",
            "level": "INFO"
          },
          {
            "level": "INFO",
            "testcase": "BASIC02",
            "message": "Nameserver ns2.nic.fr/2001:660:3005:1::1:2 listed these servers as glue: ns1.nic.fr., ns2.nic.fr., ns3.nic.fr..\n",
            "module": "BASIC"
          },
          {
            "message": "Nameserver ns3.nic.fr/192.134.0.49 listed these servers as glue: ns1.nic.fr., ns2.nic.fr., ns3.nic.fr..\n",
            "module": "BASIC",
            "testcase": "BASIC02",
            "level": "INFO"
          },
          {
            "module": "BASIC",
            "message": "Nameserver ns3.nic.fr/2001:660:3006:1::1:1 listed these servers as glue: ns1.nic.fr., ns2.nic.fr., ns3.nic.fr..\n",
            "level": "INFO",
            "testcase": "BASIC02"
          },
          {
            "module": "BASIC",
            "message": "Functional nameserver found. \"A\" query for www.afnic.fr test skipped.\n",
            "testcase": "UNSPECIFIED",
            "level": "INFO"
          },
          {
            "module": "ADDRESS",
            "message": "All Nameserver addresses are in the routable public addressing space.\n",
            "level": "INFO",
            "testcase": "ADDRESS01"
          },
          {
            "module": "ADDRESS",
            "message": "Reverse DNS entry exists for each Nameserver IP address.\n",
            "testcase": "ADDRESS02",
            "level": "INFO"
          },
          {
            "message": "Every reverse DNS entry matches name server name.\n",
            "module": "ADDRESS",
            "testcase": "ADDRESS03",
            "level": "INFO"
          },
          {
            "module": "CONNECTIVITY",
            "message": "At least two IPv4 addresses of the authoritative nameservers are announce by different AS sets. A merged list of all AS: (\"2485, \"2486).\n",
            "testcase": "CONNECTIVITY03",
            "level": "INFO"
          },
          {
            "module": "CONNECTIVITY",
            "message": "At least two IPv6 addresses of the authoritative nameservers are announce by different AS sets. A merged list of all AS: (\"2486, \"2485).\n",
            "level": "INFO",
            "testcase": "CONNECTIVITY03"
          },
          {
            "level": "INFO",
            "testcase": "CONSISTENCY01",
            "module": "CONSISTENCY",
            "message": "Saw SOA serial number 2022112200 on following nameserver set : ns1.nic.fr/192.134.4.1; ns1.nic.fr/2001:67c:2218:2::4:1; ns2.nic.fr/192.93.0.4; ns2.nic.fr/2001:660:3005:1::1:2; ns3.nic.fr/192.134.0.49; ns3.nic.fr/2001:660:3006:1::1:1.\n"
          },
          {
            "message": "A single SOA serial number was found (2022112200).\n",
            "module": "CONSISTENCY",
            "testcase": "CONSISTENCY01",
            "level": "INFO"
          },
          {
            "testcase": "CONSISTENCY02",
            "level": "INFO",
            "message": "A single SOA rname value was found (hostmaster.nic.fr.).\n",
            "module": "CONSISTENCY"
          },
          {
            "level": "INFO",
            "testcase": "CONSISTENCY03",
            "module": "CONSISTENCY",
            "message": "A single SOA time parameter set was seen (REFRESH=7200, RETRY=1800, EXPIRE=2419200, MINIMUM=5400).\n"
          },
          {
            "testcase": "CONSISTENCY04",
            "level": "INFO",
            "message": "A single NS set was found (ns1.nic.fr.; ns2.nic.fr.; ns3.nic.fr.).\n",
            "module": "CONSISTENCY"
          },
          {
            "message": "Glue records are consistent between glue and authoritative data.\n",
            "module": "CONSISTENCY",
            "level": "INFO",
            "testcase": "CONSISTENCY05"
          },
          {
            "message": "A single SOA mname value was seen (dnsmaster.nic.fr.).\n",
            "module": "CONSISTENCY",
            "level": "INFO",
            "testcase": "CONSISTENCY06"
          },
          {
            "module": "DELEGATION",
            "message": "Parent lists enough (3) nameservers (ns1.nic.fr; ns2.nic.fr; ns3.nic.fr). Lower limit set to 2.\n",
            "level": "INFO",
            "testcase": "DELEGATION01"
          },
          {
            "level": "INFO",
            "testcase": "DELEGATION01",
            "message": "Child lists enough (3) nameservers (ns1.nic.fr; ns2.nic.fr; ns3.nic.fr). Lower limit set to 2.\n",
            "module": "DELEGATION"
          },
          {
            "module": "DELEGATION",
            "message": "Child lists enough (3) nameservers (ns1.nic.fr; ns2.nic.fr; ns3.nic.fr) that resolve to IPv4 addresses (192.134.0.49; 192.134.4.1; 192.93.0.4). Lower limit set to 2.\n",
            "testcase": "DELEGATION01",
            "level": "INFO"
          },
          {
            "level": "INFO",
            "testcase": "DELEGATION01",
            "module": "DELEGATION",
            "message": "Child lists enough (3) nameservers (ns1.nic.fr; ns2.nic.fr; ns3.nic.fr) that resolve to IPv6 addresses (2001:660:3005:1::1:2; 2001:660:3006:1::1:1; 2001:67c:2218:2::4:1). Lower limit set to 2.\n"
          },
          {
            "testcase": "DELEGATION01",
            "level": "INFO",
            "message": "Delegation lists enough (3) nameservers (ns1.nic.fr; ns2.nic.fr; ns3.nic.fr) that resolve to IPv4 addresses (192.134.0.49; 192.134.4.1; 192.93.0.4). Lower limit set to 2.\n",
            "module": "DELEGATION"
          },
          {
            "message": "Delegation lists enough (3) nameservers (ns1.nic.fr; ns2.nic.fr; ns3.nic.fr) that resolve to IPv6 addresses (2001:660:3005:1::1:2; 2001:660:3006:1::1:1; 2001:67c:2218:2::4:1). Lower limit set to 2.\n",
            "module": "DELEGATION",
            "level": "INFO",
            "testcase": "DELEGATION01"
          },
          {
            "message": "All the IP addresses used by the nameservers in parent are unique.\n",
            "module": "DELEGATION",
            "level": "INFO",
            "testcase": "DELEGATION02"
          },
          {
            "level": "INFO",
            "testcase": "DELEGATION02",
            "message": "All the IP addresses used by the nameservers in child are unique.\n",
            "module": "DELEGATION"
          },
          {
            "level": "INFO",
            "testcase": "DELEGATION02",
            "module": "DELEGATION",
            "message": "All the IP addresses used by the nameservers are unique.\n"
          },
          {
            "testcase": "DELEGATION03",
            "level": "INFO",
            "module": "DELEGATION",
            "message": "The smallest possible legal referral packet is smaller than 513 octets (it is 373).\n"
          },
          {
            "module": "DELEGATION",
            "message": "All these nameservers are confirmed to be authoritative : ns1.nic.fr; ns2.nic.fr; ns3.nic.fr.\n",
            "testcase": "DELEGATION04",
            "level": "INFO"
          },
          {
            "testcase": "DELEGATION05",
            "level": "INFO",
            "module": "DELEGATION",
            "message": "No nameserver points to CNAME alias.\n"
          },
          {
            "level": "INFO",
            "testcase": "DELEGATION06",
            "message": "All the nameservers have SOA record.\n",
            "module": "DELEGATION"
          },
          {
            "module": "DELEGATION",
            "message": "All of the nameserver names are listed both at parent and child.\n",
            "testcase": "DELEGATION07",
            "level": "INFO"
          },
          {
            "message": "RRSIG with keytag 53080 and covering type(s) DNSKEY expires at : Wed Dec 21 20:36:15 2022.\n",
            "module": "DNSSEC",
            "level": "INFO",
            "testcase": "DNSSEC04"
          },
          {
            "message": "RRSIG with keytag 15756 and covering type(s) SOA expires at : Wed Dec 21 12:48:04 2022.\n",
            "module": "DNSSEC",
            "testcase": "DNSSEC04",
            "level": "INFO"
          },
          {
            "module": "DNSSEC",
            "message": "The DNSKEY with tag 53080 uses algorithm number 13 (ECDSA Curve P-256 with SHA-256),  which is OK.\n",
            "testcase": "DNSSEC05",
            "level": "INFO"
          },
          {
            "testcase": "DNSSEC05",
            "level": "INFO",
            "module": "DNSSEC",
            "message": "The DNSKEY with tag 15756 uses algorithm number 13 (ECDSA Curve P-256 with SHA-256),  which is OK.\n"
          },
          {
            "testcase": "DNSSEC05",
            "level": "INFO",
            "module": "DNSSEC",
            "message": "The DNSKEY with tag 53080 uses algorithm number 13 (ECDSA Curve P-256 with SHA-256),  which is OK.\n"
          },
          {
            "message": "The DNSKEY with tag 15756 uses algorithm number 13 (ECDSA Curve P-256 with SHA-256),  which is OK.\n",
            "module": "DNSSEC",
            "testcase": "DNSSEC05",
            "level": "INFO"
          },
          {
            "message": "The DNSKEY with tag 53080 uses algorithm number 13 (ECDSA Curve P-256 with SHA-256),  which is OK.\n",
            "module": "DNSSEC",
            "level": "INFO",
            "testcase": "DNSSEC05"
          },
          {
            "level": "INFO",
            "testcase": "DNSSEC05",
            "module": "DNSSEC",
            "message": "The DNSKEY with tag 15756 uses algorithm number 13 (ECDSA Curve P-256 with SHA-256),  which is OK.\n"
          },
          {
            "level": "INFO",
            "testcase": "DNSSEC05",
            "module": "DNSSEC",
            "message": "The DNSKEY with tag 15756 uses algorithm number 13 (ECDSA Curve P-256 with SHA-256),  which is OK.\n"
          },
          {
            "testcase": "DNSSEC05",
            "level": "INFO",
            "message": "The DNSKEY with tag 53080 uses algorithm number 13 (ECDSA Curve P-256 with SHA-256),  which is OK.\n",
            "module": "DNSSEC"
          },
          {
            "module": "DNSSEC",
            "message": "The DNSKEY with tag 53080 uses algorithm number 13 (ECDSA Curve P-256 with SHA-256),  which is OK.\n",
            "testcase": "DNSSEC05",
            "level": "INFO"
          },
          {
            "testcase": "DNSSEC05",
            "level": "INFO",
            "message": "The DNSKEY with tag 15756 uses algorithm number 13 (ECDSA Curve P-256 with SHA-256),  which is OK.\n",
            "module": "DNSSEC"
          },
          {
            "module": "DNSSEC",
            "message": "The DNSKEY with tag 53080 uses algorithm number 13 (ECDSA Curve P-256 with SHA-256),  which is OK.\n",
            "level": "INFO",
            "testcase": "DNSSEC05"
          },
          {
            "module": "DNSSEC",
            "message": "The DNSKEY with tag 15756 uses algorithm number 13 (ECDSA Curve P-256 with SHA-256),  which is OK.\n",
            "level": "INFO",
            "testcase": "DNSSEC05"
          },
          {
            "level": "INFO",
            "testcase": "DNSSEC10",
            "message": "The zone has NSEC3 records. Fetched from the nameservers with IP addresses \"192.134.0.49; 192.134.4.1; 192.93.0.4; 2001:660:3005:1::1:2; 2001:660:3006:1::1:1; 2001:67c:2218:2::4:1\".\n",
            "module": "DNSSEC"
          },
          {
            "module": "DNSSEC",
            "message": "No CDS or CDNSKEY RRsets are found on any name server.\n",
            "testcase": "DNSSEC15",
            "level": "INFO"
          },
          {
            "message": "Nameserver ns1.nic.fr/192.134.4.1 is not a recursor.\n",
            "module": "NAMESERVER",
            "ns": "ns1.nic.fr/192.134.4.1",
            "testcase": "NAMESERVER01",
            "level": "INFO"
          },
          {
            "testcase": "NAMESERVER01",
            "level": "INFO",
            "ns": "ns1.nic.fr/2001:67c:2218:2::4:1",
            "module": "NAMESERVER",
            "message": "Nameserver ns1.nic.fr/2001:67c:2218:2::4:1 is not a recursor.\n"
          },
          {
            "message": "Nameserver ns2.nic.fr/192.93.0.4 is not a recursor.\n",
            "module": "NAMESERVER",
            "testcase": "NAMESERVER01",
            "ns": "ns2.nic.fr/192.93.0.4",
            "level": "INFO"
          },
          {
            "ns": "ns2.nic.fr/2001:660:3005:1::1:2",
            "testcase": "NAMESERVER01",
            "level": "INFO",
            "module": "NAMESERVER",
            "message": "Nameserver ns2.nic.fr/2001:660:3005:1::1:2 is not a recursor.\n"
          },
          {
            "module": "NAMESERVER",
            "message": "Nameserver ns3.nic.fr/192.134.0.49 is not a recursor.\n",
            "testcase": "NAMESERVER01",
            "level": "INFO",
            "ns": "ns3.nic.fr/192.134.0.49"
          },
          {
            "message": "Nameserver ns3.nic.fr/2001:660:3006:1::1:1 is not a recursor.\n",
            "module": "NAMESERVER",
            "testcase": "NAMESERVER01",
            "level": "INFO",
            "ns": "ns3.nic.fr/2001:660:3006:1::1:1"
          },
          {
            "level": "INFO",
            "testcase": "NAMESERVER02",
            "ns": "All",
            "message": "The following nameservers support EDNS0 : ns1.nic.fr/2001:67c:2218:2::4:1; ns3.nic.fr/192.134.0.49; ns1.nic.fr/192.134.4.1; ns3.nic.fr/2001:660:3006:1::1:1; ns2.nic.fr/192.93.0.4; ns2.nic.fr/2001:660:3005:1::1:2.\n",
            "module": "NAMESERVER"
          },
          {
            "module": "NAMESERVER",
            "message": "AXFR not available on nameserver ns1.nic.fr/192.134.4.1.\n",
            "testcase": "NAMESERVER03",
            "level": "INFO",
            "ns": "ns1.nic.fr/192.134.4.1"
          },
          {
            "ns": "ns1.nic.fr/2001:67c:2218:2::4:1",
            "testcase": "NAMESERVER03",
            "level": "INFO",
            "module": "NAMESERVER",
            "message": "AXFR not available on nameserver ns1.nic.fr/2001:67c:2218:2::4:1.\n"
          },
          {
            "message": "AXFR not available on nameserver ns2.nic.fr/192.93.0.4.\n",
            "module": "NAMESERVER",
            "level": "INFO",
            "testcase": "NAMESERVER03",
            "ns": "ns2.nic.fr/192.93.0.4"
          },
          {
            "testcase": "NAMESERVER03",
            "ns": "ns2.nic.fr/2001:660:3005:1::1:2",
            "level": "INFO",
            "message": "AXFR not available on nameserver ns2.nic.fr/2001:660:3005:1::1:2.\n",
            "module": "NAMESERVER"
          },
          {
            "testcase": "NAMESERVER03",
            "ns": "ns3.nic.fr/192.134.0.49",
            "level": "INFO",
            "module": "NAMESERVER",
            "message": "AXFR not available on nameserver ns3.nic.fr/192.134.0.49.\n"
          },
          {
            "level": "INFO",
            "testcase": "NAMESERVER03",
            "ns": "ns3.nic.fr/2001:660:3006:1::1:1",
            "message": "AXFR not available on nameserver ns3.nic.fr/2001:660:3006:1::1:1.\n",
            "module": "NAMESERVER"
          },
          {
            "testcase": "NAMESERVER04",
            "ns": "All",
            "level": "INFO",
            "message": "All nameservers reply with same IP used to query them.\n",
            "module": "NAMESERVER"
          },
          {
            "message": "The following nameservers answer AAAA queries without problems : ns3.nic.fr/2001:660:3006:1::1:1; ns1.nic.fr/192.134.4.1; ns3.nic.fr/192.134.0.49; ns1.nic.fr/2001:67c:2218:2::4:1; ns2.nic.fr/192.93.0.4; ns2.nic.fr/2001:660:3005:1::1:2.\n",
            "module": "NAMESERVER",
            "level": "INFO",
            "testcase": "NAMESERVER05",
            "ns": "All"
          },
          {
            "ns": "All",
            "testcase": "NAMESERVER06",
            "level": "INFO",
            "message": "All nameservers succeeded to resolve to an IP address.\n",
            "module": "NAMESERVER"
          },
          {
            "level": "INFO",
            "testcase": "NAMESERVER07",
            "ns": "All",
            "module": "NAMESERVER",
            "message": "None of the following nameservers returns an upward referral : ns1.nic.fr; ns2.nic.fr; ns3.nic.fr.\n"
          },
          {
            "testcase": "NAMESERVER08",
            "level": "INFO",
            "ns": "ns1.nic.fr/192.134.4.1",
            "message": "Nameserver ns1.nic.fr/192.134.4.1 preserves original case of queried names (WwW.afNiC.fr).\n",
            "module": "NAMESERVER"
          },
          {
            "testcase": "NAMESERVER08",
            "ns": "ns1.nic.fr/2001:67c:2218:2::4:1",
            "level": "INFO",
            "message": "Nameserver ns1.nic.fr/2001:67c:2218:2::4:1 preserves original case of queried names (WwW.afNiC.fr).\n",
            "module": "NAMESERVER"
          },
          {
            "module": "NAMESERVER",
            "message": "Nameserver ns2.nic.fr/192.93.0.4 preserves original case of queried names (WwW.afNiC.fr).\n",
            "level": "INFO",
            "testcase": "NAMESERVER08",
            "ns": "ns2.nic.fr/192.93.0.4"
          },
          {
            "message": "Nameserver ns2.nic.fr/2001:660:3005:1::1:2 preserves original case of queried names (WwW.afNiC.fr).\n",
            "module": "NAMESERVER",
            "level": "INFO",
            "testcase": "NAMESERVER08",
            "ns": "ns2.nic.fr/2001:660:3005:1::1:2"
          },
          {
            "testcase": "NAMESERVER08",
            "ns": "ns3.nic.fr/192.134.0.49",
            "level": "INFO",
            "module": "NAMESERVER",
            "message": "Nameserver ns3.nic.fr/192.134.0.49 preserves original case of queried names (WwW.afNiC.fr).\n"
          },
          {
            "level": "INFO",
            "testcase": "NAMESERVER08",
            "ns": "ns3.nic.fr/2001:660:3006:1::1:1",
            "message": "Nameserver ns3.nic.fr/2001:660:3006:1::1:1 preserves original case of queried names (WwW.afNiC.fr).\n",
            "module": "NAMESERVER"
          },
          {
            "ns": "All",
            "testcase": "NAMESERVER09",
            "level": "INFO",
            "message": "When asked for SOA records on \"www.afnic.fr\" with different cases,  all servers reply consistently.\n",
            "module": "NAMESERVER"
          },
          {
            "module": "SYNTAX",
            "message": "No illegal characters in the domain name (afnic.fr).\n",
            "level": "INFO",
            "testcase": "SYNTAX01"
          },
          {
            "message": "Neither end of any label in the domain name (afnic.fr) has a hyphen.\n",
            "module": "SYNTAX",
            "level": "INFO",
            "testcase": "SYNTAX02"
          },
          {
            "message": "Domain name (afnic.fr) has no label with a double hyphen ('--') in position 3 and 4 (with a prefix which is not 'xn--').\n",
            "module": "SYNTAX",
            "testcase": "SYNTAX03",
            "level": "INFO"
          },
          {
            "testcase": "SYNTAX04",
            "level": "INFO",
            "module": "SYNTAX",
            "message": "Nameserver (ns1.nic.fr) syntax is valid.\n"
          },
          {
            "testcase": "SYNTAX04",
            "level": "INFO",
            "message": "Nameserver (ns2.nic.fr) syntax is valid.\n",
            "module": "SYNTAX"
          },
          {
            "module": "SYNTAX",
            "message": "Nameserver (ns3.nic.fr) syntax is valid.\n",
            "testcase": "SYNTAX04",
            "level": "INFO"
          },
          {
            "module": "SYNTAX",
            "message": "There is no misused '@' character in the SOA RNAME field (hostmaster.nic.fr.).\n",
            "level": "INFO",
            "testcase": "SYNTAX05"
          },
          {
            "message": "The SOA RNAME field (hostmaster@nic.fr) is compliant with RFC2822.\n",
            "module": "SYNTAX",
            "level": "INFO",
            "testcase": "SYNTAX06"
          },
          {
            "level": "INFO",
            "testcase": "SYNTAX07",
            "message": "SOA MNAME (dnsmaster.nic.fr) syntax is valid.\n",
            "module": "SYNTAX"
          },
          {
            "testcase": "SYNTAX08",
            "level": "INFO",
            "module": "SYNTAX",
            "message": "Domain name MX (mx4.nic.fr) syntax is valid.\n"
          },
          {
            "testcase": "SYNTAX08",
            "level": "INFO",
            "message": "Domain name MX (mx5.nic.fr) syntax is valid.\n",
            "module": "SYNTAX"
          },
          {
            "message": "SOA 'mname' nameserver dnsmaster.nic.fr/192.134.4.2 does not respond.\n",
            "module": "ZONE",
            "level": "NOTICE",
            "testcase": "ZONE01"
          },
          {
            "testcase": "ZONE01",
            "level": "NOTICE",
            "message": "SOA 'mname' nameserver (dnsmaster.nic.fr) is not listed in \"parent\" NS records for tested zone (ns1.nic.fr; ns2.nic.fr; ns3.nic.fr).\n",
            "module": "ZONE"
          },
          {
            "module": "ZONE",
            "message": "SOA 'refresh' value (7200) is less than the recommended one (14400).\n",
            "level": "NOTICE",
            "testcase": "ZONE02"
          },
          {
            "testcase": "ZONE03",
            "level": "INFO",
            "message": "SOA 'refresh' value (7200) is higher than the SOA 'retry' value (1800).\n",
            "module": "ZONE"
          },
          {
            "testcase": "ZONE04",
            "level": "NOTICE",
            "module": "ZONE",
            "message": "SOA 'retry' value (1800) is less than the recommended one (3600).\n"
          },
          {
            "level": "INFO",
            "testcase": "ZONE05",
            "message": "SOA 'expire' value (2419200) is higher than the minimum recommended value (604800) and not lower than the 'refresh' value (7200).\n",
            "module": "ZONE"
          },
          {
            "module": "ZONE",
            "message": "SOA 'minimum' value (5400) is between the recommended ones (300/86400).\n",
            "testcase": "ZONE06",
            "level": "INFO"
          },
          {
            "testcase": "ZONE07",
            "level": "INFO",
            "module": "ZONE",
            "message": "SOA 'mname' value (dnsmaster.nic.fr) refers to a NS which is not an alias (CNAME).\n"
          },
          {
            "level": "INFO",
            "testcase": "ZONE07",
            "module": "ZONE",
            "message": "SOA 'mname' value (dnsmaster.nic.fr) refers to a NS which is not an alias (CNAME).\n"
          },
          {
            "level": "INFO",
            "testcase": "ZONE08",
            "module": "ZONE",
            "message": "MX record for the domain is not pointing to a CNAME.\n"
          },
          {
            "testcase": "ZONE08",
            "level": "INFO",
            "message": "MX record for the domain is not pointing to a CNAME.\n",
            "module": "ZONE"
          },
          {
            "module": "ZONE",
            "message": "Mail targets in the MX RRset \"mx5.nic.fr.; mx4.nic.fr.\" returned from name servers \"2001:660:3006:1::1:1; 2001:67c:2218:2::4:1; 192.134.4.1; 2001:660:3005:1::1:2; 192.93.0.4; 192.134.0.49\".\n",
            "testcase": "ZONE09",
            "level": "INFO"
          },
          {
            "module": "ZONE",
            "message": "A unique SOA record is returned by all nameservers of the zone.\n",
            "level": "INFO",
            "testcase": "ZONE10"
          }
        ]
      }
    }
  },

  // FR23 - Should display previous tests
  // FR24 - Should display previous run link
  // FR25 - Should have an export button
  // FR25 - Should open a modal that contains four export possibilities
  {
    url: 'https://zonemaster.net/api',
    body: {'jsonrpc': '2.0', 'id': 1572271917712, 'method': 'get_test_history', 'params': {'offset': 0, 'limit': 100, 'filter': 'all', 'frontend_params': {'domain': 'results.afNiC.Fr'}}},
    method: 'POST',
    json: {'jsonrpc': '2.0', 'id': 1572271917712, 'result': [
      {'overall_result': 'error', 'created_at': '2019-10-28T09:24:57Z', 'creation_time': '2019-10-28 09:42:42.432378', 'id': '293f626579274f18'},
      {'overall_result': 'ok', 'created_at': '2019-10-28T09:24:57Z', 'creation_time': '2019-10-28 09:24:57.395431', 'id': '84bfac6ae74d0e62'},
      {'overall_result': 'ok', 'created_at': '2019-10-24T07:49:48Z', 'creation_time': '2019-10-24 07:49:48.079617', 'id': 'efe0931716b0068c'},
      {'overall_result': 'ok', 'created_at': '2019-10-24T07:49:16Z', 'creation_time': '2019-10-24 07:49:16.271481', 'id': '46acbdcbc456db1d'},
      {'overall_result': 'ok', 'created_at': '2019-10-24T07:35:52Z', 'creation_time': '2019-10-24 07:35:52.819536', 'id': 'fd5b10ae1a46ce5e'},
      {'overall_result': 'ok', 'created_at': '2019-10-24T07:35:21Z', 'creation_time': '2019-10-24 07:35:21.309154', 'id': '1b29b0582a99d7ab'},
      {'overall_result': 'ok', 'created_at': '2019-10-24T06:51:22Z', 'creation_time': '2019-10-24 06:51:22.373411', 'id': '8c4829b7f60edc25'},
      {'overall_result': 'ok', 'created_at': '2019-10-24T06:50:50Z', 'creation_time': '2019-10-24 06:50:50.801272', 'id': '9b89a0988dbccfdb'},
      {'overall_result': 'ok', 'created_at': '2019-10-24T06:39:37Z', 'creation_time': '2019-10-24 06:39:37.48699', 'id': '89c662ddd43a8b03'},
      {'overall_result': 'ok', 'created_at': '2019-10-24T06:39:05Z', 'creation_time': '2019-10-24 06:39:05.851497', 'id': '2add42a68594b37a'},
      {'overall_result': 'ok', 'created_at': '2019-10-23T20:59:41Z', 'creation_time': '2019-10-23 20:59:41.594768', 'id': 'c334d7eb96af1d19'},
      {'overall_result': 'ok', 'created_at': '2019-10-23T20:55:13Z', 'creation_time': '2019-10-23 20:55:13.205118', 'id': 'b4146c79de8b3638'},
      {'overall_result': 'ok', 'created_at': '2019-10-23T20:46:06Z', 'creation_time': '2019-10-23 20:46:06.989113', 'id': '226f6d4f44ae3f80'},
      {'overall_result': 'ok', 'created_at': '2019-10-23T20:40:46Z', 'creation_time': '2019-10-23 20:40:46.272244', 'id': 'a509e33a41f28322'},
      {'overall_result': 'ok', 'created_at': '2019-10-23T20:34:21Z', 'creation_time': '2019-10-23 20:34:21.681947', 'id': '5d41c57fa24c76f5'},
      {'overall_result': 'ok', 'created_at': '2019-10-23T20:28:25Z', 'creation_time': '2019-10-23 20:28:25.518303', 'id': '298b4c53d5024f44'},
      {'overall_result': 'ok', 'created_at': '2019-10-23T20:16:39Z', 'creation_time': '2019-10-23 20:16:39.466781', 'id': 'f9c587426b885036'},
      {'overall_result': 'ok', 'created_at': '2019-10-23T19:41:31Z', 'creation_time': '2019-10-23 19:41:31.048622', 'id': 'bb2109eb54d9ef58'},
      {'overall_result': 'ok', 'created_at': '2019-10-23T16:20:56Z', 'creation_time': '2019-10-23 16:20:56.180064', 'id': '3ff7e65752a431e8'},
      {'overall_result': 'ok', 'created_at': '2019-10-23T15:37:05Z', 'creation_time': '2019-10-23 15:37:05.935049', 'id': 'e8a3507cce49392d'},
      {'overall_result': 'ok', 'created_at': '2019-10-23T15:25:35Z', 'creation_time': '2019-10-23 15:25:35.162808', 'id': '19f7773777cdad1a'},
      {'overall_result': 'ok', 'created_at': '2019-10-23T15:09:54Z', 'creation_time': '2019-10-23 15:09:54.801371', 'id': '61907eb87c8bb1d9'},
      {'overall_result': 'ok', 'created_at': '2019-10-23T14:52:56Z', 'creation_time': '2019-10-23 14:52:56.823486', 'id': '497ce5549e80d6d1'},
      {'overall_result': 'ok', 'created_at': '2019-10-23T14:39:25Z', 'creation_time': '2019-10-23 14:39:25.259204', 'id': '470e62da84dcbd16'},
      {'overall_result': 'error', 'created_at': '2019-10-23T14:26:35Z', 'creation_time': '2019-10-23 14:26:35.853106', 'id': '9b8e25c35dc365ac'}
    ]}
  },
];

@Injectable()
export class HttpMockRequestInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    for (const element of urls) {

      // Don't compare client info
      let requestParams = {...request.body?.params};
      delete requestParams['client_version'];
      delete requestParams['client_id'];

      if (request.url === element.url
        && request.method === element.method
        && request.body.method === element.body.method
        && JSON.stringify(requestParams) === JSON.stringify(element.body.params)
      ) {
        console.log('Loaded from json: ' + request.body.method );
        return of(new HttpResponse({ status: 200, body: element.json }));
      }
    }
    console.log('Loaded from http call :' + request.url);
    return next.handle(request);
  }
}
