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

var utils = require('./utils'),
    Route = require('./route'),
    Node = require('./node');

var util = require('util');

/**
 * [Digraph description]
 * @param {[type]} nodes [description]
 */
var Digraph = function(nodes) {
    this.nodes = new Map();
    if (nodes)
        this.nodes = Digraph.makeNodes(nodes);
};

/**
 * [set description]
 * @param {[type]} destination [description]
 * @param {[type]} weight      [description]
 */
Digraph.prototype.set = function(destination, weight) {};

/**
 * [get description]
 * @param  {[type]} destination [description]
 * @return {[type]}             [description]
 */
Digraph.prototype.get = function(destination) {};

/**
 * [getAllNodes description]
 * @return {[type]} [description]
 */
Digraph.prototype.getAllNodes = function() {};

/**
 * [getAllRoutes description]
 * @return {[type]} [description]
 */
Digraph.prototype.getAllRoutes = function() {};

/**
 * [calcDistance description]
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
Digraph.prototype.calcDistance = function(path) {
    if (path && path.match(/^(?:[A-Z]-+)+[A-Z]{1}$/)) {
        path = path.toUpperCase();
        var tokens = path.split('-');

        var validNodes = new Array();
        for (var t in tokens) {
            var nodeName = tokens[t];
            if (this.nodes.get(nodeName)) {
                validNodes.push(this.nodes.get(nodeName));
            } else {
                throw new Error('NO SUCH ROUTE.');
            }
        }

        var distance = 0;
        for (var i = 0; i <= validNodes.length; i++) {
            var next = i + 1;
            if (next <= validNodes.length - 1) {
                if (!validNodes[i].routes.get(validNodes[next].name))
                    throw new Error('NO SUCH ROUTE.')

                distance += validNodes[i].routes.get(validNodes[next].name).weight;
            }
        }
        return distance;
    }
};

Digraph.prototype.getAllPaths = function(source, destination) {
    var visited = new Array(this.nodes.size);
    console.log(this.nodes.size);
};

/**
 * [calcNumberOfPossibleTrips description]
 * @param  {[type]} path  [description]
 * @param  {[type]} stops [description]
 * @return {[type]}       [description]
 */
Digraph.prototype.calcNumberOfPossibleTrips = function(path, stops) {
    /*if (path !== '' && path.match(/^(?:[A-Z]-+)+[A-Z]{1}$/)) {
        if (stops !== '') {
            var nodes = path.split('-');
            if (nodes.length === 2) {
                var paths = getAllPaths(nodes[0], nodes[1]);
                var count = 0;
                // Match relation in path <, >, =, <=, >=
                if (stops.length === 2 && stops[0].match(/^(?:=|<|>){1}[0-9]+$/)) {
                    // calc count using paths
                } else if (stops.length === 3 && stops[0].match(/^(?:<|>){1}$/) && stops[1].match(/^={1}[0-9]+$/)) {
                    // calc count using paths
                }
                return count;
            }
        }
    }*/
    this.getAllPaths('C', 'C');
};


/**
 * [calcShortestRoute description]
 * @param  {[type]} path [description]
 * @return {[type]}      [description]
 */
Digraph.prototype.calcShortestRoute = function(path) {};

/**
 * [calcRouteCount description]
 * @param  {[type]} path     [description]
 * @param  {[type]} distance [description]
 * @return {[type]}          [description]
 */
Digraph.prototype.calcRouteCount = function(path, distance) {};

/**
 * [makeNodes description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
Digraph.makeNodes = function(data) {
    if (data)
        strNodes = utils.parseRoutes(data);

    var nodes = new Map();
    for (var r of strNodes) {
        var nameOfNodeA = r[0],
            nameOfNodeB = r[1];
        var weight = parseInt(r[2]);

        var nodeA,
            nodeB;

        // Look to see if node already exists
        if (nodes.has(nameOfNodeA)) {
            nodeA = nodes.get(nameOfNodeA);
        } else {
            nodeA = new Node(nameOfNodeA);
        }
        // And for destination
        if (nodes.has(nameOfNodeB)) {
            nodeB = nodes.get(nameOfNodeB);
        } else {
            nodeB = new Node(nameOfNodeB);
        }

        // Set Route from nodeA to nodeB
        var routeToB = new Route(nodeB, weight);
        nodeA.set(routeToB);

        // Update map
        nodes.set(nodeA.name, nodeA);
        nodes.set(nodeB.name, nodeB);
    }
    return nodes;
};

module.exports = Digraph;