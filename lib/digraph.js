var utils = require('./utils'),
    Route = require('./route'),
    Node = require('./node');

/**
 * Digraph constructor
 *
 * @param {string} nodes
 *        A comma seperated string of node paths with path weight
 *        e.g. 'AB5, BC4, ...'
 */
var Digraph = function(nodes) {
    this.nodes = new Map();
    if (nodes) {
        // Build up nodes with routes
        this.nodes = Digraph.makeNodes(nodes);
    }
};

/**
 * Returns distance of nodes in path or throws
 * exception when no such route exists
 *
 * @param  {string} path
 *         A path delimited string of nodes
 *         e.g. 'A-B-C'
 * @return {number}
 *         Distance of path
 */
Digraph.prototype.calcDistance = function(path) {
    if (path && path.match(/^(?:[A-Z]-+)+[A-Z]{1}$/)) {
        path = path.toUpperCase();
        var tokens = path.split('-');

        // Ensure all nodes exist
        var validNodes = new Array();
        for (var t in tokens) {
            var nodeName = tokens[t];
            if (this.nodes.get(nodeName)) {
                validNodes.push(this.nodes.get(nodeName));
            } else {
                throw new Error('NO SUCH ROUTE.');
            }
        }

        // Calculate distance of path
        var distance = 0;
        for (var i = 0; i <= validNodes.length; i++) {
            var next = i + 1;
            if (next <= validNodes.length - 1) {
                // Check if direct path exists
                if (!validNodes[i].routes.get(validNodes[next].name))
                    throw new Error('NO SUCH ROUTE.')
                distance += validNodes[i].routes.get(validNodes[next].name).weight;
            }
        }
        return distance;
    }
};

/**
 * Traverses digraph and finds all paths with from
 * maximum source to destination with max stops
 *
 * @param  {string} source
 *         A string representing a node
 *         e.g. 'A'
 * @param  {string} destination
 *         A string representing a node
 *         e.g. 'B'
 * @param  {number} stops
 *         The maximal limit of a  path
 *         e.g. 3
 * @return {object}
 *         A map of all paths with total weight
 *         e.g. { 'AB' => 5 }
 */
Digraph.prototype.getAllPaths = function(source, destination, stops) {
    source = source.toUpperCase(), destination = destination.toUpperCase();

    // All found paths
    var allPaths = new Map();
    if (source && destination && stops) {
        if (this.nodes.get(source) && this.nodes.get(destination)) {
            // Intermediate paths
            var path = new Array(),
                pathIndex = 0;

            // Starting point is a stop
            var count = ++stops;

            function traverse(s, d, path, count) {
                path.push(s);
                count--;

                if (((s.name === d.name) && (count <= stops - 1)) || count <= 0) {
                    if (s.name === d.name) {
                        // Don't count paths with 1 stop
                        if (path.length > 1) {
                            var pathStr = '',
                                weight = 0;

                            for (var i = 0; i < path.length; i++) {
                                // Build path string
                                pathStr = pathStr + path[i].name;
                                if (i !== path.length - 1) {
                                    // Calculate total weight
                                    weight += path[i].routes.get(path[i + 1].name).weight;
                                }
                            }
                            // Add path
                            allPaths.set(pathStr, weight);
                        }
                    }
                    // Capture larger paths
                    if (d.name === s.name && count > 0) {
                        for (var node of s.routes.keys()) {
                            traverse(s.routes.get(node).destination, d, path, count);
                        }
                    }
                } else {
                    for (var node of s.routes.keys()) {
                        traverse(s.routes.get(node).destination, d, path, count);
                    }
                }
                path.pop();
            }

            //Init
            traverse(this.nodes.get(source), this.nodes.get(destination), path, count);
        }
    }
    return allPaths;
};

/**
 * Static function to build node objects with their
 * requisite routes
 *
 * @param  {string} data
 *         A comma seperated string of node paths with path weight
 *         e.g. 'AB5, BC4, ...'
 * @return {object}
 *         A map of nodes
 *         e.g. { 'A' => node }
 */
Digraph.makeNodes = function(data) {
    if (data)
    // Get all string nodes
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