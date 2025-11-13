---
question: What is Zonemaster?
category: General information
---

Zonemaster is a software package that validates the quality of a DNS delegation.

The ambition of the Zonemaster project is to develop and maintain an open source DNS validation tool, offering improved performance over existing tools and providing extensive documentation which could be re-used by similar projects in the future.

Zonemaster consists of several modules or components:

- Engine, a test framework that supports all functionality to perform DNS tests;
- CLI, a command-line interface to the Engine;
- Backend, a server that allows you to run Zonemaster tests and save results using a JSON-RPC API and a database;
- GUI, a web interface to the Backend.

The components will help different types of users to check a domain's name servers for configuration errors and generate a report that will assist in fixing the errors.
