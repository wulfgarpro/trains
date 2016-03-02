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
 * [App description]
 * @param {[type]} inputFile [description]
 */
var App = function(inputFile) {
    this.digraph = {};

    if (inputFile) {
        // Get data from input file
        var data = App.readInputFile(inputFile);
        // Create digraph
        this.digraph = App.buildDigraph(data);
    }
};

/**
 * [thoughtWorks description]
 * @return {[type]} [description]
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
            console.log(this.calcNumberOfPossibleTrips('C-C', '<=', '3'));
            console.log(this.calcNumberOfPossibleTrips('A-C', '==', '4'));
            //console.log(this.digraph.calcShortestRoute('A-C'));
            //console.log(this.digraph.calcShortestRoute('B-B'));
            //console.log(this.digraph.calcRouteCount('C-C', '<30'));
        }
    }
    return ''; // return nothing
};
/**
 * [calcDistance description]
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
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
 * [calcNumberOfPossibleTrips description]
 * @param  {[type]} path     [description]
 * @param  {[type]} relation [description]
 * @param  {[type]} stops    [description]
 * @return {[type]}          [description]
 */
App.prototype.calcNumberOfPossibleTrips = function(path, relation, stops) {
    if (path && relation && ++stops) {
        var allTrips, validTrips = new Array();

        var nodes = path.split('-');
        if (nodes.length === 2 && relation.match(/^:?(<|>|<=|>=|==){1}$/)) {
            allTrips = this.digraph.getAllPaths(nodes[0], nodes[1], stops);
            for (var trip of allTrips.keys()) {
                switch (relation) {
                    case '<':
                        if (trip.length < stops)
                            validTrips.push(trip);
                        break;
                    case '<=':
                        if (trip.length <= stops)
                            validTrips.push(trip);
                        break;
                    case '>':
                        if (trip.length > stops)
                            validTrips.push(trip);
                        break;
                    case '>=':
                        if (trip.length >= stops)
                            validTrips.push(trip);
                        break;
                    case '==':
                        if (trip.length === stops) {
                            validTrips.push(trip);
                        }
                        break;
                    default:
                        if (trip.length === stops)
                            validTrips.push(trip);
                        break;
                }
            }
        }
        return validTrips.length;
    }
};

/**
 * [calcShortestRoute description]
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
App.prototype.calcShortestRoute = function(path) {};

/**
 * [calcRouteCount description]
 * @param  {[type]} path     [description]
 * @param  {[type]} distance [description]
 * @return {[type]}          [description]
 */
App.prototype.calcRouteCount = function(path, distance) {};

/**
 * [readInputFile description]
 * @param  {[type]} inputFile [description]
 * @return {[type]}           [description]
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
 * [buildDigraph description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
App.buildDigraph = function(data) {
    if (data) {
        var digraph = new Digraph(data);
        return digraph;
    }
};

module.exports = App;