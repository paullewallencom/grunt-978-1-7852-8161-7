var path = require('path');
var async = require('async');
var download = require('../lib/download.js');
var parse = require('../lib/parse.js');

module.exports = function(grunt) {

    grunt.registerMultiTask('foodfact', 'Load the foodfact database', function() {

        var stack   = [];
        var done    = this.async();
        var options = this.options({
            download : true,
            delimiter : 't'
        });
        var parseOptions = {
            delimiter : options.delimiter
        };
        var urls    = this.data.urls || options.urls;

        //extract destination dir and create it
        var prepareDestDir = function prepareDestDir(destinationFile){
            var destDir = path.dirname(destinationFile);

            if (!grunt.file.exists(destDir)) {
                grunt.file.mkdir(destDir);
            }
            return destDir;
        };

        //run the file parsing/convertion
        var convert = function convert(source, destination, cb){
            grunt.verbose.writeln('Convert %s to %s', source, destination);

            parse(source, destination, parseOptions, function(err){
                if(err){
                    return cb(err);
                }

                cb();
            });
        };

        if(options.download){
            //download then the files are not expanded
            stack = this.data.files.map(function(filePattern, dest) {
                var destDir = prepareDestDir(dest);

                return function (cb){
                    download(urls, destDir, function(err){
                        if(err){
                            return cb(err);
                        }
                        grunt.file.expand(filePattern).forEach(function(source){
                            convert(source, dest, cb);
                        });
                    });
                };
            });
        } else {
            stack = this.files.map(function(file){
                prepareDestDir(file.dest);
                return function (cb){
                    file.src.forEach(function(source){
                        convert(source, file.dest, cb);
                    });
                };
            });
        }

        //run the stack function in parrallel
        async.parallel(stack, function(err){
            if(err){
                return done(err);
            }
            grunt.log.ok('%d files converted', stack.length);
            done();
        });
    });
};

