var fs = require('fs');
var path = require('path');
var request = require('request');
var Promise = require('es6-promise').Promise;

var downloadFile = function downloadFile (url, destDir){
    return new Promise( function (resolve, reject) {
        var destination = path.join(destDir, path.basename(url));
            request
                .get(url)
                .on('error', reject)
                .on('response', function(response) {
                    if (response.statusCode === 200) {
                        var fileStream = fs.createWriteStream(destination);
                        response.pipe(fileStream);

                        fileStream
                        .on('error', function(err) {
                            return reject(err);
                        })
                        .on('finish', function() {
                            resolve();
                        });
                    } else {
                        reject(new Error(response.statusCode + ' ' + response.statusMessage));
                    }
                });
    });
};

/**
 * Download the file in URL to the given destination
 * @param {String} url - a valid URL
 * @param {String} destDir - the path were the URL will be downloaded
 * @param {Function} cb - called once done, or in error (errback - err in 1st param)
 */
module.exports = function download(urls, destDir, cb) {

    if (typeof urls === 'string') {
        urls = [urls];
    }


    Promise.all(urls.map(function (url) {
        return downloadFile(url, destDir);
    }))
    .then(function(){
        return cb(null);
    }).catch(function(err){
        return cb(err);
    });
};

