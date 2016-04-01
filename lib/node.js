var Route = require('./route');

/**
 * Node constructor
 *
 * @param {string} name
 *        A string representing node name
 *        e.g. 'A'
 */
var Node = function(name) {
    this.name = '';
    this.routes = new Map();

    if (name)
        this.name = name;
};

/**
 * Adds a route for this node
 *
 * @param {object} route
 *        The route to add
 */
Node.prototype.set = function(route) {
    if (route) {
        if (route.destination && route.weight) {
            var destinationName = route.destination.name;
            this.routes.set(destinationName, route);
        }
    }
};

/**
 * Returns route from this node to destination
 *
 * @param  {object} destination
 *         The destination node
 * @return {object}
 *         The route to destination
 */
Node.prototype.get = function(destination) {
    if (destination) {
        if (destination.name) {
            return this.routes.get(destination.name);
        }
    }
};

/**
 * Removes route to destination
 *
 * @param  {object} destination
 *         The destination node to delete route to
 */
Node.prototype.del = function(destination) {
    if (destination) {
        if (destination.name) {
            this.routes.delete(destination.name);
        }
    }
};

module.exports = Node;