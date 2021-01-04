var parse = require('../lib/parse.js');

module.exports = function(grunt) {

  grunt.registerMultiTask('foodfact', "Load the foodfact database", function() {

    var count = 0;
    var srcLength = this.filesSrc.length;

    grunt.log.debug(srcLength + ' files to parse');

    this.files.forEach(function(file) {

      grunt.log.debug('Destination : ' + file.dest);
      grunt.log.debug('Sources : ', file.src);

    });
  });
};

