var Node = require('./node');

/**
 * Route constructor
 *
 * @param {object} destination
 *        Destination node
 * @param {number} weight
 *        Weight of edge to destination
 */
var Route = function(destination, weight) {
    this.destination = {};
    this.weight = 0;

    if (destination && weight) {
        this.destination = destination;
        this.weight = weight;
    }
};

/**
 * Add destination to route
 *
 * @param {object} destination
 *        Destination node
 * @param {number} weight
 *        Weight of edge to destination
 */
Route.prototype.set = function(destination, weight) {
    if (destination && weight) {
        this.destination = destination;
        this.weight = weight;
    }
};

module.exports = Route;