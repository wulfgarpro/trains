var fs = require('fs');

/**
 * Static function for reading in input file,
 * removing all white space
 *
 * @param  {string} inputFile
 *         File path to file
 *         e.g. './input.txt'
 * @return {string}
 *         Data string read from file
 *         e.g. 'AB5,BC4,...'
 */
exports.readFile = function(inputFile) {
    // Check if file exists before processing
    if (!fs.existsSync(inputFile))
        throw new Error('No such file.');

    // Check file has content before processing
    var size = fs.statSync(inputFile)['size'];
    if (size === 0)
        return '';

    var data = fs.readFileSync(inputFile).toString();
    data = data.replace(/\s+/g, '');
    return data;
};

/**
 * Parse comma seperated string of routes and
 * extract each individual valid route
 *
 * @param  {string} data
 *         A string of comma seperated routes
 *         e.g. AB5,BC4,...
 * @return {object}
 *         [ 'AB5', 'BC4', ... ]
 */
exports.parseRoutes = function(data) {
    if (data) {
        data = data.toUpperCase().replace(/\s+/g, '');

        var found = data.split(',');
        for (var i = found.length - 1; i >= 0; i--) {
            var valid = found[i].match(/^[A-Z]{1}[A-Z]{1}[0-9]+$/);
            if (valid === null) {
                // Remove invalid token
                if (i > -1) found.splice(i, 1);
            }
        }
        return found;
    }
};

/**
 * Extract individual nodes from path descriptor
 *
 * @param  {string} path
 *         A string representing a path
 *         e.g. 'A-B-C'
 * @return {object}
 *         An array of strings representing found nodes
 *         e.g. [ 'A', 'B', 'C' ]
 */
exports.tokeniseNodes = function(path) {
    if (path) {
        path = path.toUpperCase().replace(/\s+/g, '');

        var found = path.split('-');
        for (var i = found.length - 1; i >= 0; i--) {
            var valid = found[i].match(/^[A-Z]{1}$/);
            if (valid === null) {
                if (i > 1) found.splice(i, 1);
            }
        }
        return found;
    }
};

/**
 * A basic welcome banner
 */
exports.printWelcome = function() {
    console.log('--------------------');
    console.log('"Welcome to Trains!"');
    console.log('--------------------');
};

/**
 * A basic help dialog
 */
exports.printHelp = function() {
    console.log('Trains, version 1.0');
    console.log();
    console.log('Usage: ./bin/run [option] input-file');
    console.log('options:');
    console.log('  --help   "Print this help dialog"');
    console.log();
};