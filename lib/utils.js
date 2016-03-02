/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 James Fraser
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var fs = require('fs');

/**
 * [readFile description]
 * @param  {[type]} inputFile [description]
 * @return {[type]}           [description]
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
 * [parseRoutes description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
exports.parseRoutes = function(data) {
    if (data) {
        data = data.toUpperCase().replace(/\s+/g, '');

        var found = data.split(',');
        for (var i = found.length - 1; i >= 0; i--) {
            var valid = found[i].match(/^[A-Za-z]{1}[A-Za-z]{1}[0-9]+$/);
            if (valid === null) {
                if (i > -1) found.splice(i, 1);
            }
        }
        return found;
    }
};

/**
 * [printWelcome description]
 * @return {[type]} [description]
 */
exports.printWelcome = function() {
    console.log('--------------------');
    console.log('"Welcome to Trains!"');
    console.log('--------------------');
};

/**
 * [printHelp description]
 * @return {[type]} [description]
 */
exports.printHelp = function() {
    console.log('Trains, version 1.0');
    console.log();
    console.log('Usage: ./bin/run [option] input-file');
    console.log('options:');
    console.log('  --help   "Print this help dialog"');
    console.log();
};