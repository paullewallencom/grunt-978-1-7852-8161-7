var describe = require('mocha').describe;
var it       = require('mocha').it;
var expect   = require('chai').expect;
var grunt    = require('grunt');


var destDir = 'test/data/out/';

describe('foodfact', function(){

    describe('fullTest target', function(){

        it('should have created the json file', function(){
            var file = destDir + 'db2.json';

            expect(grunt.file.exists(file)).to.be.equal(true);
            expect(grunt.file.read(file).length).to.be.greaterThan(0);
        });
    });
});
