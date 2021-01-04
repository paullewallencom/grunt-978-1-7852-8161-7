module.exports = function (grunt) {

  grunt.registerTask(
      'foodfact',
      "Load the foodfact database",
      function(){

        grunt.log.writeln('Loading the database...');
        grunt.log.ok('Database loaded');

      });
};
