/*
 * foodfact
 * https://github.com/krampstudio/grunt-foodfact
 *
 * Copyright (c) 2016 Bertrand Chevrier
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

    grunt.initConfig({


        eslint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                'lib/*.js'
            ]
        },


        // Configuration to be run (and then tested).
        foodfact: {
        },

        clean : {
            options: {
                force : true
            },
            test: ['test/data/out/*']
        },

        connect: {
            test: {
                options : {
                    hostname: 'localhost',
                    port: 4422,
                    base: 'test'
                }
            }
        },

        mochaTest: {
        },

        watch : {
            test: {
                files : ['lib/*.js', 'tasks/*.js', 'test/**/*_spec.js'],
                tasks:  ['test']
            }
        }
    });

    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.loadTasks('tasks');

    grunt.registerTask('testConvert', 'Foodfact conversion only test', ['clean:test', 'foodfact:testConvert', 'mochaTest:testConvert']);

    //connect to be called before this one
    grunt.registerTask('testFull', 'Foodfact full options test', ['clean:test', 'foodfact:testFull', 'mochaTest:testFull']);

    //connect to be called before this one
    grunt.registerTask('testLib', 'Libraries test', ['clean:test', 'mochaTest:testLib']);

    grunt.registerTask('test', 'Run tests', [
        'connect:test',
        'clean:test',
        'testConvert',
        'testFull',
        'testLib'
    ]);
};

