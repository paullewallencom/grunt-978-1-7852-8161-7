var fs = require('fs');
var request = require('request');

module.exports =  function download (url, dest, cb) {

  request
    .get(url)
    .on('error', cb)
    .on('response', function(response) {
      var file;
      if (response.statusCode === 200) {

        file = fs.createWriteStream(dest);
        this.pipe(file);

        file.on('finish', function() {
          file.close(cb);
        });

        file.on('error', function(err) {
          fs.unlink(dest);
          return cb(err);
        });
      } else {
        cb(new Error(response.statusCode + '  ' + response.statusText));
      }
    });
};


