var describe = require('mocha').describe;
var it       = require('mocha').it;
var expect   = require('chai').expect;
var grunt    = require('grunt');

var download = require('../../lib/download.js');

var baseUrl = 'http://localhost:4422/data/in/';
var destDir = 'test/data/out/';

describe('download', function(){

    describe('module', function(){
        it('should expose a function', function(){
            expect(download).to.be.a('function');
        });
    });

    describe('one file', function(){
        it('should be downloaded', function(done){
            download(baseUrl + 'foo.json', destDir, function(err){
                expect(err).to.equal(null);
                expect(grunt.file.exists(destDir + 'foo.json')).to.equal(true);
                done();
            });
        });
    });

    describe('multiple files', function(){
        var files = ['bar.json', 'moo.json'];
        var urls  = files.map(function(file){
            return baseUrl + file;
        });
        var dests = files.map(function(file){
            return destDir + file;
        });
        it('should be downloaded', function(done){
            download(urls, destDir, function(err){
                expect(err).to.equal(null);
                expect(grunt.file.exists(dests[0])).to.equal(true);
                expect(grunt.file.exists(dests[1])).to.equal(true);
                done();
            });
        });
    });

    describe('error', function(){
        describe('404', function(){
            it('should callback an error', function(done){
                download(baseUrl + 'yoo.json', destDir, function(err){
                    expect(err).to.not.equal(null);
                    expect(err).to.be.an.instanceof(Error);
                    expect(err.message).to.be.equal('404 Not Found');
                    done();
                });
            });
        });
    });
});
