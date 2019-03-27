# Contributing to Zonemaster GUI

This project was generate with Angular-CLI 4 and then updating.
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
    
In order to contribute
* Install [Nodejs](https://nodejs.org) 
* Fork then Clone your repo 
* Go to the folder and install project dependencies `npm install`
* Update environment files in `/src/environments/` to add a backend api endpoint

You are now ready to develop !
