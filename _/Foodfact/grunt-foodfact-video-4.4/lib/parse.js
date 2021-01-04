var Converter = require("csvtojson").Converter;

/**
 * Parse a CSV source file and convert it to JSON
 * @param {String} source - the CSV source file
 * @param {Object} options - the convertion options
 * @param {Function} cb - called once done (result in 2nd param), or in error (errback - err in 1st param)
 */
module.exports = function parse(source, options, cb){
  new Converter(options || {})
         .fromFile(source, cb);
};
