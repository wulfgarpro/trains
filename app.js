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
        // These tests were outlined in ThoughtWorks email
        console.log(App.calcDistance('A-B-C', this.digraph));
        console.log(App.calcDistance('A-D', this.digraph));
        console.log(App.calcDistance('A-D-C', this.digraph));
        console.log(App.calcDistance('A-E-B-C-D', this.digraph));
        console.log(App.calcDistance('A-E-D', this.digraph));
        console.log(App.calcNumberOfPossibleTrips('C-C', '<=3'), this.digraph);
        console.log(App.calcNumberOfPossibleTrips('A-C', '=4'), this.digraph);
        console.log(App.calcShortestRoute('A-C'), this.digraph);
        console.log(App.calcShortestRoute('B-B'), this.digraph);
        console.log(App.calcRouteCount('C-C', '<30'), this.digraph);
    }
};

/**
 * [readInputFile description]
 * @param  {[type]} inputFile [description]
 * @return {[type]}           [description]
 */
App.readInputFile = function(inputFile) {
    if (inputFile) {
        var data = utils.readFile(inputFile);
        return data;
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
    }
    return digraph;
};

/**
 * [printNetworkMap description]
 * @param  {[type]} digraph [description]
 * @return {[type]}         [description]
 */
App.printNetworkMap = function(digraph) {
    Digraph.printNetworkMap(digraph);
};

/**
 * [calcDistance description]
 * @param  {[type]} path    [description]
 * @param  {[type]} digraph [description]
 * @return {[type]}         [description]
 */
App.calcDistance = function(path, digraph) {
    Digraph.calcDistance(path, digraph);
};

/**
 * [calcNumberOfPossibleTrips description]
 * @param  {[type]} path    [description]
 * @param  {[type]} stops   [description]
 * @param  {[type]} digraph [description]
 * @return {[type]}         [description]
 */
App.calcNumberOfPossibleTrips = function(path, stops, digraph) {
    Digraph.calcNumberOfPossibleTrips(path, stops, digraph);
};

/**
 * [calcShortestRoute description]
 * @param  {[type]} path    [description]
 * @param  {[type]} digraph [description]
 * @return {[type]}         [description]
 */
App.calcShortestRoute = function(path, digraph) {
    Digraph.calcShortestRoute(path, digraph);
};

/**
 * [calcRouteCount description]
 * @param  {[type]} path     [description]
 * @param  {[type]} distance [description]
 * @param  {[type]} digraph  [description]
 * @return {[type]}          [description]
 */
App.calcRouteCount = function(path, distance, digraph) {
    Digraph.calcRouteCount(path, distance, digraph);
};

module.exports = App;