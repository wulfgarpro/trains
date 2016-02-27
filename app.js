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

var utils = require('./lib/utils.js'),
    Digraph = require('./lib/digraph');

/**
 * App constructor
 */
var App = function(inputFile) {
    if (inputFile) {
        // Get data from input file
        var data = this.readInputFile(inputFile);
        // Create nodes and routes from line
        var nodesAndRoutes = this.makeNodesAndRoutes(data);
        // Create digraph
        var digraph = this.buildDigraph(nodesAndRoutes);
        this.digraph = digraph;
    }
}


/**
 * Our current digraph obj
 */
App.prototype.digraph = {};

/**
 * Read input file and return data
 */
App.prototype.readInputFile = function(inputFile) {
    var data = utils.readFile(inputFile);
    return data;
};

/**
 * Create node and route objs from data
 *
 * Info:
 * -----
 * - Data format should be: AB5, BC4, CD8
 */
App.prototype.makeNodesAndRoutes = function(data) {};

/**
 * Build digraph from extracted nodes and routes
 */
App.prototype.buildDigraph = function(nodesAndRoutes) {};

/**
 * Pretty print network map
 *
 * Info:
 * -----
 * - Print format is: A->B:5
 */
App.prototype.printNetworkMap = function() {};

/**
 * Calcs distrance of defined path
 *
 * Info:
 * -----
 * - Path format is: A-C
 */
App.prototype.calcDistance = function(path) {};

/**
 * Calcs number of possible routes through path
 * with stops relation
 *
 * Info:
 * -----
 * - Path format is: A-C
 * - Stops format is: <5, >5, <=5, >=5, 5
 */
App.prototype.calcNumberOfPossibleTrips = function(path, stops) {};

/**
 * Calcs shortest possible route via path
 *
 * Info:
 * -----
 * - Path format is: A-C
 */
App.prototype.calcShortestRoute = function(path) {};

/**
 * Calc number of unique routes with distance
 * relation
 *
 * Info:
 * -----
 * - Path format is: A-C
 * - Distance format is: <5, >5, <=5, >=5, 5
 */
App.prototype.calcRouteCount = function(path, distance) {};

module.exports = App;