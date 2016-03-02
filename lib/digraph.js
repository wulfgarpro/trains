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

/**
 * [getAllPaths description]
 * @param  {[type]} source      [description]
 * @param  {[type]} destination [description]
 * @param  {[type]} stops       [description]
 * @return {[type]}             [description]
 */
Digraph.prototype.getAllPaths = function(source, destination, stops) {
    // All found paths
    var allPaths = new Map();
    // This scope for use within recursion
    var self = this;

    source = source.toUpperCase(), destination = destination.toUpperCase();
    if (source && destination && stops) {
        if (this.nodes.get(source) && this.nodes.get(destination)) {
            // Intermediate paths
            var path = new Array(),
                pathIndex = 0;

            // Starting point is a stop
            var count = ++stops;

            /**
             * [traverse description]
             * @param  {[type]} s         [description]
             * @param  {[type]} d         [description]
             * @param  {[type]} path      [description]
             * @param  {[type]} pathIndex [description]
             * @param  {[type]} count     [description]
             * @return {[type]}           [description]
             */
            function traverse(s, d, path, pathIndex, count) {
                path[pathIndex] = s, pathIndex++;
                count--;

                if (((s === d) && (count <= stops - 1)) || count <= 0) {
                    if (s === d) {
                        // Don't count paths with 1 stop
                        if (pathIndex > 1) {
                            var pathStr = '',
                                weight = 0;

                            for (var i = 0; i < pathIndex; i++) {
                                // Build path string
                                pathStr = pathStr + path[i];
                                if (i !== pathIndex - 1) {
                                    // Calculate total weight
                                    //weight += self.calcDistance(path[i] + "-" + path[i + 1]);
                                    weight += self.nodes.get(path[i]).routes.get(path[i + 1]).weight;
                                }
                            }
                            // Add path
                            allPaths.set(pathStr, weight);
                        }
                    }
                    // Capture larger paths
                    if (d === s && count > 0) {
                        for (var node of self.nodes.get(s).routes.keys()) {
                            traverse(node, d, path, pathIndex, count);
                        }
                    }
                } else {
                    for (var node of self.nodes.get(s).routes.keys()) {
                        traverse(node, d, path, pathIndex, count);
                    }
                }
                pathIndex--;
            }
            //Init
            traverse(source, destination, path, pathIndex, count);
        }
    }
    return allPaths;
};

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