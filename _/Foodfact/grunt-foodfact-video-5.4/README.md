# foodfact

> Loads data from Open Foodfact and transform them

## This is a demo plugin ##

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install foodfact --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('foodfact');
```

## The "foodfact" task

### Overview
In your project's Gruntfile, add a section named `foodfact` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  foodfact: {
    options: {
        download: true,
        urls : [
                    'http://world.openfoodfacts.org/data/data-fields.txt',
                    'http://world.openfoodfacts.org/data/en.openfoodfacts.org.products.csv'
        ]
    },
    files: {
        data/products.json : ['data/*.csv']
    }
  },
})
```

## Test

```sh
grunt test
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_0.1.0_ initial release

## License
Copyright (c) 2016 Bertrand Chevrier. Licensed under the MIT license.
