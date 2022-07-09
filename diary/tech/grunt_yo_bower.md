Grunt
======

## ////////////////////////////////////////////////////////////////////////
##  generator-angular with Yoeman 
## ///////////////////////////////////////////////////////////////////////

```
	npm install -g yo
	npm install -g generator-angular
	mkdir myapp && cd $_
	yo angular
	grunt server 
```
### Route 
```
	yo angular:route dashboard 
	yo angular:route home 
```
### Create a controller 
```
	yo angular:controller user 
```
### Create a Custom Directive 
```
	yo angular:directive tabPanel
```	
### Create a Custom Fileter
```
	yo angular:filter capitalize

```
### Create View 
```
	yo angular:view dashboard 
```
### Create a Service 
```
	yo angular:service api 
	yo angular:factory api 
	yo angular;provider api 
	yo angular:value api 
	yo angular:constant api 
	yo angular:factory  session --skip-add
```
### Create a Decorator 
```
	yo angular:decorator api 
```
### CoffeeScript 
```
	yo angular:controller user --coffee 
```

```
grunt test:server
grunt test:client
grunt build 
```


grunt-bower-install
Inject your Bower dependencies right into your HTML from Grunt.

To install the module:

npm install --save-dev grunt-bower-install
Include the task in your Gruntfile:

grunt.loadNpmTasks('grunt-bower-install');
Create a config block within your Gruntfile:

bowerInstall: {
  target: {
    // Point to the files that should be updated when
    // you run `grunt bower-install`
    src: [
      'app/views/**/*.html',   // .html support...
      'app/views/**/*.jade',   // .jade support...
      'app/styles/main.scss',  // .scss & .sass support...
      'app/config.yml'         // and .yml & .yaml support out of the box!
    ],
 
    // Optional:
    // ---------
    cwd: '',
    dependencies: true,
    devDependencies: false,
    exclude: [],
    fileTypes: {},
    ignorePath: '',
    overrides: {}
  }
}
See wiredep's readme for more options of customization, such as other file types, regex patterns, exclusions, and more.

For JavaScript dependencies, pop this in your HTML file:

<!-- bower:js -->
<!-- endbower -->
Install a Bower component:

bower install jquery --save
Call the Grunt task:

grunt bowerInstall
You're in business!

<!-- bower:js -->
<script src="bower_components/jquery/jquery.js"></script>
<!-- endbower -->
Behind the Scenes
This plug-in uses wiredep, which takes a look at all of the components you have, then determines the best order to inject your scripts in to your HTML file.

Putting script tags that aren't managed by grunt-bower-install is not advised, as anything between <!-- bower:js --> and <!-- endbower --> will be overwritten with each command.

Index Generator
Build Status

Yeoman generator for an html5, responsive index.html file.

Installation
To install generator-index from npm, run:

npm install -g generator-index
Finally, initiate the generator:

yo index
