Zonemaster Web GUI [![Build Status](https://travis-ci.org/zonemaster/zonemaster-gui.svg?branch=master)](https://travis-ci.org/zonemaster/zonemaster-gui)
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

The ``components`` folder is composed of subfolders that represent the main components.
Each folder of component contains three files :
  - ``*.component.css``       : The component's style 
  - ``*.component.html``      : The component's html 
  - ``*.component.ts``      : The component's typescript 
    
All assets are available in ``src/assets`` folder. 
It's split by concern, all translation files are in the ``i18n`` folder, the style in the ``css``, 
images are in the ``images`` folder, etc.

The configuration files of the application are in the `src/environments` folder.
`environment.ts` is used for development purpose, and the `environment.prod.ts` for production.
    
In order to contribute
* Install [Nodejs](https://nodejs.org) 
* Fork the Zonemaster GUI repository on Github into your own user on Github.
* Clone your fork to your working environment.
* Go to the folder and install project dependencies with `npm install`
* Update environment files in `/src/environments/` to add a backend api endpoint (or leave the default)
* Make your changes, test them and push them to your fork on Github
* From your fork, make a Pull Request against the zonemaster/zonemaster-gui repository. 
Please always make the Pull Request against the develop branch.
    
* Thank you for your contribution!

> In development mode, you probably have to enable [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) on your browser.
> The Cross-Origin Resource Sharing (CORS) performed by the browser blocks every AJAX request that does not match the exact host, protocol, and port of your site.

##### Development server
Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

##### Build
Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.
The script also change the FAQ markdown files to html files.

##### Create a release zip file
Run 'npm run release' to create a zip file with dist folder and zonemaster.conf file. Then upload it in github.

#### Code Quality
This repo use (Husky)[https://www.npmjs.com/package/husky] as a git hook manager which run commands when a git command is executed. 
Two git hook are used:
  - git commit: ["commitlint"](https://www.npmjs.com/package/@commitlint/cli) (config: commitlint.config.js) blocks the commit process if the message doesn't respond to the convention enabled.
    We use the "@commitlint/config-conventional" convention and you can find the rules directly on the [npm page](https://www.npmjs.com/package/@commitlint/config-conventional).
    The commit message must start with the type (fix, feat, build, perf, refactor, etc.) and explain what was done in lowercase.
    For example: 
    ```
      "foo: some message" #fails 
      "fix: some message" #passes 
    ```

    then BEFORE the actual commit, we run linter for Typescript, we use ["tslint"](https://www.npmjs.com/package/tslint) (config: tslint.json), for css style we use ["stylelint"](https://www.npmjs.com/package/stylelint) (config by default) and for all the rest (Html, Js, etc.) ["prettier"](https://www.npmjs.com/package/prettier) (config: .prettierc). All this linter are on the "fix" mode which will allow to modify directly files.
    For example, if a file use one tab and not 4 spaces ,prettier will update the file before the commit and commit the modified file.

   - git merge or rebase: when you make a merge on your pc, typically in the case of a sweater. 
	  We run "[npm-post-install](https://www.npmjs.com/package/post-npm-install)" to check if it's not necessary to update your "node_modules" dependencies.
   
### Documentation

Basically, the GUI is a serverless Angular application which use the Backend JSONRC API.

Other than the installation file, the [docs directory](docs/), contains a translation guide for the GUI

#### Security of our dependencies
Based on the output of [david](https://david-dm.org/) and [npm audit](https://docs.npmjs.com/cli/audit), we regularly
update our dependencies with the latest secure version. Notice that we can't follow the rythm of new versions, so you could 
get security warning during the installation of development dependencies.

#### Acknowledge
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.8.

License
=======

The software is released under the 2-clause BSD license. See separate
[LICENSE](LICENSE) file.



