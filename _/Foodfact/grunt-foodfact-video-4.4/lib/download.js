var fs = require('fs');
var request = require('request');

/**
 * Download the file in URL to the given destination
 * @param {String} url - a valid URL
 * @param {String} dest - the path were the URL will be downloaded
 * @param {Function} cb - called once done, or in error (errback - err in 1st param)
 */
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


