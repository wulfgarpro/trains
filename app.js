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

var Digraph = require('./lib/digraph'),
    utils = require('./lib/utils'),
    Route = require('./lib/route'),
    Node = require('./lib/node');

/**
 * App constructor
 *
 * @param {string} inputFile
 *        A string representing file path
 *        i.e. './input.txt'
 */
var App = function(inputFile) {
    this.digraph = {};

    if (inputFile) {
        // Get data from input file
        var data = App.readInputFile(inputFile);
        // Create digraph
        this.digraph = App.digraphFactory(data);
    }
};

/**
 * Helper to test ThoughtWorks test criteria
 */
App.prototype.thoughtWorks = function() {
    if (this.digraph) {
        if (this.digraph.nodes) {
            // These tests were outlined in ThoughtWorks email
            console.log(this.calcDistance('A-B-C'));
            console.log(this.calcDistance('A-D'));
            console.log(this.calcDistance('A-D-C'));
            console.log(this.calcDistance('A-E-B-C-D'));
            console.log(this.calcDistance('A-E-D'));
            console.log(this.calcNumberOfPossibleRoutesWithStops('C-C', '<=', '3'));
            console.log(this.calcNumberOfPossibleRoutesWithStops('A-C', '==', '4'));
            console.log(this.calcShortestRoute('A-C'));
            console.log(this.calcShortestRoute('B-B'));
            console.log(this.calcNumberOfPossibleRoutesWithDistance('C-C', '<', '30'));
        }
    }
    return ''; // Return nothing
};

/**
 * Calculate the distance of path
 *
 * @param  {string} path
 *         A string representing the path to calc distance of
 * @return {number}
 *         The distance
 */
App.prototype.calcDistance = function(path) {
    if (path) {
        var distance;
        try {
            distance = this.digraph.calcDistance(path);
        } catch (err) {
            return err;
        }
        return distance;
    }
};

/**
 * Perform a relational comparison with value and filter
 *
 * @param  {number} value
 *         The value to compare with
 * @param  {string} relation
 *         The relational operator
 *         e.g. '<', or '>'
 * @param  {number} filter
 *         The value to compare to
 * @return {number}
 *         The original value if matched
 */
App.prototype.filterRoutes = function(value, relation, filter) {
    if (value && relation && filter) {
        switch (relation) {
            case '<':
                if (value < filter)
                    return value;
                break;
            case '<=':
                if (value <= filter)
                    return value;
                break;
            case '>':
                if (value > filter)
                    return value;
                break;
            case '>=':
                if (value >= filter)
                    return value;
                break;
            case '==':
                if (value === filter)
                    return value;
                break;
            default:
                if (value === filter)
                    return value;
                break;
        }
    }
};

/**
 * Calculate the number of routes via path with
 * <,>,<=,>= or == stops
 *
 * @param  {string} path
 *         A string delimited representing a path
 *         e.g. 'A-C'
 * @param  {string} relation
 *         A string representing a relationship
 *         e.g. '<' or '>'
 * @param  {number} stops
 *         The maximum stops to filter valid routes
 *         e.g. 3
 * @return {number}
 *         The number of matching routes
 */
App.prototype.calcNumberOfPossibleRoutesWithStops = function(path, relation, stops) {
    if (path && relation && stops) {
        // Starting point is a stop
        stops++;

        var nodes = utils.tokeniseNodes(path);
        if (nodes.length === 2 && relation.match(/^:?(<|>|<=|>=|==){1}$/)) {
            var validRoutes = new Array();
            var allRoutes = this.digraph.getAllPaths(nodes[0], nodes[1], stops);

            for (var route of allRoutes.keys()) {
                // Length
                var l = route.length;

                var filtered = this.filterRoutes(l, relation, stops);
                if (filtered)
                    validRoutes.push(filtered);
            }
            return validRoutes.length;
        }
    }
};

/**
 * Calculate shortest route via path
 *
 * @param  {string} path
 *         A string delimited representing a path
 *         e.g. 'A-C'
 * @return {number}
 *         Length of shortest path
 */
App.prototype.calcShortestRoute = function(path) {
    if (path) {
        var shortestDistance, allRoutes;

        // Only 5 nodes in our sample data
        var stops = 5;

        // Starting point is a stop
        stops++;

        var nodes = utils.tokeniseNodes(path);
        if (nodes.length === 2) {
            var allRoutes = this.digraph.getAllPaths(nodes[0], nodes[1], stops);
            for (var route of allRoutes.values()) {
                if (!shortestDistance) {
                    shortestDistance = route;
                } else if (route < shortestDistance)
                    shortestDistance = route;
            }
        }
        return shortestDistance;
    }
};

/**
 * Calculate the number of routes via path with
 * <,>,<=,>= or == distance
 *
 * @param  {string} path
 *         A string delimited representing a path
 *         e.g. 'A-C'
 * @param  {string} relation
 *         A string representing a relationship
 *         e.g. '<' or '>'
 * @param  {number} distance
 *         The maximum distance (weight) to filter valid routes
 * @return {number}
 *         The number of matching routes
 */

App.prototype.calcNumberOfPossibleRoutesWithDistance = function(path, relation, distance) {
    if (path && relation && distance) {
        var nodes = utils.tokeniseNodes(path);
        if (nodes.length === 2 && relation.match(/^:?(<|>|<=|>=|==){1}$/)) {
            var validRoutes = new Array();
            // Max 10 for our sample data
            var allRoutes = this.digraph.getAllPaths(nodes[0], nodes[1], 10);
            for (var route of allRoutes.keys()) {
                // Distance
                var d = allRoutes.get(route);

                var filtered = this.filterRoutes(d, relation, distance);
                if (filtered)
                    validRoutes.push(filtered);
            }
            return validRoutes.length;
        }
    }
};

/**
 * Static function to read in input file, stripping
 * whitespace
 *
 * @param  {inputFile} inputFile
 *         A string file path
 *         e.g. './input.txt'
 * @return {string}
 *         A string representing all lines read
 */
App.readInputFile = function(inputFile) {
    try {
        if (inputFile) {
            var data = utils.readFile(inputFile);
            return data;
        }
    } catch (err) {
        console.log(err);
    }
};

/**
 * A factory to create digraph from route string
 * input
 *
 * @param  {string} data
 *         A string representing node routes
 * @return {object}
 *         The digraph of nodes (vertex) and routes (edges)
 */
App.digraphFactory = function(data) {
    if (data) {
        var digraph = new Digraph(data);
        return digraph;
    }
};

module.exports = App;