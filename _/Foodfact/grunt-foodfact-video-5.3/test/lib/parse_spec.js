var describe = require('mocha').describe;
var it       = require('mocha').it;
var expect   = require('chai').expect;
var grunt    = require('grunt');

var parse = require('../../lib/parse.js');

var dataDir = 'test/data/';
var sourceDir = dataDir + 'in/';
var destDir = dataDir + 'out/';

describe('parse', function(){

    describe('module', function(){
        it('should expose a function', function(){
            expect(parse).to.be.a('function');
        });
    });

    describe('csvtojson', function(){
        it('convert the file', function(done){
            var source = sourceDir + 'products.csv';
            var dest   = destDir + 'products.json';

            expect(grunt.file.exists(source)).to.equal(true);
            expect(grunt.file.exists(dest)).to.equal(false);

            parse(source, dest, { delimiter : '\t' }, function(err){
                expect(err).to.equal(null);
                expect(grunt.file.exists(dest)).to.equal(true);
                done();
            });
        });
    });

});
