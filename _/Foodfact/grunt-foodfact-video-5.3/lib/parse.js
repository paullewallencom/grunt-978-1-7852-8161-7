var fs = require('fs');
var _ = require('lodash');
var Converter = require('csvtojson').Converter;


/**
 * Parse a CSV source file and convert it to JSON
 * @param {String} source - the CSV source file
 * @param {Object} options - the convertion options
 * @param {Function} cb - called once done (result in 2nd param), or in error (errback - err in 1st param)
 */
module.exports = function parse(source, destination, options, cb){
    var csvConverter = new Converter(_.defaults(options || {}, {
        constructResult:false,
        delimiter : '\t'
    }));
    var writeStream = fs.createWriteStream(destination);
    var readStream = fs.createReadStream(source);

    readStream.on('error', cb);
    writeStream.on('error', cb)
               .on('finish', _.partial(cb, null));

    readStream.pipe(csvConverter).pipe(writeStream);
};
