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

var fs = require('fs'),
    path = require('path');
/**
 * Reads and returns data from inputFile
 */
exports.readFile = function(inputFile) {
    // Check if file exists before processing
    if (!fs.existsSync(inputFile))
        throw new Error('No such file.');

    // Check file has content before processing
    var size = fs.statSync(inputFile)['size'];
    if (size === 0) return '';

    // Process
    var data = fs.readFileSync(inputFile).toString().trim();
    // Remove all white space
    data = data.replace(/\s+/g, '');
    return data;
};

/**
 * Extract string routes from string line and
 * return as array strRoutes
 *
 * Info:
 * -----
 * - data is the string read from inputFile
 * - A route matches regex:
 *   \/[A-Za-z][A-Za-z][0-9]*\/
 */
exports.parseStrRoutes = function(data) {};

/**
 * Prints a welcome banner
 */
exports.printWelcome = function() {
    console.log('--------------------');
    console.log('"Welcome to Trains!"');
    console.log('--------------------');
};

/**
 * Prints a help dialog
 */
exports.printHelp = function() {
    console.log('This is the help');
};