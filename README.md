Zonemaster Web GUI
==========

### Purpose
This module is the Web Interface part of the Zonemaster project. 

### Prerequisites
Before you install the Zonemaster Web GUI module, you need the
Zonemaster Engine test framework installed. Please see the
[Zonemaster Engine installation instructions](https://github.com/zonemaster/zonemaster-engine/blob/master/docs/Installation.md)

And also the the zonemaster-backend module installed. Please see the [Zonemaster
Backend installation](https://github.com/zonemaster/zonemaster-backend/blob/master/docs/Installation.md)

### Installation

Follow the detailed [installation instructions](docs/Installation.md).

### Configuration 

Text for configuring the backend are found in the [installation
instructions](docs/Installation.md).

### Contribution
In order to contribute
* Install [Nodejs](https://nodejs.org) 
* Fork then Clone your repo 
* Go to the folder and install project dependencies `npm install`
* Update environment files in `/src/environments/` to add a backend api endpoint

You are now ready to develop 

##### Development server
Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

##### Build
Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.
The script also change the FAQ markdown files to html files.

##### Create a release zip file
Run 'npm run release' to create a zip file with dist folder and zonemaster.conf file. Then upload it in github.

### Documentation

Basically, the GUI is a serverless Angular application which use the Backend JSONRC API.

Other than the installation file, the [docs directory](docs/), contains a translation guide for the GUI

#### Acknowledge
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.8.

License
=======

The software is released under the 2-clause BSD license. See separate
[LICENSE](LICENSE) file.



