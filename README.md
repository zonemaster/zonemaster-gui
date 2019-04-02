Zonemaster Web GUI
==========

### Purpose
This module is the Web Interface part of the Zonemaster project. 

### Installation

Follow the detailed [installation instructions](docs/Installation.md).

##### Prerequisites
Before you install the Zonemaster Web GUI module, you need the
Zonemaster Engine test framework installed. Please see the
[Zonemaster Engine installation instructions](https://github.com/zonemaster/zonemaster-engine/blob/master/docs/Installation.md)

And also the the zonemaster-backend module installed. Please see the [Zonemaster
Backend installation](https://github.com/zonemaster/zonemaster-backend/blob/master/docs/Installation.md)


##### Configuration 

Text for configuring the backend are found in the [installation
instructions](docs/Installation.md).


### Contribution

This project was generate with Angular-CLI 1.6.8 and then updating.
It use the Angular 2+ framework with all its tools.

The source code of the application is available in ``./src/app`` folder.
The ``app`` folder is structured as follow : 
```
+-- components
+-- models
|   +-- alter.ts            : Alert model (level, message)
|   +-- index.ts            : module export
+-- pipes
|   +-- filer.pipe.*                : Filter a list based on a string
|   +-- filer-by-categories.pipe.*  : Filter the list of result by categories
|   +-- romanize.pipe.*             : Transform latin number to roman number (1 -> I, 2 -> II)
|   +-- safe-html.pipe.*            : Sanitize text to HTML
+-- services
|   +-- alert.service.*     : to display alert messages
|   +-- app.service.*       : to manage app configuration (api url, etc.)
|   +-- dns-check.service.* : to communicate with the Zonemaster Backend API 
+-- app.*
```

The ``components`` folder is composed by subfolder that represent main components.
Each folder of component contain four files :
  - ``*.component.css``   : The component style 
  - ``*.component.html``   : The component html 
  - ``*.component.*.ts``   : The component typescript 
    
All assets are available in ``src/assets`` folder. 
It's split by concern, all the javascript is in the ``js`` folder, the style in the ``css``, etc.

The configurations files of the application are in the ``src/environments`` folder.
``environment.ts`` is use for development purpose, and the ``environment.prod.ts`` for production.

    
In order to contribute
* Install [Nodejs](https://nodejs.org) 
* Fork and Clone the repo 
* Go to the folder and install project dependencies with `npm install`
* Update environment files in `/src/environments/` to add a backend api endpoint (or leave the default)
* Make your change, test it and create a Pull Request

You are now ready to contribute !

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



